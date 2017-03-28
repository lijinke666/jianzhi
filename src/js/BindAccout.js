/*tab切换*/
$(document).ready(function () {
   $('.bind-item').on('click',function () {
       var $this = $(this);
       var bind  = $('.bind-account.bind');
       var reg   = $('.bind-account.reg');
       if(!$this.hasClass('bind-item-active')){
           $this.addClass('bind-item-active').siblings().removeClass('bind-item-active');
           if($this.hasClass('go-bind')){
               reg.find('input').val('').removeClass('valid error').next().remove();
               reg.hide();
               bind.show();
           }else if($this.hasClass('go-reg')){
               bind.find('input').val('').removeClass('valid error').next().remove();
               bind.hide();
               reg.show();
           }
       }
   })
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
//手机或邮箱的验证规则
jQuery.validator.addMethod("isMobOrEmail", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return this.optional(element) || ((length == 11 && mobile.test(value)) || email.test(value));
}, "请填写正确的手机号码/邮箱");
//用户名验证
jQuery.validator.addMethod("isUsername", function(value, element){
    var usrname  = /^[a-zA-Z\u4e00-\u9fa5]{1}[a-zA-Z0-9_\u4e00-\u9fa5]{3,9}$/;
    return this.optional(element) || ( usrname.test(value))
},"3-15位,不能包含特殊字符,不能数字开头");
//创建validator验证对象
$(document).ready(function () {
    /*绑定验证*/
    var bindValidator = $("#bindAccount").validate({
        debug: true,//调试模式，只验证不真的提交表单
        onkeyup:false,
        submitHandler: function(form){
            alert("提交表单");
            form.submit();
        },
        rules: {
            userAccount:{
                required:true,
                isMobile:true
            },
            userName:{
                required:true,
                min:[6]
            }
        },
        errorPlacement: function(error, element) { //错误信息位置设置方法
            error.appendTo(element.parent());
            $(element).on('focus',function () {
                $(this).removeClass('error').next().hide()
            })
        },
        errorClass: "error",//默认为错误的样式类为：error
    });
    /*注册验证*/
    var regValidator = $("#regAndBind").validate({
        debug: true,//调试模式，只验证不真的提交表单
        onkeyup:false,
        submitHandler: function(form){
            alert("提交表单");
            form.submit();
        },
        rules: {
            userPhone:{
                required:true,
                isMobOrEmail:true
            },
            userName:{
                required:true,
                isUsername:[6]
            },
            userRegPass:{
                required:true,
                rangelength:[6,18]
            },
            userRegPassConfirm:{
                required:true,
                equalTo:"#userRegPass"
            },
            img_code:{
                required:true,
                maxlength:[4]
            },
            verify_code:{
                required:true,
                maxlength:[4]
            }
        },
        errorPlacement: function(error, element) { //错误信息位置设置方法
            error.appendTo(element.parent());
            $(element).on('focus',function () {
                $(this).removeClass('error').next().hide()
            })
        },
        errorClass: "error",//默认为错误的样式类为：error
    });
});

