/*
 * @Author: Marte
 * @Date:   2019-05-11 16:16:26
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 19:49:49
 */
(function() {
    //加载头部
    $('#top_nav').load('topNav_show.html',function(){
        $('#top_nav').on('keydown','input',function(){
           var keyword= $(this).val();
           let count = 0;
           if (keyword!='') {
            $(this).parent().next().children('ul').show();
            let len = $(this).parent().next().children('ul').children('li').length;
            var txt = $(this).parent().next().children('ul').children('li').children('span').eq(0).text();
                for (var i = 0; i < len; i++) {
                    console.log(txt.substr(0,keyword.length),keyword);
                    if (keyword ==txt.substr(0,keyword.length) ) {
                        $(this).parent().next().children('ul').children('li').siblings().hide();
                        console.log($(this).parent().next().children('ul').children('li').siblings());
                    };
                };
            }else{
                $(this).parent().next().children('ul').hide();
            }
        })
         $('#top_nav').on('blur','input',function(){
            $(this).parent().next().children('ul').hide();
        })
    });
    //懒加载
    ljz();
    var times = null;
    $(window).on('scroll',function(){
        if (times) {
            clearTimeout(clock);
        };
        clock = setTimeout(function(){
            ljz();
        }, 2000)
    })
    function ljz(){
        $('#wine img').each(function() {
            if (checkshow($(this))&& !isloadImg($(this))) {
                    loadImg($(this));
            };
        });
    }
    function checkshow($img){
        var scrolltop = $(window).scrollTop();
        var wh =$(window).height();
        var top = $img.offset().top;
        // console.log(top);
        if (top<(scrolltop+wh)&& top>scrolltop) {
            return true;
        };
        return false;
    }
    function isloadImg($img){
        //相等说明已加载过
        return $img.attr('data-src')=== $img.attr('src');
    }
    function loadImg($img){
        //把data-src的路劲赋给src
        $img.attr('src',$img.attr('data-src'));
    }
    //首页动画
    $('.up ul>li,.up .upa, .bigbox ul>li,.hot_wine ul>li').on('mouseover',function(){
        $(this).css({boxShadow:"0 8px 8px #ddd"}).stop().animate({'top': -8}, 300);
    })
    $('.up ul>li ,.up .upa, .bigbox ul>li,.hot_wine ul>li').on('mouseout',function(){
        console.log($(this));
        $(this).css({boxShadow:"none"}).stop().animate({'top': 0}, 300);
    })

})(jQuery);