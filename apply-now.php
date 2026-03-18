<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: apply-now.html', true, 303);
    exit;
}

$to = 'support@creditoptimum.com';
$subject = 'Apply Now Form';

$field = static function (string $key): string {
    return trim((string) ($_POST[$key] ?? ''));
};

$name = $field('name');
$number = $field('number');
$location = $field('location');
$loanAmount = $field('loan_amount');
$employmentType = $field('employment_type');
$jobPeriodMonths = $field('job_period_months');
$salaryMyr = $field('salary_myr');

if ($name === '' || $number === '' || $location === '' || $loanAmount === '' || $employmentType === '') {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

if (!is_numeric($loanAmount) || (float) $loanAmount <= 0) {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

if ($employmentType !== 'job' && $employmentType !== 'self_business') {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

$jobPeriodText = 'N/A';
$salaryText = 'N/A';
if ($employmentType === 'job') {
    if (!is_numeric($jobPeriodMonths) || (int) $jobPeriodMonths < 6) {
        header('Location: apply-now.html?status=error', true, 303);
        exit;
    }
    if (!is_numeric($salaryMyr) || (float) $salaryMyr <= 0) {
        header('Location: apply-now.html?status=error', true, 303);
        exit;
    }
    $jobPeriodText = (string) ((int) $jobPeriodMonths) . ' months';
    $salaryText = 'RM' . number_format((float) $salaryMyr, 2, '.', ',');
}

$employmentLabel = $employmentType === 'job' ? 'Doing Job' : 'Self Business';

$msg = "";
$msg .= "Name: " . $name . "\r\n\r\n";
$msg .= "Number: " . $number . "\r\n\r\n";
$msg .= "Location: " . $location . "\r\n\r\n";
$msg .= "Loan Amount: RM" . $loanAmount . "\r\n\r\n";
$msg .= "Employment Type: " . $employmentLabel . "\r\n\r\n";
$msg .= "Salary (In MYR, if job): " . $salaryText . "\r\n\r\n";
$msg .= "Job Period (if job): " . $jobPeriodText . "\r\n\r\n";

$headers = "From: support@creditoptimum.com\r\n";

$mail = @mail($to, $subject, $msg, $headers);

// Fallback storage so application still works before SMTP setup.
$stored = false;
$logDir = __DIR__ . DIRECTORY_SEPARATOR . 'logs';
$logFile = $logDir . DIRECTORY_SEPARATOR . 'apply-now-submissions.log';

if (!is_dir($logDir)) {
    @mkdir($logDir, 0775, true);
}

$logEntry = "[" . date('Y-m-d H:i:s') . "]\n" . $msg . str_repeat('-', 52) . "\n";
if (is_dir($logDir)) {
    $stored = @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX) !== false;
}

if ($mail || $stored) {
    header('Location: thank-you.html', true, 303);
    exit;
}

header('Location: apply-now.html?status=error', true, 303);
exit;
?>
