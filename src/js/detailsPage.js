/*
 * @Author: Marte
 * @Date:   2019-05-14 11:49:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 19:48:58
 */
(function() {
    var strID = decodeURI(document.location.search.slice(1));
    var timerID ='';
    var carnum =0;
    var arr=null;
    var strs = getCookie('p_id');
    var user_phone = getCookie('phone');
    var myarr = [];
    var sl =getCookie('sl');
    let obj1 = {};
    let norepeats = '';
    var val1 = '';
    let itemnumval=getCookie('itemnums');
    myarr.push(strs,strID);
    $('#top_nav').load('topNav_hide.html',
        function() {
            $('#top_nav').on('mouseover', '.list1', function(event) {
                $('.list1').children().eq(1).show();
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
    // console.log(strs.indexOf(strID));
    if (strs) {
     function charnum(proid) {
            obj1 = {}
            proid.forEach(function(item) {
                if (obj1[item]) {
                    obj1[item] = obj1[item] + 1;
                } else {
                    obj1[item] = 1;
                }
            });
            norepeats = '';
            for (var key in obj1) {
                val1 += key + ':' + obj1[key] + ',';
                norepeats += key;
            }
            return val1;
        }
        var str1 = strs.split(',');
    };

    function init() {
        $.ajax({
            url: '../api/php/detailsPage.php',
            type: 'post',
            data: {
                id: strID
            },
            success: function(str) {
                arr = JSON.parse(str);
                // console.log(arr.infos);
                create1(arr.infos);
                create2(arr.infos);
            }
        })

    }
    init();

    function create1(item1) {
        var html = $.map(item1, function(item, index) {
            return `<div class="product-show clearfix">
                <div class="showpic fl">
                    <ul class="smallpic fl">
                        <li class="list-small">
                            <img src="../images/big1.jpg" alt="">
                        </li>
                        <li class="list-small">
                            <img src="../images/big2.jpg" alt="">
                        </li>
                        <li class="list-small">
                            <img src="../images/big3.jpg" alt="">
                        </li>
                        <li class="list-small">
                            <img src="../images/big4.jpg" alt="">
                        </li>
                        <li class="list-small">
                            <img src="../images/big5.jpg" alt="">
                        </li>
                    </ul>
                    <div class="bigshowbox fl">
                        <div class="bigpic">
                            <img src="../images/big2.jpg" alt="" class="size" />
                            <img src="../images/big2.jpg" alt="" class="bigs"/>
                        </div>
                        <div style="float: right; position: relative" class="collect">
                            <a id="scyes" onclick="javascript:void()" class="scbtn">
                                <img src="../images/starempty.png">
                                &nbsp;收藏商品
                            </a>
                            <a id="scno" class="scbtn">
                                <img src="../images/starfull.png">
                                &nbsp;已收藏
                            </a>
                            <span class="scnotemsg sccg">收藏成功，<a target="_blank" href="#">去我的收藏看看 &gt;</a>
                                <div class="arrow">
                                    <em>◆</em><span>◆</span>
                                </div>
                            </span>
                            <span class="scnotemsg ysc">您已收藏，<a target="_blank" href="#">去我的收藏看看 &gt;</a>
                                <div class="arrow">
                                    <em>◆</em><span>◆</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="showInfo fl clearfix">
                    <h4 class="itemtitle">${item.title}</h4>
                    <p class="redad">登录查看专属会员价..</p>
                    <div class="pricebox mt10">
                        <div class="newPriceBox">
                            <p class="newPrice" style="margin-top: 0">
                                活动价
                                <strong><span class="rmbIcon">¥</span>
                                    <span id="spPrice" style="font-size: 24px; font-weight:700">${item.price}</span></strong>
                            </p>
                        </div>
                        <p class="sale">
                            <span>促销信息</span>
                            <span>
                                <span class="redBox">会员价</span>
                                <span class="red">登陆后查看更多优惠</span>
                                <br>
                            </span>
                        </p>
                    </div>
                    <div class="upmsg">
                        <div class="milkRun" id="milkRun">
                            <span class="mr10 fl">配 送 至:</span>
                            <div class="mr10 fl" style="position:relative;">
                                <a href="#" class="at">
                                    <label id="lbPP" style="cursor:pointer">地区∨</label>
                                </a>
                                <div class="addrArea" style="">
                                    <div id="divRegion">
                                        <div class="AstoreBox " id="Region" data-templateid="RegionList">
                                            <div class="AstoreItem">
                                                <p class="itemTitle fl"> 华北地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >北京 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >天津 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >河北省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >山西省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >内蒙古自治区 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 华东地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >上海 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >江苏省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >浙江省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >安徽省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >福建省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >山东省 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 华南地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >广东省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >广西壮族自治区 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >海南省 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 华中地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >江西省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >河南省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >湖北省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >湖南省 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 西南地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >重庆 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >四川省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >贵州省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >云南省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >西藏自治区 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 西北地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)">陕西省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)">甘肃省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)">青海省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >宁夏回族自治区 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >新疆维吾尔自治区 </a></li>
                                                </ul>
                                            </div><br>
                                            <div class="AstoreItem cf">
                                                <p class="itemTitle fl"> 东北地区： </p>
                                                <ul class="fl">
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >辽宁省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >吉林省 </a></li>
                                                    <li> &nbsp; <a class="selectpro" href="javascript:void(0)" >黑龙江省 </a></li>
                                                </ul>
                                            </div><br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="mr10" id="freightSpan">单笔订单不满100元，收取运费：20元</span>
                            <img src="../images/car.png" alt="">
                            <sapn>满百包邮</sapn>
                        </div>
                        <div class="pay">
                            <p>
                                关注度<em>&nbsp;${item.attention}</em>
                            </p>
                            <span class="line">|</span>
                            <p>
                                累计评价&nbsp;<a href="#Comment" id="AllComment" target="_self" style="color:#c40000;font-weight: 700;">${item.evaluate}</a>
                            </p>
                            <span class="line">|</span>
                            <p>
                                送积分<em style="color:green">&nbsp;${item.price}</em>
                            </p>
                        </div>
                        <div class="mt15 clearfix">
                            <div class="lttext fl">数 &nbsp;量:</div>
                            <div class="fl">
                                <input class="nums" id="txtQuantity" value="1" type="text">
                                <div class="addBtn">
                                    <span class="mb2">+</span><span class="diffN">-</span>
                                </div>
                            </div>
                        </div>
                        <div class="btnbox clearfix">
                            <a id="addCat" href="javascript:void(0)" class="addBuy btn">
                                立即购买
                            </a>
                            <a class="addToCat" href="javascript:void(0)" class="addToCart btn ">
                                <i class="iconfont mr5">&#xe64c;</i>加入购物车
                            </a>
                        </div>
                    </div>
                </div>
            </div>`
        });
        $('#myshow').html(html);
    }
     $('#myshow').on('mouseover', '.smallpic>li', function() {
        $(this).css('border-color', 'red');
        var $img = $(this).find('img').attr('src');
        console.log($img);
        $('.bigpic').children('img').attr('src',$img);
    })
      $('#myshow').on('mouseout', '.smallpic>li', function() {
        $(this).css('border-color', '#eee');
    })
    function create2(item2) {
        var html = $.map(item2, function(item, index) {
            return `<span><i></i>品牌：<em>${item.name}</em></span>
                    <span><i style="background: url(../images/number.png);"></i>商品编号：<em>6903431138981</em></span>
                    <span><i style="background: url(../images/fonticon.png) 30px 0;"></i>净含量：<em>${item.wfp}</em></span>
                    <span><i style="background: url(../images/fonticon.png) 30px 15px;"></i>度数： <em>${item.avb}</em></span>
                    <span><i style="background: url(../images/fonticon.png) 0 15px;"></i>手提袋：<em>无手提袋说明</em></span>
                    <span><i style="background: url(../images/fonticon.png) -15px -15px;"></i>香型： <em>${item.odor}</em></span>
                    <span><i style="background: url(../images/fonticon.png) 45px 0;"></i>箱规： <em>1*6</em></span>
                    <span><i style="background: url(../images/fonticon.png) 0 15px;"></i>规格： <em>单瓶</em></span>`
        });
        $('.itemsepc').html(html);
    }
    //放大镜
    $('#myshow').on('mousemove', '.bigpic', function(ev) {
        var x1 = ev.offsetX;
        var y1 = ev.offsetY;
        // console.log(x1,y1);
        var x2 = x1 / $('.bigpic img:eq(0)').width();
        var y2 = y1 / $('.bigpic img:eq(0)').height();
        var x3 = ($('.bigpic img:eq(0)').width() - $('.bigpic img:eq(1)').width()) * x2;
        var y3 = ($('.bigpic img:eq(0)').width() - $('.bigpic img:eq(1)').width()) * y2;
        $('.bigpic img:eq(0)').css('opacity', 0)
        $('.bigpic img:eq(1)').css('opacity', 1).css('top', y3).css('left', x3);
    })
    $('#myshow').on('mouseleave', '.bigpic', function(ev) {
        $('.bigpic img:eq(0)').css('opacity', 1)
        $('.bigpic img:eq(1)').css('opacity', 0).css('top', 0).css('left', 0);
    })

    //判断cookie是否有值
    if (itemnumval) {
        var cooks =itemnumval;
    }else{
        if (strs) {
         var cooks = strs.split(",").length;
        }else{
           var cooks=0;
        }
    }
    let num = 0;
    let cartnum =cooks;
    $('#myshow').on('click', 'span', function() {
        num = $('.nums').val()*1;
        if ($(this).hasClass('mb2')) {
            num++;
            $('.nums').val(num)
        }
        if ($(this).hasClass('diffN')) {
            if (num == 1) {
                alert("商品数量最少为一");
                num = 1;
            } else {
                num--;
            }
            $('.nums').val(num)
        }
    })
    //购物车的加减
    let pro_id_num=0;
    let pep = num;
    $(document).on('click', '.addToCat , .itemNum,.mb2,.diffN', function() {
        if ($(this).hasClass('addToCat')||$(this).hasClass('mb2')){
            pep++;
        }else if ($(this).hasClass('diffN')) {
            pep--;
        };
        if ($(this).hasClass('addToCat')) {
            if (num==0) {
                cartnum++;
                var pnum = cartnum;
            }
            if (num!=0) {
                console.log(num);
                // cartnum = itemnumval
                cartnum = num + cartnum;
            };
            if (strs) {
                if (strs.indexOf(strID)!=-1) {
                console.log(charnum(str1));
                    pro_id_num = obj1[strID] + cartnum - sl;
                }else{

                    pro_id_num = cartnum - sl;
                }
            }else{
                pro_id_num = cartnum;
            }

            let imgs = arr.infos[0].bigimg;
            let title = arr.infos[0].title;
            let pro_price = arr.infos[0].price;
            let prokucun = arr.infos[0].kucun;
            console.log(user_phone,strID,imgs,pro_price,pro_id_num,pro_price * pro_id_num);
            if (pep>prokucun) {
                pep = prokucun;
                let changeprice = pep * pro_price;
            };
            $.ajax({
                url: '../api/php/insertCart.php',
                type: 'post',
                data: {
                   uphone : user_phone,
                   pid:strID,
                   pimg:imgs,
                   titles:title,
                   kucuns:prokucun,
                   uprice:pro_price,
                   pnum: pro_id_num,
                   count_price : pro_price * pro_id_num,
                   addprice:changeprice,
                   peps:pep
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
        };
        $('.itemNum').html(cartnum);
        itemnumval =  $('.itemNum').text()*1;
        console.log(num,itemnumval);
        myarr.push(itemnumval);
        setCookie('car_pro',myarr,1);
        console.log(pro_id_num);
        setCookie('itemnums',itemnumval,1);
    })
    let flag = true;
    $('#myshow').on('click', '#lbPP', function() {
        if (flag) {
            $('#divRegion').show();
        }else{
            $('#divRegion').hide();
        }
        flag = !flag;


    })
     $('#myshow ').on('click', 'a:not(".at ,#addToCat")', function() {
        if (arr.infos[0].status==1) {
            var val = $(this).text()+'（有货）';
            $('#lbPP').html(val)
        }else{
            var val = $(this).text()+'（无货）';
        }

    })

})(jQuery);