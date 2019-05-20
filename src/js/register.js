/*
 * @Author: Marte
 * @Date:   2019-05-15 09:13:36
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-15 16:52:12
 */
(function() {
    let changeCode = document.getElementById('changeCode');
    let code = document.getElementById('code');
    let tel = document.getElementById('Tel');
    let yzm = document.getElementById('yzm');
    let codenum = document.getElementById('codenum');
    let codeBtn = document.getElementById('codeBtn');
    let password = document.getElementById('password1');
    let passwordA = document.getElementById('passwordA');
    let ts = document.getElementById('ts');
    let regbtn = document.querySelector('.regbtn');
    let phone, yzmval, pwds, pwda,codes = null;
    //获取短信验证码
    codeBtn.onclick = () => {
        var timer = null;
        console.log(timer);
        phone = tel.value;
        yzmval = yzm.value;
        //判断是否输入手机号
        if (phone) {
            //手机号验证是否正确
            var ispass = checked.tel(phone);
            //判断验证码输入是否正确
            if (yzmval.toLowerCase() == code.innerHTML.toLowerCase()) {
                if (ispass) {
                    ajax2({
                        type: 'post',
                        url: '../api/php/checkPhone.php',
                        data: 'phone=' + phone,
                        success: function(str) {
                            if (str == 'yes') {
                                alert('改手机号已经注册过了，可以直接登录');
                            }else{
                             //调用短信接口获取短信验证码
                               /* ajax2({
                                    type:'post',
                                    url : '../api/php/code.php',
                                    data: 'phone=' + phone,
                                    success : function(str){
                                        console.log(str);
                                    }
                                })*/
                            }
                        }
                    })
                    let time = 60;
                    timer = setInterval(function() {
                        if (time >= 0) {
                            codeBtn.innerHTML = "重新发送(" + time + ")";
                            codeBtn.disabled = 'disabled';
                            codeBtn.style.cursor = 'text'
                            time--;
                        } else {
                            codeBtn.innerHTML = "重新发送";
                            clearInterval(timer);
                            codeBtn.style.cursor = 'pointer';
                            codeBtn.disabled = '';
                        }
                    }, 1000);

                } else {
                    alert('验证码不正确');
                }
            } else {
                alert('手机号格式不正确');
            }
        } else {
            alert('请输入手机号');
        }
    }

    function init() {
        code.style.background = ranRgba(0, 0, 0);
        code.style.color = ranRgb(0, 0, 0);
        code.innerText = ranCode();
    }
    //初始化验证码
    init();
    //点击切换验证码
    changeCode.onclick = function() {
        init();
    }
    //密码验证
    password1.onblur = function() {
        pwds = password.value;
        let ispass = checked.pwd(pwds);
        if (ispass) {
            ts.style.display = 'inline-block';
            ts.style.color = '#58bc58';
            ts.style.right = -80 + 'px'
            ts.innerHTML = '密码没啥问题';
        } else {
            ts.style.display = 'inline-block';
            ts.style.right = -145 + 'px'
        }
    }
    //再次输入密码
    passwordA.onblur = function() {
        pwds = password.value;
        pwda = passwordA.value;
        let ispass = checked.pwdAgain(pwds, pwda);
        if (!ispass || pwda == '') {
            alert("两次密码不一致");
        };
    }
    //点击注册
    regbtn.onclick = function() {
        codes =codenum.value;
        //判断信息是否都不为空
        console.log(codes);
        console.log(phone , yzmval , codes , pwds , pwda);
        if (phone && yzmval && codes && pwds && pwda) {
            // 插入信息到数据库
            ajax2({
                type:'post',
                url:'../api/php/register.php',
                data :'phone='+phone+'&password='+pwds+'&type=r',
                success:function(str){
                    if (str=='yes') {
                        alert('注册新会员成功');
                        location.href = 'login.html';
                    }else{
                        alert('注册新会员失败');
                    }
                }
            })
        } else {
            alert('请完善你的注册信息');
        }
    }
})()