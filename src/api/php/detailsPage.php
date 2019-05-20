<?php
include 'conn.php';
$id = isset($_POST['id'])?$_POST['id']:'';

$sql = "SELECT * FROM product WHERE id = $id";


$res = $conn -> query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);

$data = array(
        'count' => $res ->num_rows,
        'infos'=> $content,
    );
echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>
