<?php
$conn = new mysqli("localhost", "root", "", "www-structure-books");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
?>