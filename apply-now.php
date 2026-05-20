<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: apply-now.html', true, 303);
    exit;
}

require_once __DIR__ . DIRECTORY_SEPARATOR . 'smtp_mailer.php';

$to = 'support@creditoptimum.com';
$subject = 'Apply Now Form';

$field = static function (string $key): string {
    return trim((string) ($_POST[$key] ?? ''));
};

$name = $field('name');
$number = $field('number');
$location = $field('location');
$loanAmount = $field('loan_amount');
$incomeRange = $field('income_range');
$employmentType = $field('employment_type');
$jobPeriodMonths = $field('job_period_months');
$salaryMyr = $field('salary_myr');

if ($name === '' || $number === '' || $location === '' || $loanAmount === '' || $incomeRange === '' || $employmentType === '') {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

if (!is_numeric($loanAmount) || (float) $loanAmount <= 0) {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

$employmentLabels = [
    'government' => 'Government',
    'private' => 'Private',
    'self_employed' => 'Self Employed',
    'business' => 'Business',
];

$incomeRangeLabels = [
    'below_2000' => 'Below RM2,000',
    '2000_3500' => 'RM2,000 - RM3,500',
    '3501_5000' => 'RM3,501 - RM5,000',
    '5001_8000' => 'RM5,001 - RM8,000',
    'above_8000' => 'Above RM8,000',
];

if (!array_key_exists($employmentType, $employmentLabels)) {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

if (!array_key_exists($incomeRange, $incomeRangeLabels)) {
    header('Location: apply-now.html?status=error', true, 303);
    exit;
}

$requiresEmploymentFields = $employmentType === 'government' || $employmentType === 'private';

$jobPeriodText = 'N/A';
$salaryText = 'N/A';
if ($requiresEmploymentFields) {
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

$employmentLabel = $employmentLabels[$employmentType];
$incomeRangeLabel = $incomeRangeLabels[$incomeRange];

$msg = "";
$msg .= "Name: " . $name . "\r\n\r\n";
$msg .= "Number: " . $number . "\r\n\r\n";
$msg .= "Location: " . $location . "\r\n\r\n";
$msg .= "Loan Amount: RM" . $loanAmount . "\r\n\r\n";
$msg .= "Income Range: " . $incomeRangeLabel . "\r\n\r\n";
$msg .= "Employment Type: " . $employmentLabel . "\r\n\r\n";
$msg .= "Salary (In MYR, if required): " . $salaryText . "\r\n\r\n";
$msg .= "Job Period (if required): " . $jobPeriodText . "\r\n\r\n";

$mail = sendSmtpMail(
    $to,
    $subject,
    $msg,
    'web@creditoptimum.my'
);

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
