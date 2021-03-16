<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

sleep(3);

$body = '';

$customTitle = 'Узнать стоимость';
foreach ($_POST as $key => $value) {
    $keyTranslated = $key;
    if (empty($value)) {
        continue;
    }

    if ($key === 'name') {
        $keyTranslated = 'Название компании';
    }
    if ($key === 'address') {
        $keyTranslated = 'Адрес';
    }
    if ($key === 'site') {
        $keyTranslated = 'Сайт';
    }
    if ($key === 'email') {
        $keyTranslated = 'Почта';
    }
    if ($key === 'phone') {
        $keyTranslated = 'Телефон';
    }
    if ($key === 'fio') {
        $keyTranslated = 'Имя';
        $customTitle = 'Зафиксировать скидку';
    }
    $body .= "
        <tr style='background-color: #f8f8f8'>
            <td style='padding: 10px; border: 1px solid #e9e9e9'><b>$keyTranslated</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9'><b>$value</b></td>
        </tr>";
}

$body = "
        <h1>$customTitle</h1>
        <table style='width: 100%;'>$body</table>";

// Формирование самого письма
$title = 'Дорожные знаки';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'sergey.student1994@mail.ru'; // Логин на почте
    $mail->Password   = ''; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sergey.student1994@mail.ru', 'Сергей'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('drumer19940310@mail.ru');

    // // Настройки вашей почты
    // $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    // $mail->Username   = 'dorojnye.znaki@yandex.ru'; // Логин на почте
    // $mail->Password   = ''; // Пароль на почте
    // $mail->SMTPSecure = 'ssl';
    // $mail->Port       = 465;
    // $mail->setFrom('dorojnye.znaki@yandex.ru', 'Дорожные Знаки'); // Адрес самой почты и имя отправителя

    // // Получатель письма
    // $mail->addAddress('tk@lmgmedia.ru');
    // $mail->addAddress('mirotin@lmgmedia.ru');
    // $mail->addAddress('sabirov@lmgmedia.ru');

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

echo json_encode($body);

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// // Отображение результата
// echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);