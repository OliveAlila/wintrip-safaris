<?php
declare(strict_types=1);
require __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST'); http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON body']); exit; }
$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$destination = trim((string)($input['destination'] ?? ''));
$travelDate = trim((string)($input['travel_date'] ?? ''));
$message = trim((string)($input['message'] ?? ''));
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') { http_response_code(422); echo json_encode(['error' => 'Name, a valid email address and trip details are required.']); exit; }
if (strlen($name) > 160 || strlen($email) > 190 || strlen($destination) > 160 || strlen($message) > 6000) { http_response_code(422); echo json_encode(['error' => 'One or more fields are too long.']); exit; }
$dateValue = null;
if ($travelDate !== '') { $date = DateTime::createFromFormat('!Y-m-d', $travelDate); if (!$date || $date->format('Y-m-d') !== $travelDate) { http_response_code(422); echo json_encode(['error' => 'Travel date must use YYYY-MM-DD format.']); exit; } $dateValue = $travelDate; }
$stmt = $pdo->prepare('INSERT INTO enquiries (name, email, destination, travel_date, message, status, created_at) VALUES (:name, :email, :destination, :travel_date, :message, :status, NOW())');
$stmt->execute(['name' => $name, 'email' => $email, 'destination' => $destination ?: null, 'travel_date' => $dateValue, 'message' => $message, 'status' => 'new']);

// Email the enquiry to the official Wintrip Safaris inbox.
// Use a sender address on the website's hosting domain; the traveller's address is Reply-To.
$recipient = 'wintripsafarishelp@gmail.com';
$subject = 'New Wintrip Safaris trip enquiry';
$safeName = str_replace(["\\r", "\\n"], ' ', $name);
$safeEmail = str_replace(["\\r", "\\n"], '', $email);
$body = "A new trip enquiry was submitted on the Wintrip Safaris website.\\n\\n"
    . "Name: {$safeName}\\n"
    . "Email: {$safeEmail}\\n"
    . "Destination: " . ($destination !== '' ? $destination : 'Not specified') . "\\n"
    . "Travel date: " . ($dateValue ?? 'Not specified') . "\\n\\n"
    . "Trip details:\\n{$message}\\n";
$headers = [
    'From' => 'Wintrip Safaris Website <no-reply@wintrip.page.gd>',
    'Reply-To' => $safeEmail,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion(),
];
$emailSent = @mail($recipient, $subject, $body, $headers);
echo json_encode([
    'ok' => true,
    'saved' => true,
    'email_sent' => $emailSent,
    'message' => $emailSent
        ? 'Thank you — your enquiry has been received and sent to the Wintrip team.'
        : 'Your enquiry was saved, but the email notification could not be sent. Please contact wintripsafarishelp@gmail.com if your request is urgent.'
], JSON_UNESCAPED_UNICODE);
