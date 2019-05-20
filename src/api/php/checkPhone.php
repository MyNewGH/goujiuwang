<?php

    $phone = isset($_POST['phone'])?$_POST['phone']:'';
    // echo $name;
    include 'conn.php';
    $sql = "SELECT * FROM users WHERE phone = '".$phone."'";
    $res = $conn->query($sql);
    if ($res->num_rows) {
       echo 'yes';
    }
    else  {
        echo 'no';
    }
?>
