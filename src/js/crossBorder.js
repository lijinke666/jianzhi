/**
 * Created by Administrator on 2016/11/30.
 */
$(document).ready(function () {
    //smoove
    $('.move-item').smoove({
        offset: '15%'
    });
    //页面非头部刷新
    (function () {
        var top       = document.documentElement.scrollTop|| document.body.scrollTop;
        if (top > 100){
            var $header   = $('.ego-header');
            var $img      = $header.find('.ego-logo');
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }
    })();
    //页面滚动
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
    //select2
    $('.select2').select2({
        language:'zh-CN'
    });
});