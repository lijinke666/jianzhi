/**
 * Created by Administrator on 2016/10/25.
 */
// require('../css/index.css');

$(document).ready(function () {
    $('.carousel').carousel();
    //回到顶部
    $('.ego-sidebar-btt').on('click',function () {
        var speed=600;
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });
    //监控滚动条
    var $win  =  $(window);
    var $btt  =  $('.ego-sidebar-btt')
    $win.scroll(function () {
        if ($win.scrollTop() >= 640) {
            $btt.fadeIn();
        }else{
            $btt.fadeOut();
        }
    });
    //底部合作伙伴轮播
    var $list  = $('.ego-partner-list'),
        $left  = $('.epb-left'),
        $right = $('.epb-right');
    $left.on('click',function () {
        var left = parseInt($list.css('marginLeft'));
        if( left == -1140 ){
            $list.css({
                marginLeft:(left+1140)+'px',
                transition:'all 200ms linear'
            });
        }else if (left == 0){
            $list.css({
                marginLeft:(left-1140)+'px',
                transition:'all 200ms linear'
            });
        }
    });
    $right.on('click',function () {
        var left = parseInt($list.css('marginLeft'));
        if( left == 0){
            $list.css({
                marginLeft:(left-1140)+'px',
                transition:'all 200ms linear'
            });
        }else if (left == -1140){
            $list.css({
                marginLeft:(left+1140)+'px',
                transition:'all 200ms linear'
            });
        }
    });

    //验证
    //自定义提示文字
    (function( factory ) {
        if ( typeof define === "function" && define.amd ) {
            define( ["jquery", "../jquery.validate"], factory );
        } else {
            factory( jQuery );
        }
    }(function( $ ) {
        $.extend($.validator.messages, {
            required: "这是必填字段",
            remote: "请修正此字段",
            email: "请输入有效的电子邮件地址",
            url: "请输入有效的网址",
            date: "请输入有效的日期",
            dateISO: "请输入有效的日期 (YYYY-MM-DD)",
            number: "请输入有效的数字",
            digits: "只能输入数字",
            creditcard: "请输入有效的信用卡号码",
            equalTo: "两次输入的密码不同",
            extension: "请输入有效的后缀",
            maxlength: $.validator.format("最多可以输入 {0} 个字符"),
            minlength: $.validator.format("最少要输入 {0} 个字符"),
            rangelength: $.validator.format("长度在 {0} 到 {1} 之间"),
            range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
            max: $.validator.format("请输入不大于 {0} 的数值"),
            min: $.validator.format("请输入不小于 {0} 的数值")
        });
    }));

    //手机或邮箱的验证规则
    jQuery.validator.addMethod("isMobOrEmail", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return this.optional(element) || ((length == 11 && mobile.test(value)) || email.test(value));
    }, "请填写正确的手机号码/邮箱");

    //创建validator验证对象
    var validate = $("#index_login").validate({
        debug: true,//调试模式，只验证不真的提交表单
        onkeyup:false,
        submitHandler: function(form){
            alert("提交表单");
            form.submit();
        },
        rules: {
            user_login:{
                required:true,
                isMobOrEmail:true
            },
            user_password:{
                required:true,
            }
        },
        errorPlacement: function(error, element) { //错误信息位置设置方法
            error.appendTo(element.parent());
            $(element).on('focus',function () {
                $(this).next().hide()
            })
        },
        errorClass: "error"//默认为错误的样式类为：error
    });
});