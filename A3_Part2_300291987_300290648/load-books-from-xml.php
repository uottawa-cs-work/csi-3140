<?php
require 'db.php';
$xml = new DOMDocument();
$xml->load("book-format.xml");
$ns = "http://localhost/www-structure-books";
$books = $xml->getElementsByTagNameNS($ns, "book");
foreach ($books as $book) {
  $title = $book->getElementsByTagNameNS($ns, "title")->item(0)->nodeValue;
  $author = $book->getElementsByTagNameNS($ns, "author")->item(0)->nodeValue;
  $genre = $book->getElementsByTagNameNS($ns, "genre")->item(0)->nodeValue;
  $year = $book->getElementsByTagNameNS($ns, "year")->item(0)->nodeValue;
  $username = $book->getElementsByTagNameNS($ns, "user")->item(0)->nodeValue;

  $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  if ($result->num_rows === 0) continue;
  $user_id = $result->fetch_assoc()['id'];
  $stmt = $conn->prepare("INSERT INTO books (title, author, genre, year, user_id) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sssii", $title, $author, $genre, $year, $user_id);
  $stmt->execute();
}
?>