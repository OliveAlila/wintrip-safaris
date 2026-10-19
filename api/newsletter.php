<?php
declare(strict_types=1);
require __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Allow: POST'); http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit; }
$input = json_decode(file_get_contents('php://input'), true);
$email = trim((string)($input['email'] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) { http_response_code(422); echo json_encode(['error'=>'Enter a valid email address.']); exit; }
$stmt = $pdo->prepare('INSERT INTO newsletter_subscribers (email, created_at) VALUES (:email, NOW()) ON DUPLICATE KEY UPDATE email = VALUES(email)');
$stmt->execute(['email'=>$email]);
echo json_encode(['ok'=>true,'message'=>'Thanks for subscribing!']);
