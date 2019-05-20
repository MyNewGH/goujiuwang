<?php
include 'conn.php';
$page = isset($_POST['page'])?$_POST['page']:'';
$num = isset($_POST['num'])?$_POST['num']:'';
$types = isset($_POST['types'])?$_POST['types']:'';
$checks = isset($_POST['checks'])?$_POST['checks']:'';
$searchname = isset($_POST['searchname'])?$_POST['searchname']:'';

if ($types=="ptype") {
    $sql ="SELECT * FROM product WHERE product_type = '$checks' LIMIT $page,$num";
}else if ($types=="ntype") {
    $sql ="SELECT * FROM product WHERE name = '$checks' LIMIT $page,$num";
}else if ($types=='palcetype') {
    $sql ="SELECT * FROM product WHERE place = '$checks' LIMIT $page,$num";
}else if ($types=='odortype') {
    $sql ="SELECT * FROM product WHERE odor = '$checks' LIMIT $page,$num";
}
else if ($types=="avbtype") {
    $sql ="SELECT * FROM product WHERE avb = '$checks' LIMIT $page,$num";
}else if ($types=='wfptype') {
    $sql ="SELECT * FROM product WHERE wfp = '$checks' LIMIT $page,$num";
}else if ($types=='price_fwtype') {
    $sql ="SELECT * FROM product WHERE price_fw = '$checks' LIMIT $page,$num";
}
if ($searchname) {
    $sql1 ="SELECT * FROM product WHERE $searchname = '$checks'";
}

// echo $ordertype;
// if ($ordertype=="DESC") {
    // echo 123;
// }
// if ($ordername=='xiaoliang') {
//     # code...
// }
$sql2 = "SELECT * FROM product";
$res1 = $conn->query($sql1);
$res2 = $conn->query($sql2);
$res = $conn->query($sql);
    // var_dump($sql1);
$content1 = $res->fetch_all(MYSQLI_ASSOC);
$content2 = $res1->fetch_all(MYSQLI_ASSOC);
$data = array(
        'count' => $res2 ->num_rows,
        'othercount' => $res1 ->num_rows,
        'othertList'=> $content2,
        'productList'=> $content1,
        'page' => $page,//页数
        'num' => $num   //条数
    );
echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>
