/*
 * @Author: Marte
 * @Date:   2019-05-18 17:54:46
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 15:23:00
 */
(function() {
    let p_tel = getCookie('phone');
    let proids = getCookie('p_id');
    let pro = '';
    var b ='';
    if (proids) {
        pro = getCookie('car_pro');
        let proid = proids.split(',');
        function quchong(arr) {
            var len = arr.length;
            // arr.sort();
            for (var i = len - 1; i > 0; i--) {
                if (arr[i] == arr[i - 1]) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }
     b = quchong(proid).toString();
        let obj = {};;
        let norepeat = '';
        var val = '';
        //统计加入次数
        function charnum(proid) {
            obj = {}
            proid.forEach(function(item) {
                if (obj[item]) {
                    obj[item] = obj[item] + 1;
                } else {
                    obj[item] = 1;
                }
            });
            norepeat = '';
            for (var key in obj) {
                val += key + ':' + obj[key] + ',';
                norepeat += key;
            }
            return val.slice(0, -1);
        }
        var str = charnum(proid);
        console.log(str);
    }else{
        if (getCookie('car_pro')) {
            pro = getCookie('car_pro').slice(1,2)
             b=pro;
        };
    }

        //统计加入的id有哪些
        // console.log(b);
    function removeByValue(ar, val) {
        console.log(ar);
        var  arr= ar.split(',')
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr.join(",");
    }
        var $phone = getCookie('phone');
        if ($phone && $phone!=undefined) {
            $('#nologin').hide();
            $('#haslogin').show();
            $('#tels').html($phone);
            $('#out').on('click',function(){
                removeCookie('phone');
                setInterval(function(){
                 $('#nologin').show();
                 $('#haslogin').hide();
                },500)
            })
        }else{
            $('#nologin').show();
            $('#haslogin').hide();
        }
    // var sd = '1,5,8';
    // var ssss = removeByValue(sd,8)
    function init(types,can2) {
        $.ajax({
            url: '../api/php/cart.php',
            type: 'post',
            data: {
                Allid: can2,
                type : types
            },
            success: function(str) {
                var arr = $.parseJSON(str);
                create(arr.ordertList);
            }
        })
    }
    if (p_tel) {
        init('tel',p_tel);
    }else{
        init('cookies',b);
    }
    console.log(p_tel);
    function create(arrs) {
        var html = $.map(arrs, function(item, index) {
            return `<div class="goods" data-id=${item.ids}>
                            <ul>
                                <li>
                                    <div class="son_checkbox">
                                        <input type="checkbox" name="" value="">
                                    </div>
                                </li>
                                <li>
                                    <a href="#" title="">
                                        <img src="../images/${item.bigimg}" alt="">
                                    </a>
                                </li>
                                <li>
                                    <a href="#" style="color:#06c;">${item.title}</a>
                                </li>
                                <li>
                                    ${item.price}
                                </li>
                                <li >-</li>
                                <li>
                                    <div id="num">
                                        <span class="cutnum">-</span>
                                        <input type="text" name="" value="${item.pro_nums}" placeholder="" data-num="${item.kucun}" class="myval">
                                        <span class="addnum">+</span>
                                    </div>
                                </li>
                                <li class="sums" >￥${item.sum_price}</li>
                                <li>
                                    <span>
                                        <a href="">收藏</a>
                                    </span>
                                    &emsp;
                                    <span>
                                        <a href="javascript:;" class="delline">删除</a>
                                    </span>
                                </li>
                            </ul>
                        </div>`;

        });
        $('#orders').html(html);
    }

    function setCart(updatenum,updatecount,coms,orderid,user){
        $.ajax({
            url: '../api/php/setCart.php',
            type: 'get',
            data: {
                num: updatenum,
                prices: updatecount,
                com:coms,
                oid:orderid,
                u_phone:user
            },
            success:function(str){
                var arr = $.parseJSON(str);
                console.log(arr);
                // create(arr.ordertList);
            }
        })

    }

    // 购物车操作
    $('#orders').on('click', '.addnum', function() {
        let number = $(this).prev().val();
        let repertory = $(this).prev().data('num'); //上限
        let parentid = $(this).parent().parent().parent().parent().data('id')
        number++;
        if (number > repertory) {
            number = repertory;
            alert("当前数量已经达到库存量了");
        };
        $(this).prev().val(number);
        let count_p = countPrice($(this));
        countPrice($(this));
        console.log(count_p);
        setCart(number,count_p,1,parentid,p_tel);
    })
    // if (p_tel) {
    //      $('#orders').find('li').size();
    //      console.log($('#orders').find('li').size());
    // };
    $('#orders').on('click', '.cutnum', function() {
        let number = $(this).next().val();
        let parentid = $(this).parent().parent().parent().parent().data('id')
        number--;
        if (number < 1) {
            number = 1;
            alert("当前数量不能再减了");
        }
        $(this).next().val(number);
        let count_p = countPrice($(this));
        countPrice($(this));
        setCart(number,count_p,1,parentid,p_tel);
    });
    // 修改文本框数量
    $('#orders').on('input', '.myval', function() {
        let number = $(this).val();
        let repertory = $(this).data('num'); //上限
        let parentid = $(this).parent().parent().parent().parent().data('id')
        if (number < 1) {
            number = 1;
        } else if (number >= repertory) {
            number = repertory;
        }
        $(this).val(number);
        let count_p = countPrice($(this));
        countPrice($(this));
        setCart(number,count_p,1,parentid,p_tel);
    })
    //计算总价
    function countPrice(now) {
        let number = $(now).parent().find('.myval').val(); //数量
        let price = $(now).parent().parent().prev().prev().text().slice(2);
        console.log(number, price);
        let sumprice = (number * price);
        // console.log(sumprice);
        $(now).parent().parent().next().html('￥' + sumprice);
        all();
        return sumprice;
    }
    // 删除当前行
    $('#orders').on('click', '.delline', function() {
        let sure = confirm('你确定要删除');
        let ids = $(this).parent().parent().parent().parent().data('id');
        if (b) {
         var newstr = removeByValue(b,ids);
            b= quchong(newstr);
         };
        // console.log(newstr);
        if (sure) {
            setCart('','',2,ids,p_tel);
            $(this).parent().parent().parent().parent().remove();
        };
    });
    //全选
    $('.all').on('click', function() {
        let ischeck = $(this).prop('checked');
        $('.son_checkbox input').prop('checked', ischeck);
        all();
    })
    var priceArr = [];

    function all() {
        $('.son_checkbox input').each(function(index, el) {
            if ($(el).prop('checked')) {
                priceArr.push(index);
            };
        });
        let number = 0;
        let price = 0;
        priceArr.forEach(function(item) {
            number += $('.myval').eq(item).val() * 1;
            price += $('.sums').eq(item).text().slice(1) * 1;
            console.log(price);
        })
        // console.log(price);
        $('#zjg').html('￥' + price);
        priceArr = [];
    }
    //控制全选
    $('#orders').on('click', '.son_checkbox input', function() {
        let lens = $('.son_checkbox input:checked').size();
        let total = $('.son_checkbox input').size();
        if (lens == total) {
            $('.all').prop('checked', true);
        } else {
            $('.all').prop('checked', false);
        }
        all();
    });
    //清空购物车
    $('.del').on('click', function() {
        var newarr = [];
        $('.son_checkbox input').each(function(index, el) {
            if ($(el).prop('checked')) {
                newarr.push(index);
            };
        });
        var res = confirm('您确定清空购物车吗？');
        removeCookie('car_pro');
        removeCookie('p_id');
        if (res) {
            for (var i = newarr.length - 1; i >= 0; i--) {
                setCart('','',3,'',p_tel);
                $('#orders').eq(newarr[i]).remove();
            };
            all();
        }
    })
})(jQuery)