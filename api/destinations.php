<?php
declare(strict_types=1);
require __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET'); http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}
$stmt = $pdo->query('SELECT id, name, region, description, image_url, visa_note FROM destinations WHERE is_active = 1 ORDER BY sort_order, name');
echo json_encode(['destinations' => $stmt->fetchAll()], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
