<?php
// Percorso del file di log
$logFile = 'access_log.txt'; // Assicurati che questo file esista o venga creato nella stessa directory

// Prendi l'IP dell'utente
$ipAddress = $_SERVER['REMOTE_ADDR'];

// Prendi la data e l'ora di accesso
$timestamp = date("Y-m-d H:i:s");

// Crea la stringa da aggiungere al file di log
$logEntry = "IP: $ipAddress - Accesso: $timestamp\n";

// Scrivi il log nel file
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// Reindirizza l'utente alla tua pagina principale (index.html o main.html)
header("Location: main.html");
exit;
?>
