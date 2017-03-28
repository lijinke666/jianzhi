/**
 * Created by Administrator on 2016/12/5.
 */
$(document).ready(function () {
    $('.move-item').smoove({
        offset: '15%'
    });
    //非顶部刷新
    (function () {
        var top       = document.documentElement.scrollTop|| document.body.scrollTop;
        if (top > 100){
            var $header   = $('.ego-header');
            var $img      = $header.find('.ego-logo');
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }
    })();
    //滚动
    window.onscroll = function () {
        var top       = document.documentElement.scrollTop|| document.body.scrollTop;
        var $header   = $('.ego-header');
        var $img      = $header.find('.ego-logo');
        if(top >= 100){
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }else if(top < 100){
            $header.removeClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/logo(white).png')
        }
    };
    //折叠面板控制
    $('.ego-collapse-title').on('click',function () {
        var $contain = $(this).parent();
        var height1   = $contain.find('div.ego-collapse-content:eq(0)').outerHeight();
        var height2   = $contain.find('div.ego-collapse-content:eq(1)').outerHeight();
        var height    = height1+height2+125;
        if(!$contain.hasClass('open')){
            $contain.addClass('open').css({
                height:height+'px'
            });
            $contain.siblings().removeClass('open').css({
                height:'60px'
            })
        }else if($contain.hasClass('open')){
            $contain.removeClass('open').css({
                height:'60px'
            });
        }
    });
    $('.ego-collapse:eq(0)').find('.ego-collapse-title').trigger('click');
});
