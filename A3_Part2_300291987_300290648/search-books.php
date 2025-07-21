<?php
require 'db.php';

$query = $_GET['query'] ?? '';
$genre = $_GET['genre'] ?? 'all';
$user_id = $_GET['user_id'] ?? 'all';

$sql = "SELECT books.*, users.username FROM books JOIN users ON books.user_id = users.id WHERE 1=1";
$params = [];

if (!empty($query)) {
  $sql .= " AND (title LIKE ? OR author LIKE ?)";
  $queryParam = "%$query%";
  $params[] = $queryParam;
  $params[] = $queryParam;
}
if ($genre !== 'all') {
  $sql .= " AND genre = ?";
  $params[] = $genre;
}
if ($user_id !== 'all') {
  $sql .= " AND user_id = ?";
  $params[] = $user_id;
}

$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param(str_repeat("s", count($params)), ...$params);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) $books[] = $row;
echo json_encode($books);
?>