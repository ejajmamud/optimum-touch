<?php
declare(strict_types=1);

/**
 * Sends an email via authenticated SMTP over SSL.
 *
 * @return bool True on successful SMTP DATA acceptance, otherwise false.
 */
function sendSmtpMail(
    string $to,
    string $subject,
    string $plainBody,
    string $fromEmail,
    string $replyToEmail = ''
): bool {
    $smtpHost = 'mail.creditoptimum.my';
    $smtpPort = 465;
    $smtpUser = 'web@creditoptimum.my';
    $smtpPass = 'H=(Cv]IR2#!8bK@A';
    $socketTimeout = 20;

    $sanitizeHeader = static function (string $value): string {
        return trim(str_replace(["\r", "\n"], ' ', $value));
    };

    $fromEmail = $sanitizeHeader($fromEmail);
    $to = $sanitizeHeader($to);
    $subject = $sanitizeHeader($subject);
    $replyToEmail = $sanitizeHeader($replyToEmail);

    if ($fromEmail === '' || $to === '' || $subject === '' || $plainBody === '') {
        return false;
    }

    $stream = @stream_socket_client(
        "ssl://{$smtpHost}:{$smtpPort}",
        $errno,
        $errstr,
        $socketTimeout,
        STREAM_CLIENT_CONNECT
    );

    if (!is_resource($stream)) {
        return false;
    }

    stream_set_timeout($stream, $socketTimeout);

    $readResponse = static function ($connection): ?string {
        $response = '';
        while (!feof($connection)) {
            $line = fgets($connection, 515);
            if ($line === false) {
                break;
            }

            $response .= $line;

            if (strlen($line) >= 4 && $line[3] === ' ') {
                break;
            }
        }

        return $response === '' ? null : $response;
    };

    $expectCode = static function (?string $response, array $expectedCodes): bool {
        if ($response === null || strlen($response) < 3) {
            return false;
        }

        $code = (int) substr($response, 0, 3);
        return in_array($code, $expectedCodes, true);
    };

    $writeLine = static function ($connection, string $line): bool {
        return fwrite($connection, $line . "\r\n") !== false;
    };

    $remoteHost = gethostname();
    if ($remoteHost === false || $remoteHost === '') {
        $remoteHost = 'localhost';
    }

    $response = $readResponse($stream);
    if (!$expectCode($response, [220])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, 'EHLO ' . $remoteHost) || !$expectCode($readResponse($stream), [250])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, 'AUTH LOGIN') || !$expectCode($readResponse($stream), [334])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, base64_encode($smtpUser)) || !$expectCode($readResponse($stream), [334])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, base64_encode($smtpPass)) || !$expectCode($readResponse($stream), [235])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, 'MAIL FROM:<' . $fromEmail . '>') || !$expectCode($readResponse($stream), [250])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, 'RCPT TO:<' . $to . '>') || !$expectCode($readResponse($stream), [250, 251])) {
        fclose($stream);
        return false;
    }

    if (!$writeLine($stream, 'DATA') || !$expectCode($readResponse($stream), [354])) {
        fclose($stream);
        return false;
    }

    $headers = [];
    $headers[] = 'From: ' . $fromEmail;
    $headers[] = 'To: ' . $to;
    if ($replyToEmail !== '') {
        $headers[] = 'Reply-To: ' . $replyToEmail;
    }
    $headers[] = 'Subject: ' . $subject;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';
    $headers[] = 'Date: ' . date(DATE_RFC2822);

    // Dot-stuff body lines per SMTP DATA rules.
    $normalizedBody = str_replace(["\r\n", "\r"], "\n", $plainBody);
    $dataLines = explode("\n", $normalizedBody);
    foreach ($dataLines as $index => $line) {
        if (isset($line[0]) && $line[0] === '.') {
            $dataLines[$index] = '.' . $line;
        }
    }

    $messageData = implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", $dataLines) . "\r\n.";

    if (!$writeLine($stream, $messageData) || !$expectCode($readResponse($stream), [250])) {
        fclose($stream);
        return false;
    }

    $writeLine($stream, 'QUIT');
    fclose($stream);
    return true;
}
