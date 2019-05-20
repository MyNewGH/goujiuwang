<?php
include 'conn.php';
$Allid = isset($_POST['Allid'])?$_POST['Allid']:'';
$type = isset($_POST['type'])?$_POST['type']:'';
// $phone =  isset($_POST['phone'])?$_POST['phone']:'';
if ($type=='cookies') {
    $sql ="SELECT * FROM product WHERE id in ($Allid)";
}else if ($type=='tel') {
    $sql ="SELECT * FROM orders WHERE u_phone = $Allid";
}elseif ($type=='danid') {
    $sql ="SELECT * FROM product WHERE id = $Allid";
}
$res = $conn->query($sql);
// var_dump($res,$sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
$data = array(
        'ordercount' => $res ->num_rows,
        'ordertList'=> $content
    );
echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>
