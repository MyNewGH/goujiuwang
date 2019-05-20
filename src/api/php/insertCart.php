<?php
include 'conn.php';
$uphone = isset($_POST['uphone'])?$_POST['uphone']:'';
$pid = isset($_POST['pid'])?$_POST['pid']:'';
$pimg = isset($_POST['pimg'])?$_POST['pimg']:'';
$titles = isset($_POST['titles'])?$_POST['titles']:'';
$kucuns = isset($_POST['kucuns'])?$_POST['kucuns']:'';
$uprice = isset($_POST['uprice'])?$_POST['uprice']:'';
$pnum = isset($_POST['pnum'])?$_POST['pnum']:'';
$count_price = isset($_POST['count_price'])?$_POST['count_price']:'';
$addprice =  isset($_POST['addprice'])?$_POST['addprice']:'';
$peps =  isset($_POST['peps'])?$_POST['peps']:'';
$zong = $addprice + $count_price;
$zongmun = $pnum  + $peps;
var_dump($zong,$zongmun);
// var_dump($uphone,$pid,$pimg,$titles,$uprice,$pnum,$count_price);
$resOrder = $conn->query("select * from `orders` where id=$pid and u_phone = $uphone");
var_dump(mysqli_num_rows($resOrder));
if (mysqli_num_rows($resOrder) == 0) {
    $sql = "INSERT INTO `orders` (u_phone,id,bigimg,title,kucun,price,pro_nums,sum_price) VALUES ('$uphone',$pid,'$pimg','$titles','$kucuns',$uprice,$pnum,$count_price)";
}else{
    $sql = "UPDATE  `orders` SET pro_nums=$zongmun ,sum_price=$zong where  id=$pid and u_phone= $uphone";
}

$res = $conn->query($sql);
// echo "ID of last inserted recordis: ".mysql_insert_id();



if ($res) {
   echo "yes";
}else{
    echo "no";
}

?>
