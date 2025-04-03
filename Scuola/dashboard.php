<?php
session_start();
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, nome, cognome, password, ruolo FROM utenti WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $nome, $cognome, $hashed_password, $ruolo);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['utente_id'] = $id;
            $_SESSION['nome'] = $nome;
            $_SESSION['cognome'] = $cognome;
            $_SESSION['ruolo'] = $ruolo;
            header("Location: dashboard.php");
        } else {
            echo "Password errata.";
        }
    } else {
        echo "Utente non trovato.";
    }

    $stmt->close();
    $conn->close();
}
?>
