<?php
// $_POST['name'] = "test";
// $_POST['phone'] = "+7 (921) 232-23-23";
// $_POST['vacancy'] = "1";
//"{"name":"sdfdslm","phone":"+1 (231) 313-12-31","va…↵2↵Продавец-кассир, г. Санкт-Петербург{"error":0}"
// xhr = Object {readyState: 4, responseText: "{"name":"sasxa","phone":"+1 (231) 323-13-12","vaca…тор торгового зала, г. Санкт-Петербург{"error":0}", status: 200, statusText: "OK"}

// echo json_encode($_POST);
if ($_POST) { 
  $name = htmlspecialchars($_POST["name"]); 
  $phone = htmlspecialchars($_POST["phone"]);
  $vacancy = intval(htmlspecialchars($_POST["vacancy"]));
  // echo $name."\n";
  // echo $phone."\n";
  // echo $vacancy."\n";

  $json = array();
  if (!$name or !$phone or !$vacancy) {
    $json['error'] = 'Вы зaпoлнили нe всe пoля! oбмaнуть рeшили?';
    echo json_encode($json);
    die();
  }
  $text_vacancy = "";
  switch($vacancy){
    case 1:
      $text_vacancy = "Администратор торгового зала, г. Санкт-Петербург";
      break;
    case 2:
      $text_vacancy = "Продавец-кассир, г. Санкт-Петербург";
      break;
    case 3:
      $text_vacancy = "Продавец-кассир, г. Сочи";
      break;
    default: throw new Exception('Unexpected case in vacancy!');
  }
  // echo $text_vacancy;

  function mime_header_encode($str, $data_charset, $send_charset) { 
    if($data_charset != $send_charset)
    $str=iconv($data_charset,$send_charset.'//IGNORE',$str);
    return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
  }
  
  class TEmail {
    public $from_email;
    public $from_name;
    public $to_email;
    public $to_name;
    public $subject;
    public $data_charset='UTF-8';
    public $send_charset='windows-1251';
    public $body='';
    public $type='text/plain';

    function send(){
      $dc=$this->data_charset;
      $sc=$this->send_charset;
      $enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
      $enc_subject=mime_header_encode($this->subject,$dc,$sc);
      $enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
      $enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
      $headers='';
      $headers.="Mime-Version: 1.0\r\n";
      $headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
      $headers.="From: ".$enc_from."\r\n";
      return mail($enc_to,$enc_subject,$enc_body,$headers);
    }
  }

  $emailgo= new TEmail; 
  $emailgo->from_email= 'some@mailserver.com'; 
  $emailgo->from_name= 'Форма вакансий';
  $emailgo->to_email= 'kulikov@mbrooks.ru'; 
  $emailgo->to_name= $name;
  $emailgo->subject= 'Заявка на вакансию с посадочного сайта'; // тeмa
  $emailgo->body= "Заявка \r\n Имя : ".$name."\r\n Телефон : ".$phone."\r\nВакансия : ".$text_vacancy."\r\n";
  // $emailgo->body= "test message";
  $emailgo->send();

  $json['error'] = 0;
  echo json_encode($json);
} else {
  echo 'GET LOST!';
}
?>