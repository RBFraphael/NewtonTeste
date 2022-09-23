<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';

require './config.php';

$mail = new PHPMailer(true);

$input = json_decode(file_get_contents('php://input'), true);

header("Content-type: application/json");

try {
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host = $SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP_USERNAME;
    $mail->Password = $SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $SMTP_PORT;

    $mail->setFrom("donotreply@healthclinic.com.br", $input['name'] ?? "Contato");
    $mail->addReplyTo($input['email'] ?? "", $input['name'] ?? "");
    $mail->addAddress($input['email'] ?? "", $input['name'] ?? "");

    $mail->CharSet = "UTF-8";
    $mail->Subject = $input['subject'] ?? "";
    $mail->Body = $input['message'] ?? "";

    $mail->send();

    echo json_encode([
        'status' => "success",
        'name' => $input['name'] ?? "",
        'email' => $input['email'] ?? "",
        'subject' => $input['subject'] ?? "",
        'message' => $input['message'] ?? "",
    ]);
} catch(Exception $e) {
    echo json_encode([
        'status' => "error",
        'error' => $mail->ErrorInfo,
        'post' => $_POST,
        'get' => $_GET,
        'request' => $_REQUEST,
        'input' => $input,
        'name' => $_POST['name'] ?? "",
        'email' => $_POST['email'] ?? "",
        'subject' => $_POST['subject'] ?? "",
        'message' => $_POST['message'] ?? "",
    ]);
}

exit();