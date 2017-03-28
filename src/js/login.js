/**
 * Created by Administrator on 2016/10/28.
 */

$(document).ready(function () {
    //自定义提示
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
    var validate = $("#login-form").validate({
        debug: true,//调试模式，只验证不真的提交表单
        onkeyup:false,
        submitHandler: function(form){
            alert("提交表单");
            form.submit();
        },
        rules: {
            userName:{
                required:true,
                isMobOrEmail:true
            },
            userPassword:{
                required:true
            }
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
