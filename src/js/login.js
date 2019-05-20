/*
 * @Author: Marte
 * @Date:   2019-05-15 09:13:36
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 10:00:17
 */
(function() {
    let myphone = document.getElementById('myphone');
    let pwd = document.getElementById('pwd');
    let loginbtn = document.getElementById('loginbtn');
    let phone, pwds = null;
    //点击登录
    loginbtn.onclick = function() {
        phone =myphone.value;
        pwds =pwd.value;
        //判断信息是否都不为空
        if (phone && pwds) {
            ajax2({
                type:'post',
                url:'../api/php/register.php',
                data :'phone='+phone+'&password='+pwds+'&type=l',
                success:function(str){
                    if (str=='yes') {
                        setCookie('phone',myphone.value,3);
                        // setCookie('phone',myphone.value,3);
                        location.href = 'main.html';
                    }else{
                        alert('账号或密码错误，请重新输入');
                    }
                }
            })
        } else {
            alert('请输入账号密码');
        }
    }
})()