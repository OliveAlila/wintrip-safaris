<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}
$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$destination = trim((string)($input['destination'] ?? ''));
$travelDate = trim((string)($input['travel_date'] ?? ''));
$message = trim((string)($input['message'] ?? ''));
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Name, a valid email address and trip details are required.']);
    exit;
}
if (strlen($name) > 160 || strlen($email) > 190 || strlen($destination) > 160 || strlen($message) > 6000) {
    http_response_code(422);
    echo json_encode(['error' => 'One or more fields are too long.']);
    exit;
}
$dateValue = null;
if ($travelDate !== '') {
    $date = DateTime::createFromFormat('!Y-m-d', $travelDate);
    if (!$date || $date->format('Y-m-d') !== $travelDate) {
        http_response_code(422);
        echo json_encode(['error' => 'Travel date must use YYYY-MM-DD format.']);
        exit;
    }
    $dateValue = $travelDate;
}

// Attempt database storage, but do not let a database outage prevent email delivery.
$saved = false;
$dbError = null;
$configPath = __DIR__ . '/config.php';
if (is_file($configPath)) {
    try {
        $config = require $configPath;
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $config['host'], $config['database'], $config['charset'] ?? 'utf8mb4');
        $pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $stmt = $pdo->prepare('INSERT INTO enquiries (name, email, destination, travel_date, message, status, created_at) VALUES (:name, :email, :destination, :travel_date, :message, :status, NOW())');
        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'destination' => $destination ?: null,
            'travel_date' => $dateValue,
            'message' => $message,
            'status' => 'new',
        ]);
        $saved = true;
    } catch (Throwable $e) {
        error_log('Wintrip enquiry database save failed: ' . $e->getMessage());
        $dbError = 'The enquiry could not be saved to the website database.';
    }
} else {
    $dbError = 'Database configuration is not installed yet.';
}

// Email the enquiry to the official Wintrip Safaris inbox.
$recipient = 'wintripsafarishelp@gmail.com';
$subject = 'New Wintrip Safaris trip enquiry';
$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$safeDestination = str_replace(["\r", "\n"], ' ', $destination);
$body = "A new trip enquiry was submitted on the Wintrip Safaris website.\n\n"
    . "Name: {$safeName}\n"
    . "Email: {$safeEmail}\n"
    . "Destination: " . ($safeDestination !== '' ? $safeDestination : 'Not specified') . "\n"
    . "Travel date: " . ($dateValue ?? 'Not specified') . "\n\n"
    . "Trip details:\n{$message}\n";
$headers = [
    'From' => 'Wintrip Safaris Website <no-reply@wintrip.page.gd>',
    'Reply-To' => $safeEmail,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion(),
];
$emailSent = @mail($recipient, $subject, $body, $headers);

if (!$emailSent && !$saved) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'saved' => false,
        'email_sent' => false,
        'error' => 'We could not send your enquiry email or save it. Please email wintripsafarishelp@gmail.com directly.',
        'database_error' => $dbError,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
echo json_encode([
    'ok' => true,
    'saved' => $saved,
    'email_sent' => $emailSent,
    'message' => $emailSent
        ? ($saved ? 'Thank you — your enquiry was emailed to the Wintrip team and saved.' : 'Thank you — your enquiry was emailed to the Wintrip team. Website database storage is temporarily unavailable.')
        : 'Your enquiry was saved, but email delivery failed. Please contact wintripsafarishelp@gmail.com if your request is urgent.',
], JSON_UNESCAPED_UNICODE);
