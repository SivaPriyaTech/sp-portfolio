<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone-number'];
    $message = $_POST['message'];

    $sql = "INSERT INTO contact_details (name, phone_number, email, message) VALUES ('$name','$phone','$email','$message')";
    $conn -> query($sql);
    $conn->close();

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'abish0721@gmail.com';
        $mail->Password = 'ekyijzdquerpsmoa';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('abish0721@gmail.com', 'Portfolio - Contact');
        $mail->addAddress('abishabi2107@gmail.com');
        // $mail->addCC('abish0721@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'Portfolio - Contact';
        $mail->Body = "<b>$name</b> Has Submited your portfolio contact form.<br>The email id is: $email<br>Phone number is: $phone<br>Message is: $message";

        if ($mail->send()) {
            echo "Form submitted successfully!";
        } else {
            echo "Email sending failed";
        }

    } catch (Exception $e) {
        echo "Faild to Submit";
    }
}
?>
