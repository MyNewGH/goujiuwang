/*
 * @Author: Marte
 * @Date:   2019-05-11 16:16:26
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-18 09:45:52
 */
(function() {
    $('#bar').load('bar.html', function() {
        $(window).resize(function() {
            $(".bar").css("min-height", 432).css('height', $(window).height());

        }).resize();
        var that = null;
        function commhover(type, _this) {
            if (type == 'show') {
                _this.css('background', '#c40000');
                _this.children('a').css('color', '#fff');
                _this.children().eq(0).children('i').css('color', '#fff');
            } else if (type == 'hide') {
                _this.css('background', 'none');
                setTimeout(function() {
                    _this.children().eq(1).hide();
                }, 200);
                _this.children().eq(0).css('color', '#c40000');
                _this.children().eq(0).children('i').css('color', '#c40000');
            }
        }
        $('.bar li:not(".gjwewm ,.cart")').hover(function() {
            $(this).children().eq(1).stop().animate({ 'right': 32, 'opacity': 1 }, 400).show();
            that = $(this);
            commhover('show', that);
        }, function() {
            $(this).children().eq(1).stop().animate({ 'right': 80, 'opacity': 0 }, 400);
            commhover('hide', that);
        });
        $('.bar .gjwewm').hover(function() {
            that = $(this);
            $(this).children().eq(1).stop().animate({ 'right': 205, 'opacity': 1 }, 400).show();
            commhover('show', that);
        }, function() {
            $(this).children().eq(1).stop().animate({ 'right': 280, 'opacity': 0 },400);
            commhover('hide', that);
        });
        $('.bar .cart').hover(function() {
            $(this).css('background', '#c40000');
             $(this).children('a').css('color', '#fff');
              $(this).children().eq(0).children('i').css('color', '#fff');
        }, function() {
            $(this).css('background', '#eaeaea');
             $(this).children().eq(0).css('color', '#c40000');
             $(this).children().eq(0).children('i').css('color', '#c40000');
        });
        //回到顶部
        $('#backtop').on('click', function() {
            var top = $("html").scrollTop() + $("body").scrollTop();
            var timer = setInterval(function() {
                top -= 150;
                if (top <= 0) {
                    clearInterval(timer);
                    $("html,body").scrollTop(0);
                } else {
                    $("html,body").scrollTop(top);
                }
            }, 30)
        })
        //吸顶菜单
        $(window).on('scroll',function(){
             var top = $("html").scrollTop() + $("body").scrollTop();
            if (top>1000) {
                $('#xiding').show();
            }else{
                $('#xiding').hide();
            }
        })
        $("#close").on('click',function(){
           $(this).parent().hide();
        })


         var offset = $('.cart').offset();
        // console.log(offset().top());
        var offsety = $('.cart').offset().top*1 +320;
        // $(window).scrollTop(0);
        $(window).resize(site);
        function site(){
            offset = $('.cart').offset();
        }

    });
    $('#footer').load('footer.html');

})(jQuery);