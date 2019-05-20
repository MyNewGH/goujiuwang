/*
 * @Author: Marte
 * @Date:   2019-04-07 13:45:03
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 19:48:32
 */

function filter(str) {
    var arr = ['日', '操', '我日', '我操', '操', '操你妈', '傻逼', '贱人', '妈的', 'fuck', '妈蛋', '法轮功', '反清复明', '金三胖', '去死', 'MMP'];
    arr.forEach(function(item) {
        var f = new RegExp(item, 'gi');
        str = str.replace(f, '***');
    })
    return str;
}

function ranCode() {
    var html = '0987654321zxcvbnmkjhgfdsaqwertyuioplZXCVBNMLKJHGFDSAQWERTYUIOP';
    var nums = '';
    for (var i = 0; i < 4; i++) {
        var codeValue = parseInt(Math.random() * html.length);
        // console.log(codeValue);
        nums += html[codeValue];
    }
    // console.log(nums);
    return nums;
}
// 参数转对象
function strObj(arr) {
    var arr = arr.split('&');
    var obj = {};
    arr.forEach(function(item) {
        var splitEquare = item.split('=');
        obj[splitEquare[0]] = splitEquare[1];
    })
    return obj;
}
// 对象转参数
function objStr(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(i, '=', obj[i], '&');
    }
    var str = arr.join('');
    var str2 = str.slice(0, -1);
    return str2;
}
//随机数
function ranNum(min, max) {
    return parseInt(Math.random() * (max - min) + 1) + min;
}
//随机背景颜色
function ranColor(colors) {
    if (colors == 16) {
        var str = '#';
        var color = '0123456789abcdef';
        for (var i = 0; i < 6; i++) {
            var myColor = parseInt(Math.random() * color.length);
            str += color[myColor];
        }
        return str;
    }

    // console.log(str);
}
//随机背景颜色+透明度

function toDB(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}
//毫秒数->xx天xx时xx分xx秒
function secondToDay(times) {
    var day = parseInt(times / 3600 / 24);
    var hour = parseInt(times / 3600) % 24;
    var minute = parseInt(times / 60) % 60;
    var second = times % 60;
    console.log(day + '天' + hour + '时' + minute + '分' + second + '秒');
    return {
        days: day,
        hours: hour,
        mimutes: minute,
        seconds: second
    }
}
//毫秒数->xx年xx月xx天xx时xx分xx秒
function setTimes(data){
    var time = new Date(data);
    var year = time.getFullYear();
    var mon = toDB(time.getMonth()+1);
    var day = toDB(time.getDate());
    var hour = toDB(time.getHours());
    var min = toDB(time.getMinutes());
    var sec = toDB(time.getSeconds());

    return {
        years : year,
        mons :mon,
        days :day,
        hours : hour,
        mins : min,
        secs : sec
    }
}
function ranRgb(num1, num2, num3) {
    if (num1, num2, num3 >= 0) {
        var str1 = 'rgb(';
        var str2 = ')';
        var r = g = b = 0;
        // console.log(r,g,b);
        for (var i = 0; i < 256; i++) {
            r = parseInt(Math.random() * i);
            g = parseInt(Math.random() * i);
            b = parseInt(Math.random() * i);
            a = Math.random().toFixed(1);
            // var x = str1 + r + ',' + g + ',' + b + ',' + a + str2;
            var x = str1 + r + ',' + g + ',' + b + str2;
        }
        // console.log(x);
        return x;

    };


}
function ranRgba(num1, num2, num3) {
    if (num1, num2, num3 >= 0) {
        var str1 = 'rgba(';
        var str2 = ')';
        var r = g = b = 0;
        // console.log(r,g,b);
        for (var i = 0; i < 256; i++) {
            r = parseInt(Math.random() * i);
            g = parseInt(Math.random() * i);
            b = parseInt(Math.random() * i);
            a = Math.random().toFixed(1);
            var x = str1 + r + ',' + g + ',' + b + ',' + a + str2;
            // var x = str1 + r + ',' + g + ',' + b + str2;
        }
        // console.log(x);
        return x;

    };


}
//字符串出现个数
function stringNum(newstr) {
    var str1 = {};
    for (i = 0; i < newstr.length; i++) {
        var index = newstr.charAt(i);
        if (str1[index]) {
            str1[index]++;
        } else {
            str1[index] = 1;
        }
    }
    return str1;
}

function firstChild(ele) {
    if (ele.firstElementChild) {
        return ele.firstElementChild; //高级浏览器
    } else {
        return ele.firstChild; //IE8-
    }
}

function lastChild(ele) {
    if (ele.lastElementChild) {
        return ele.lastElementChild;
    } else {
        return ele.lastChild;
    }
}

function nextSibling(ele) {
    if (ele.nextElementSibling) {
        return ele.nextElementSibling;
    } else {
        return ele.nextSibling;
    }
}

