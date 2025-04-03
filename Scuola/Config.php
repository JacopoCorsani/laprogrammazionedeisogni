<?php
$servername = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "scuola_db";

$conn = new mysqli($servername, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Errore di connessione: " . $conn->connect_error);
}
?>
