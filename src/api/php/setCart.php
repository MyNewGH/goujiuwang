<?php
    include 'conn.php';
    //$com == 1 : 修改订单
    //$com == 2 : 删除订单
    //$com == 3 : 删除所有订单
    $com = isset($_GET['com']) ? $_GET['com'] : null;
    $oid = isset($_GET['oid']) ? $_GET['oid'] : null;
    $prices=isset($_GET['prices']) ? $_GET['prices'] : null;
    $u_phone = isset($_GET['u_phone']) ? $_GET['u_phone'] : null;
    $num = isset($_GET['num']) ? $_GET['num'] : null;
    // var_dump($num,$u_phone,$oid,$prices);
    switch($com) {
        case 1:
            $res = $conn->query("update orders set pro_nums=$num , sum_price= $prices where ids=$oid and u_phone=$u_phone");
            break;
        case 2:
            $res = $conn->query("delete from orders where ids=$oid and u_phone=$u_phone");
            break;
        case 3:
            $res = $conn->query("delete from orders where u_phone=$u_phone");
            break;
        default:
            break;
    }
$sql ="SELECT * from `orders` where u_phone = $u_phone";
$res = $conn ->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
$data = array(
        'count' => $res ->num_rows,
        'orderList'=> $content,
    );
echo json_encode($data,JSON_UNESCAPED_UNICODE);
// if($res == true) {
//         echo 'yes';
//     } else {
//         echo 'no';
//     }
    $conn->close();


?>