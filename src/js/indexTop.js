/**
 * Created by Administrator on 2016/12/2.
 */
$(document).ready(function () {
    $('.ego-back-top').on('click',function () {
        var speed=600;
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });
    //监控滚动条
    var $win  =  $(window);
    var $btt  =  $('.ego-back-top')
    $win.scroll(function () {
        if ($win.scrollTop() >= 640) {
            $btt.css({
                transform:'scale(1)'
            });
        }else{
            $btt.css({
                transform:'scale(0)'
            });
        }
    });
});