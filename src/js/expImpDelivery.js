/**
 * Created by Administrator on 2016/11/28.
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
    var title       = $('.ego-product-title');
    var titletop    = title.offset().top - 80;
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
        //二级导航
        if (top > titletop){
            title.addClass('fixed');
        }else if(top <= titletop){
            title.removeClass('fixed');
        }
    };
    //产品tab
    $('.ego-products-item').on('click',function () {
        var $this       = $(this);
        var $contain    = $this.parent().parent();
        $this.addClass('active').siblings().removeClass('active');
        $('body,html').animate({
            scrollTop:591
        },300);
        $contain.find('.ego-products-info').hide();
        if($this.hasClass('express')){
            $('.ego-products-info.express').show()
        }else if($this.hasClass('post')){
            $('.ego-products-info.post').show()
        }else if($this.hasClass('special-line')){
            $('.ego-products-info.special-line').show()
        }else if($this.hasClass('r-o-railway')){
            $('.ego-products-info.r-o-railway').show()
        }else if($this.hasClass('storage')){
            $('.ego-products-info.storage').show()
        }
    })
});