//封装函数：绑定事件    jq  bind()  on()
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        ele.attachEvent('on' + type, fn)
    }
}
//正则表达式
//调用方法：
// checkReg.tel();
var checked = {
    //去掉前后空格
    trim: function(str) {
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    //号码
    tel: function(str) {
        var reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    },
    //邮箱
    email: function(str) {
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(str);
    },
    //身份证
    idcard: function(str) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}[x|X]$)/;
        return reg.test(str);
    },
    //密码
    pwd: function(str) {
        var reg = /^[0-9a-zA-Z]\w{5,17}$/;
        var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,16}$/;
        return reg1.test(str);
    },
    //验证再次输入密码是否相等
    pwdAgain: function(str1, str2) {
        return str1 === str2;
    },
   urladr: function(str) {
            //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    //账号
    name: function(str) {
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    //中文
    chinese: function(str) {
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function(str) { //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }

}

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function() {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //          console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = getStyle(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getStyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}

function css() {
    if (arguments.length == 2) {
        return getComputedStyle(arguments[0], false)[arguments[1]];
    } else if (arguments.length == 3) {
        arguments[0].style[arguments[1]] = arguments[2];
    }
}
//class继承
var insertion = function(subClass, superClass) {
    if (arguments.length !== 2) {
        throw new Error("必须明确的指定子类和父类");
    }
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== 'function') {
            throw new Errorr("所给的子类和父类必须都是function");
        }
    }
    var copySuper = new superClass();
    for (var key in copySuper) {
        if (!subClass.prototype[key]) {
            subClass.prototype[key] = copySuper[key];
        };
        subClass.prototype.constructor = subClass;
    }
}

function inherits(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}

//AJAX
function ajax1(type, url, data, fn) {
    var xmlHttp = new XMLHttpRequest();
    if (type.toLowerCase() == 'get') {
        //get方式
        url += '?' + data; //data为拼接好的数据
        xmlHttp.open('get', url, true);
        xmlHttp.send(null);
    } else {
        //post方式
        xmlHttp.open('post', url, true);
        xmlHttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xmlHttp.send(data);

    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                fn(xmlHttp.responseText);
            } else {
                alert('发生错误，状态码为：' + xmlHttp.status);
            }
        };
    }
}

function ajax2(obj) {
    function extend(obj1, obj2) {
        for (var key in obj1) {
            obj2[key] = obj1[key];
        }
    }
    var defaults = {
        flag: true,
        data: ''
    }
    extend(obj, defaults);
    var xmlhttp = new XMLHttpRequest();
    if (defaults.type.toLowerCase() == 'get') {
        defaults.url += '?' + defaults.data;
        xmlhttp.open('get', defaults.url, defaults.flag)
        xmlhttp.send(null);
    } else {
        xmlhttp.open('post', defaults.url, defaults.flag);
        xmlhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(defaults.data);
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                defaults.success(xmlhttp.responseText);
            } else {
                alert('发生错误，状态码为：' + xmlhttp.status);
            }
        };
    }
}
// 创建一个名为animate的函数！obj为对象，json是json值，fn是回调函数！
// function animate(obj,json,fn){
//     //清除定时器，这一步是有影响的！
//     clearInterval(obj.timer);
//     // 给对象设置一个定时器！
//     obj.timer = setInterval(function(){
//         //用来判断定时器什么时候停止！
//         var flag = true;

//         //for in 循环，遍历json对象！
//         for(var attr in json){
//             var current = 0;
//             // 当前的状态，这一步很重要！
//             if (attr == "opacity") {
//                 current = parseInt(getStyle(obj,attr)*100);
//             }
//             else{
//                 current = parseInt(getStyle(obj,attr));
//             }
//              // 步长！
//             var step = (json[attr] - current)/10;
//             step = step > 0 ? Math.ceil(step) : Math.floor(step);

//             // 判断透明度！
//             if (attr == "opacity") {
//                 //in是一个二元的运算符，意思是第一个操作数的值是第二个操作数的属性名，会返回true！
//                 // 这样就可以判断这个对象的样式上中是否有opacity的属性了！
//                 if ("opacity" in obj.style) {
//                     // 如果条件成立，设置透明度值
//                     obj.style.opacity = (current + step)/100;
//                 }else{
//                     // 如果不成立，则使用滤镜功能！
//                     obj.style.filter ="alpha(opacity ="+(current+step) +")";
//                 }
//             }
//              // 层叠！
//              else if (attr == "zIndex") {
//                 obj.style.zIndex = json[attr];
//              }else{
//                 obj.style[attr] = current + step +'px';
//              }
//               // 截止值!
//               if (current != json[attr]) {
//                 flag = false;
//               }else{
//                 flag = true;
//               }
//         }
//         if (flag) {
//             clearInterval(obj.timer);
//             // 如果有回调就使用回调！
//             if(fn){
//                 fn();
//             }
//         };
//     }
//         , 30)
// }
// 考虑兼容性问题！
function getStyle(obj,attr){
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
//cookie设置
function setCookie(key,val,days){
    var now = new Date();
    now.setDate(now.getDate() + days);
    document.cookie = key + '='+val +';expires='+now +';path=/';
}
//cookie获取
function getCookie(key){
    // console.log(key);
    var str = document.cookie;
    // console.log(str);
    var arr = str.split('; ');
    // console.log(arr);
    for(var ele of arr){
        var arrNew = ele.split('=');
        if (key == arrNew[0]) {
            // console.log(arrNew[1]);
            return arrNew[1];
        };

    }
}
//cookie删除
function removeCookie(key){
    setCookie(key,'',-1);
}