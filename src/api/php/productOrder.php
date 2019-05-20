<?php
include 'conn.php';
$page = isset($_POST['page'])?$_POST['page']:'';
$num = isset($_POST['num'])?$_POST['num']:'';
$searchname = isset($_POST['searchname'])?$_POST['searchname']:'';
$ordertype = isset($_POST['ordertype'])?$_POST['ordertype']:'';
// $ordername = isset($_POST['ordername'])?$_POST['ordername']:'';
// var_dump($searchname,$page,$num,$ordertype);
$sql='';
$sql1='';

 $sql ="SELECT * FROM product ORDER BY $searchname DESC LIMIT $page,$num";
if ($ordertype) {  # code...
   $sql1 ="SELECT * FROM product ORDER BY $searchname $ordertype";
}
// var_dump($sql1);
$res = $conn->query($sql);
// var_dump($sql);
$res1 = $conn->query($sql1);
    // var_dump($content);
$content = $res->fetch_all(MYSQLI_ASSOC);
$content1 = $res1->fetch_all(MYSQLI_ASSOC);
$data = array(
        'count' => $res1 ->num_rows,
        'ordercount' => $res ->num_rows,
        'orderList'=> $content1,
        'productList'=> $content,
        'page' => $page,//页数
        'num' => $num   //条数
    );
echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>
