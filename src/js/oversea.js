/**
 * Created by Administrator on 2016/12/1.
 */
$(document).ready(function() {
    $("#ego-oversea").zAccordion({
        tabWidth: "20%",
        width: "100%",
        height: 600,
        speed: 400,
        slideClass: "slider",
        trigger:'mouseover',
        startingSlide: 3,
        /*timeout: 3000*/
    });
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
        var height      = $('div.ego-oversea-accordion').height()+$('ul.ego-oversea-advantage').height()
        $this.addClass('active').siblings().removeClass('active');
        $('body,html').animate({
            scrollTop:height-80
        },300);
        $contain.find('.ego-products-info').hide();
        if($this.hasClass('service')){
            $('.ego-products-info.service').show()
        }else if($this.hasClass('price')){
            $('.ego-products-info.price').show()
        }
    })
});