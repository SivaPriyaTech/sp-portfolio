<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $entered_otp = $_POST['otp'];
    $email = $_POST['email'];

    if (!isset($_SESSION["otp"]) || $_SESSION["otp_email"] !== $email) {
        echo "Invalid OTP session. Try again.";
        exit();
    }

    if ($entered_otp == $_SESSION["otp"]) {
        unset($_SESSION["otp"]); 
        unset($_SESSION["otp_email"]);
        echo "OTP Verified";
    } else {
        echo "Incorrect OTP. Please try again.";
    }
}
?>
