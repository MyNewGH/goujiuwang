<?php
$serverName = 'localhost';
$userName = 'root';
$password = '';
$dbname = 'gjw';

$conn = new mysqli($serverName,$userName,$password,$dbname);
$conn->query("SET NAMES utf8");
    if ($conn -> connect_error) {
        # code...
        die("连接失败" .$conn ->connect_error);
    }
?>
