<?php

    include 'conn.php';
    $phone = isset($_POST['phone'])?$_POST['phone']:'';
    $password = isset($_POST['password'])?$_POST['password']:'';
    $type = isset($_POST['type'])?$_POST['type']:'';
    if ($type=="l") {
       $sql = "SELECT * FROM users WHERE phone='$phone' AND password='$password'";
        //执行语句
        $res = $conn->query($sql);//结果集
        //找到就返回状态
        if($res->num_rows) {
            //找到，允许登陆
            echo 'yes';
        }else{
            //找不到，不允许登陆
            echo 'no';
        }
    }else if ($type=="r") {
        $inset = "INSERT INTO users (phone,password) values ('$phone','$password')";
        $res = $conn -> query($inset);
        if ($res) {
           echo 'yes';
        }
        else  {
            echo 'no';
        }
    }
    $res ->close();
    $conn ->close();
?>
