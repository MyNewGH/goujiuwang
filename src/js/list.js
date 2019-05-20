/*
 * @Author: Marte
 * @Date:   2019-05-13 20:01:01
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 19:33:29
 */

(function() {
    var sl =getCookie('sl');
    let itemnumval=getCookie('itemnums');
    $('#top_nav').load('topNav_hide.html',
        function() {
            $('#top_nav').on('mouseover', '.list1', function(event) {
                $('.list1').children().eq(1).show();
                $('#list1_nav>li').hover(function() {
                    var index = $(this).index();
                    var lih = $(this).height();
                    $(this).children().eq(2).css('top', -index * lih);
                    $(this).children().eq(2).show();

                }, function() {
                    $(this).children().eq(2).hide();
                });
            });
            $('#top_nav').on('mouseout', '.list1', function(event) {
                $('.list1').children().eq(1).hide();
            });
            if (itemnumval) {
                $('.itemNum').html(itemnumval);
            }else{
                $('.itemNum').html(sl);
            }
        });
    //获取当前商品类型名称
    var strs = decodeURI(document.location.search.slice(1));
    $('.brother').nextAll('li').hide();
    //品牌展开和收回
    var flag = true;
    $('#takeback').on('click', function() {
        if (flag) {
            $('.brother').nextAll('li').show();
            $('#takeback').html('收回∧');
        } else {
            $('#takeback').html('展开ν');
            $('.brother').nextAll('li').hide();
        }
        flag = !flag;
    })
    // 变色

    // 商品渲染
    var $pro_list = $('#product-list'),
        $seach_has = $('.search-has');
    let sum, pages, number, pageNow = 0;
    let res = '';
    let urls = '../api/php/product.php';
    var checkput = strs;
    var html = null;
    function init(type, search, pageNows, checkput) {
        // console.log(type, pageNows, checkput);
        html = new Promise(function(resolve) {
            $.ajax({
                url: urls,
                type: 'post',
                data: {
                    types: type,
                    searchname: search,
                    checks: checkput,
                    page: pageNows,
                    num: 12
                },
                success: function(str) {

                    resolve(str);
                }
            })
        })
    }
    function init1(orderType, searchName,pageNums) {
        // console.log(type, pageNows, checkput);
        html = new Promise(function(resolve) {
            $.ajax({
                url: '../api/php/productOrder.php',
                type: 'post',
                data: {
                    ordertype: orderType,
                    searchname: searchName,
                    // ordername: orderName,
                    page: pageNums,
                    num: 12
                },
                success: function(str) {
                    resolve(str);
                }
            })
        })
    }
    init("ptype", 'product_type', pageNow, checkput);
    html.then(function(data) {
        var val = JSON.parse(data);
        sum = val.count;
        mypage(`ptype`, 'product_type', sum, checkput);
        create(val.productList);
    })
    function create(items) {
        var lists = items.map(function(item) {
            return ` <li class="proitem" data-id="${item.id}">
                            <div class="itembox">
                                <a href="#">
                                    <div class="boximg">
                                        <img src="../images/${item.bigimg}" alt="">
                                    </div>
                                    <span class="itemname">
                                    ${item.title}
                                     <em>${item.name}</em></span>

                                    <span class="member">
                                        <em>会</em>
                                        登录查看专属会员价
                                    </span>
                                    <span class="itemprice fl">
                                        <em>￥</em><span>${item.price}</span>

                                    </span>
                                </a>
                                <a href="javascript:void(0)" class="addshopcar   fl" >加入购物车 </a>
                                <div class="clearfix">
                                </div>
                                <span class="appraise">${item.evaluate}人评价</span>
                            </div>
                        </li>`;
        }).join('');
        $pro_list.html(lists);
    }

    function theninit(mytyoes, mysearch,orders) {
        html.then(function(data) {
            var val = JSON.parse(data);
            if (orders) {
                sumss = val.count;
                console.log(sumss);
                create(val.orderList);
                mypage(orders, mysearch, sumss, '');
            }else{
                sums = val.othercount;
                console.log(sums);
                create(val.othertList);
                mypage(mytyoes, mysearch, sums, txt);
            }
        })
    }
    var txt;
    var pagenums = 0;
    var arrs =['白酒'];
    $('#winwtype ul:not("#more")>li').on('click', function() {
        txt = $(this).text();
        var ids = $(this).parent().parent().attr("data-id");
        arrs.push(txt);
        $("#xeq em").html(txt).attr('data-ids',ids);
        var select = $("#xeq").html();
        $(".condition").append(select);
        $(this).parent().parent().hide();
        if (ids == 01) {
            init('ntype', 'name', pagenums, txt);
            theninit('ntype', 'name');
        } else if (ids == 02) {
            init('palcetype', 'place', pagenums, txt);
            theninit('palcetype', 'place');
        }else if (ids==03) {
            init('odortype', 'odor', pagenums, txt);
            theninit('odortype', 'odor');
        }else if (ids == 04) {
            init('avbtype', 'avb', pagenums, txt);
            theninit('avbtype', 'avb');
        }else if (ids==05) {
            init('wfptype', 'wfp', pagenums, txt);
            theninit('wfptype', 'wfp');
        }else if (ids == 06) {
            init('price_fwtype', 'price_fw', pagenums, txt);
            theninit('price_fwtype', 'price_fw');
        }
    })

    $('.condition').on('click', 'span', function() {
        $(this).parent().remove();
        var len =$('.condition').find('a').size();
        if ($(this).prev().text() == strs) {
            window.location.href = "../html/main.html";
        }
        //关掉标签显示盒子
        let myids = $(this).prev().attr("data-ids")
            switch (myids)
            {
                case '01':
                console.log("123");
                $('#winwtype .search-rqpp').show();
                break;

                case '02':
                $('#winwtype .search-cd').show();
                break;

                case '03':
                $('#winwtype .search-cd').show();
                break;

                case '04':
                $('#winwtype .li').show();
                break;

                case '05':
                $('#winwtype .l2').show();
                break;

                case '06':
                $('#winwtype .l3').show();
                break;
            }
        if (len==2) {
            window.location.href="../html/whiteWine-list.html?"+strs;
        }
    })
    //分页
                // mypage(orders, mysearch, sumss, '');

    function mypage(types, searchtype, sum, vals) {
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'pagenumbox',
                count: sum, //数据总数，从服务端得到
                limit: 12,
                groups: 4,
                theme: '#c00',
                jump: function(obj, first) { //obj包含了当前分页的所有参数，比如：
                    pages = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                    number = obj.limit; //得到每页显示的条数
                    //首次不执行
                    if (!first) {
                        //do something
                        pageNow = (pages - 1) * number;
                        pagenums = (pages - 1) * number;
                        // console.log(sum);
                        if (vals) {
                            init(types, searchtype, pageNow, vals);
                            // console.log(types,pageNow,vals);
                            html.then(function(data) {
                                var val = JSON.parse(data);
                                create(val.productList);
                            })
                        }else{
                            // console.log(123);
                            init1(types, searchtype, pageNow);
                            // console.log(types,pageNow,vals);
                            html.then(function(data) {
                                console.log(data);
                                var val = JSON.parse(data);
                                console.log(val.productList);
                                create(val.productList);
                            })
                        }
                    }

                }
            });
        });
    }
    // 飞入购物车
        var cookies = []
        var offset = $('.cart').offset();
        // console.log($('.cart').position().top);
        // var offsety = $('.cart').position().top*1 +320;
        // $(window).scrollTop(0);
        $(window).resize(site);
        function site(){
            offset = $('.cart').offset();
        }
         var scrollTop =0;
        $(window).scroll(function(event) {
           scrollTop = $(window).scrollTop();
        });
        let carnum =0;
        let numss = 0;
        $(document).on('click','.addshopcar,.itemNum ',function(){
            carnum++;
            var addcar = $(this);
            img = addcar.parent().find('img').attr("src");
            var flay = $('<img src="'+img+'" alt="" class="fly">');
            // console.log(scrollTop);
            // console.log(offset);
            flay.fly({
                start:{
                    left:event.pageX,
                    top:event.pageY-scrollTop
                },
                end:{
                    left:offset.left,
                    top:360,
                    width:0,
                    height:0
                }
            })
            $('.itemNum').html(carnum);
            let s = $(this).parent().parent().attr("data-id");
            cookies.push(s);
            // let phones = getCookie('phone');
            setCookie('p_id',cookies,1);
            setCookie('sl',carnum,1);
            let user_phone = getCookie('phone');
            if (user_phone) {
                let proID = 0;
                if ($(this).hasClass('addshopcar')) {
                    numss++;
                    console.log(numss);
                    // if (proID) {};
                    // numss++;
                    proID =  $(this).parent().parent().data('id');
                    $.ajax({
                        url: '../api/php/cart.php',
                        type: 'post',
                        data: {Allid: proID,
                                type: 'danid'},
                        success :function(str){
                          var everypro = $.parseJSON(str);
                          if (proID!=everypro.ordertList[0].id) {
                            numss=1;
                          };
                            let imgs = everypro.ordertList[0].bigimg;
                            let title = everypro.ordertList[0].title;
                            let prokucun = everypro.ordertList[0].kucun;
                            let pro_price = everypro.ordertList[0].price;
                            let pro_id_num = numss;
                                $.ajax({
                                url: '../api/php/insertCart.php',
                                type: 'post',
                                data: {
                                   uphone : user_phone,
                                   pid:proID,
                                   pimg:imgs,
                                   titles:title,
                                   kucuns:prokucun,
                                   uprice:pro_price,
                                   pnum: pro_id_num,
                                   count_price : pro_price * pro_id_num
                               },
                               success : function(str){
                                    if (str=='yes') {
                                        timerID = setTimeout(function() {
                                            $('.tips').show();
                                        }, 1000);
                                        // removeCookie('oldnum');
                                    }
                               }
                            })

                        }
                    })

                };
            };
        })
         $('#product-list').on('click','img',function(){
            window.open('../html/detailsPage.html?' + $(this).parent().parent().parent().parent().attr("data-id"));
        })
        //商品排序
        $('#orderList>li').on('click',function(){
            let orderIds = $(this).attr("data-order");
             if (orderIds == 002) {
                init1("DESC", 'xiaoliang',pageNow);
                theninit('', 'xiaogliang',"DESC");
            }else if (orderIds==003) {

            }else if (orderIds == 004) {

            }
        })
        // 点击跳转详情页

})(jQuery);