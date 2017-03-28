/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
    //partner
    $('.ctrl-btn').on('click',function () {
        var $this   = $(this);
        var $first  = $('.ego-partner-box:nth-child(1)');
        var $second = $('.ego-partner-box:nth-child(2)');
        if($this.hasClass('first')){
            $second.removeClass('active');
            $first.addClass('active');
            $this.addClass('active');
            $this.siblings().removeClass('active');
        }else if($this.hasClass('second')){
            $second.addClass('active');
            $first.removeClass('active');
            $this.addClass('active');
            $this.siblings().removeClass('active');
        }
    });
    //smoove
    $('.move-item').smoove({
        offset: '15%'
    });
    //banner
    var  banner =  $('#ego-banner-panel');
    banner.carousel({
        interval:5000
    });
    //导航滚动
    window.onscroll = function () {
        var top      = document.documentElement.scrollTop|| document.body.scrollTop;
        var $header  = $('.ego-header');
        var $img      = $header.find('.ego-logo');
        if(top >= 100){
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }else if(top < 100){
            $header.removeClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/logo(white).png')
        }
    }
});