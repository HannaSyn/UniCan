<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

header('Content-type: application/json');

$privatekey = '6Ldc_CoaAAAAACPFLitKzv8DFQCQFo5DF0CVkBHn';
$response = $_POST['g-recaptcha-response'];
$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$privatekey}&response={$response}");
$captchaSuccess = json_decode($verify);
if ($captchaSuccess->success != true) {
  echo json_encode(['message' => 'Captcha validation failed']);
  die;
} 


$mail = new PHPMailer();
                  
$mail->isSMTP();   
$mail->CharSet = "UTF-8";
$mail->SMTPAuth   = true;
$mail->SMTPDebug = 2;
$mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

$mail->Host = 'smtp.gmail.com'; 
$mail->Username = 'importsunican@gmail.com';
$mail->Password = 'qmjciyynqzfqxiiq';
$mail->SMTPSecure = 'ssl'; 
$mail->Port = 465;

$mail->setLanguage('ru', '../PHPMailer/language');
$mail->isHTML(true);

$mail->setFrom('importsunican@gmail.com', 'UniCan.info');
$mail->addAddress('importsunican@gmail.com');
$mail->Subject = 'Message from '.$_POST['name'].'';

$body = '<h3>You have new response!</h3>';

if(trim(!empty($_POST['name']))) {
  $body.='<p>Name: '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
  $body.='<p>E-mail: '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))) {
  $body.='<p>Message: '.$_POST['message'].'</p>';
}

if(!empty($_FILES['file']['tmp_name'])) {
  $filePath = __DIR__ . "/files/" . $_FILES['file']['name'];
  if(copy($_FILES['file']['tmp_name'], $filePath)) {
    $fileAttach = $filePath;
    $body.='<p>Attached file</p>';
    $mail->addAttachment($fileAttach);
  }
}


$mail->Body = $body;

if(!$mail->send()) {
  $message = $mail->ErrorInfo;
} else {
  $message = 'Data is sended!';
}

$response = ['message' => $message];

echo json_encode($response);

?>
