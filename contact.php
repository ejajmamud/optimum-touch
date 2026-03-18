<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html', true, 303);
    exit;
}

$to = 'support@creditoptimum.com';
$defaultSubject = 'Contact Us Form';

$field = static function (string $key): string {
    return trim((string) ($_POST[$key] ?? ''));
};

$cleanLine = static function (string $value): string {
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim($value);
};

$name = $cleanLine($field('name'));
$email = $cleanLine($field('email'));
$phone = $cleanLine($field('phone'));
$subjectInput = $cleanLine($field('subject'));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    header('Location: contact.html?status=error', true, 303);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contact.html?status=error', true, 303);
    exit;
}

$mailSubject = $subjectInput !== '' ? $subjectInput : $defaultSubject;

$body = "";
$body .= "Name: " . $name . "\r\n\r\n";
$body .= "E-mail: " . $email . "\r\n\r\n";
$body .= "Phone: " . $phone . "\r\n\r\n";
$body .= "Subject: " . $mailSubject . "\r\n\r\n";
$body .= "Message: " . $message . "\r\n\r\n";

$headers = "From: support@creditoptimum.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$mailSent = @mail($to, $mailSubject, $body, $headers);

// Fallback storage so enquiries still succeed before SMTP is configured.
$stored = false;
$logDir = __DIR__ . DIRECTORY_SEPARATOR . 'logs';
$logFile = $logDir . DIRECTORY_SEPARATOR . 'contact-submissions.log';

if (!is_dir($logDir)) {
    @mkdir($logDir, 0775, true);
}

$logEntry = "[" . date('Y-m-d H:i:s') . "]\n" . $body . str_repeat('-', 52) . "\n";
if (is_dir($logDir)) {
    $stored = @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX) !== false;
}

if ($mailSent || $stored) {
    header('Location: contact.html?status=success', true, 303);
    exit;
}

header('Location: contact.html?status=error', true, 303);
exit;
?>
