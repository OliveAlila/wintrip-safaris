<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid form data']);
    exit;
}
$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$destination = trim((string)($input['destination'] ?? ''));
$travelDate = trim((string)($input['travel_date'] ?? ''));
$message = trim((string)($input['message'] ?? ''));
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please provide your name, a valid email address and trip details.']);
    exit;
}
if (strlen($name) > 160 || strlen($email) > 190 || strlen($destination) > 160 || strlen($message) > 6000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'One or more fields are too long.']);
    exit;
}
if ($travelDate !== '') {
    $date = DateTime::createFromFormat('!Y-m-d', $travelDate);
    if (!$date || $date->format('Y-m-d') !== $travelDate) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please choose a valid travel date.']);
        exit;
    }
}
$recipient = 'wintripsafarishelp@gmail.com';
$subject = 'New Wintrip Safaris trip enquiry';
$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$safeDestination = str_replace(["\r", "\n"], ' ', $destination);
$body = "A new trip enquiry was submitted on the Wintrip Safaris website.\n\n"
    . "Name: {$safeName}\n"
    . "Email: {$safeEmail}\n"
    . "Destination: " . ($safeDestination !== '' ? $safeDestination : 'Not specified') . "\n"
    . "Travel date: " . ($travelDate !== '' ? $travelDate : 'Not specified') . "\n\n"
    . "Trip details:\n{$message}\n";
$headers = [
    'From' => 'Wintrip Safaris Website <no-reply@wintrip.page.gd>',
    'Reply-To' => $safeEmail,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion(),
];
if (@mail($recipient, $subject, $body, $headers)) {
    echo json_encode(['ok' => true, 'message' => 'Thank you — your email app or mail server has accepted the enquiry for delivery to the Wintrip Safaris team.']);
    exit;
}
http_response_code(503);
echo json_encode(['ok' => false, 'error' => 'Email sending is unavailable on the website server. Please use the email option to send your enquiry directly.']);
