/*
* @Author: Marte
* @Date:   2019-05-15 19:07:38
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-19 13:24:49
*/
 (function() {
        //登录获取用户账号并显示
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
        //三级菜单
        $('#list1_nav>li').hover(function() {
                var index = $(this).index();
                var lih = $(this).height();
                $(this).children().eq(2).css('top', -index * lih);
                $(this).children().eq(2).show();
            }, function() {
                $(this).children().eq(2).hide();
        });
        //点击跳转获取商品名
        $('#baijiu').on('click',function(){
            var goods = $('#baijiu').attr('title');
            console.log(goods);
            window.location.href="../html/whiteWine-list.html?"+ goods;
        })
        let itemnumval=getCookie('itemnums');
         $('.itemNum').html(itemnumval);
})(jQuery);