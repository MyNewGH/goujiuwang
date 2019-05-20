<?php
//你要注册的手机号
$phone = isset($_POST['phone'])?$_POST['phone']:'';
$code = rand(100000,999999);//随机6位数验证码
$url = "http://v.juhe.cn/sms/send";
$params = array(
    'key'   => '52acd59cb092ee6c3f9320b2397e3ff7', //您申请的APPKEY
    'mobile'    => $phone, //接受短信的用户手机号码
    'tpl_id'    => '128475', //您申请的短信模板ID，根据实际情况修改
    'tpl_value' =>'#code#='.$code.'&#company#=聚合数据' //您设置的模板变量，根据实际情况修改
);

$paramstring = http_build_query($params);
$content = juheCurl($url, $paramstring);
$result = json_decode($content, true);
if ($result) {
    var_dump($result);
} else {
    //请求异常
}

/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juheCurl($url, $params = false, $ispost = 0)
{
    $httpInfo = array();
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'JuheData');
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if ($ispost) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_URL, $url);
    } else {
        if ($params) {
            curl_setopt($ch, CURLOPT_URL, $url.'?'.$params);
        } else {
            curl_setopt($ch, CURLOPT_URL, $url);
        }
    }
    $response = curl_exec($ch);
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
    curl_close($ch);
    return $response;
}
?>