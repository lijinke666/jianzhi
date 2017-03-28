/**
 * Created by Administrator on 2016/10/27.
 */
/**
 * option      登录方式
 * user_login  登录名（邮箱，手机）
 * user_pass   登录密码
 * user_name   用户名
 * img_code    图形验证码
 * verify_code 短信 或 邮箱验证码
 * */
var option = 'mobile';
//邮箱登录模板
var optionEmail = '<tr class='+"option-email"+'>'+
    '<td class='+"reg-form-left"+'><label for='+"user_login_email"+'>电子邮箱：</label></td>'+
    '<td class='+"reg-form-right" +' colspan='+"2"+'><input type='+"text"+' placeholder='+" 请输入电子邮箱"+' id='+"user_login_mail"+' name='+"user_login_email"+'></td>'+
    '</tr>';
//手机登录模板
var optionPhone = '<tr class='+"option-phone"+'>'+
    '<td class='+"reg-form-left"+'><label for='+"user_login_phone"+'>手机号码：</label></td>'+
    '<td class='+"reg-form-right"+' colspan='+"2"+'><input type='+"text"+' placeholder='+" 请输入手机号码"+' id='+"user_login_phone"+' name='+"user_login_phone"+'></td>'+
    '</tr>';


$(document).ready(function () {
    var user_login = $('#user_login_phone');
    //切换登录方式
    $('.reg-way').on('click',function () {
        var _this = $(this);
        var label = user_login.parent().prev().find('label')[0];
        option = _this.attr('id');
        //更改提示文字,登录方式
        if( option == 'mobile' && $('.option-phone').length == 0){
            $('.option-email').replaceWith(optionPhone);
            user_login = $('#user_login_phone');
        }else if( option =='email' && $('.option-email').length == 0){
            $('.option-phone').replaceWith(optionEmail);
            user_login = $('#user_login_email');
        }
        //更改选中样式
        _this.addClass('reg-way-active');
        _this.siblings().removeClass('reg-way-active');
    });

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

    //扩展手机验证方法
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");

    //扩展用户名验证方法
    jQuery.validator.addMethod("isUsername", function(value, element){
        var usrname  = /^[a-zA-Z\u4e00-\u9fa5]{1}[a-zA-Z0-9_\u4e00-\u9fa5]{3,9}$/;
        return this.optional(element) || ( usrname.test(value))
    },"3-15位,不能包含特殊字符");

    //创建validator验证对象
    var validate = $("#reg-form").validate({
        debug: true,//调试模式，只验证不真的提交表单
        onkeyup:false,
        submitHandler: function(form){
            alert("提交表单");
            form.submit();
        },
        rules: {
            user_login_phone:{
                required:true,
                isMobile:true
            },
            user_name:{
                required:true,
                isUsername:true
            },
            user_login_email:{
                required:true,
                email:true
            },
            user_pass:{
                required:true,
                rangelength:[6,18]
            },
            user_pass_confirm:{
                required:true,
                equalTo:"#user_pass"
            },
            img_code:{
                required:true,
            },
            verify_code:{
                required:true
            }
        },
        success:function () {
            
        },
        errorPlacement: function(error, element) { //错误信息位置设置方法
            error.appendTo(element.parent());
           $(element).on('focus',function () {
               $(this).next().hide()
           })
        },
        errorClass: "error",//默认为错误的样式类为：error
    });


});

/**
 * @param string   msg      提示信息
 * @param number   type     提示类型 1：成功 2：失败 3：警告
 * @param function onRemove 消失后回调
 * @param number   time     消失时间
 * */
window.addPopUp = function(msg,type,onRemove,time) {
    if(msg === undefined){
        msg = "登录成功";
    }
    if(type === undefined){
        type = 1;
    }
    if(onRemove === undefined){
        onRemove = null;
    }
    if(time === undefined){
        time = 2000;
    }
    var $popup = $('<div class='+"popUpBg"+'><div class='+"popUpBox"+'>' +
        '<i class='+"fa fa-check"+' aria-hidden='+"true"+'></i>'+
        '<p>'+msg+'</p>'+
        '</div>' +
        '</div>');
    var windowWidth = $(window).width();
    var windowheight = $(window).height();
    if(type == 1){
        $popup.find('.popUpBox').find('i').addClass('fa fa-check') ;
    }else if(type == 2){
        $popup.find('.popUpBox').find('i').addClass('fa fa-times') ;
        $popup.find('.popUpBox').find('i').css({
            color:"red"
        });
    }else if(type == 3){
        $popup.find('.popUpBox').find('i').addClass('fa fa-exclamation') ;
        $popup.find('.popUpBox').find('i').css({
            color:"yellow"
        });
    }
    $popup.width(windowWidth).height(windowheight);
    $popup.appendTo($('body'));
    setTimeout(function () {
        $popup.remove();
        setTimeout(function () {
            if( typeof onRemove == 'function' ){
                onRemove();
            }
        },50);
    },time);
};
