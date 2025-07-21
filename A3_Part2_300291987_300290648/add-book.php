<?php
require 'db.php';

// Get the input data from the POST request
$title = $_POST['title'] ?? null;
$author = $_POST['author'] ?? null;
$genre = $_POST['genre'] ?? null;
$year = $_POST['year'] ?? null;
$user_id = $_POST['user_id'] ?? null;

// Validate the input
if (!$title || !$author || !$genre || !$year || !$user_id) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO books (title, author, genre, year, user_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssii", $title, $author, $genre, $year, $user_id); // "sssii" = string, string, string, integer, integer

$success = $stmt->execute();

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Book added successfully.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to add the book.']);
}
?>
