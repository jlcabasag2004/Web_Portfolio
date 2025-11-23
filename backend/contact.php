<?php
// Contact form handler with PHPMailer
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Include PHPMailer
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate input
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

try {
    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Gmail SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'jlcabasag89@gmail.com';  // Your Gmail address
    $mail->Password = 'okwn bfpi azmp hjfn';  // You'll need to generate an App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('jlcabasag89@gmail.com', 'email-portfolio');
    $mail->addAddress('jlcabasag89@gmail.com', 'JL Cabasag');  // Your email
    $mail->addReplyTo($email, $name);  // Allow reply to sender

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Message from ' . $name;
    
    $mail->Body = "
    <h2>New Contact Form Message</h2>
    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
    <p><strong>Message:</strong></p>
    <p>" . nl2br(htmlspecialchars($message)) . "</p>
    <hr>
    <p><em>Sent from your portfolio contact form</em></p>
    ";

    $mail->AltBody = "
    New Contact Form Message
    
    Name: " . $name . "
    Email: " . $email . "
    Message: " . $message . "
    
    Sent from your portfolio contact form
    ";

    $mail->send();
    
    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully!'
    ]);

} catch (Exception $e) {
    // Error response
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message: ' . $mail->ErrorInfo
    ]);
}
?>
