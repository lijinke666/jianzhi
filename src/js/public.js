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
    var $popup = $('<div class='+"popUpBg"+'>' +
        '<div class='+"popUpBox"+'>' +
        '<div class='+"popUpTitle"+'>'+
        '<i aria-hidden='+"true"+'></i>'+
        '<p>温馨提示</p>'+
        '</div>'+
        '<p>'+msg+'</p>'+
        '</div>' +
        '</div>');
    if(type == 1){
        $popup.find('.popUpTitle').find('i').addClass('fa fa-check') ;
        $popup.find('.popUpTitle').css({
            backgroundColor:"#4cae4c"
        });
    }else if(type == 2){
        $popup.find('.popUpTitle').find('i').addClass('fa fa-times') ;
        $popup.find('.popUpTitle').css({
            backgroundColor:"red"
        });
    }else if(type == 3){
        $popup.find('.popUpTitle').find('i').addClass('fa fa-exclamation') ;
        $popup.find('.popUpTitle').css({
            backgroundColor:"#ff9934"
        });
    }
    $('body').css({
        overflow:'hidden'
    });
    var windowWidth = $(window).width();
    var windowheight = $(window).height();
    $popup.width(windowWidth).height(windowheight);
    $popup.appendTo($('body'));
    $popup.find('.popUpBox').animate({
        top:'50%',
        opacity:'1'
    });
    setTimeout(function () {
        $popup.remove();
        $('body').css({
            overflow:'visible'
        });
        setTimeout(function () {
            if( typeof onRemove == 'function' ){
                onRemove();
            }
        },50);
    },time);
};
/**
 * 添加加载动画 addLoading()   
 * @param string   msg              提示信息
 * @param string   mianColor        主色号(1/4的颜色)
 * @param string   secondaryColor   次色号(3/4的颜色)
 * */
window.addLoading = function (msg,mianColor,secondaryColor) {
    var loadmsg     = msg ? msg : '努力加载中';
    var loadcolor   = mianColor ? mianColor :'#ffffff';
    var secondcolor = secondaryColor ? secondaryColor : 'rgba(255, 255, 255, 0.2)';
    var $load = $('<div class="load-container load8">' +
                '<div class="loader">' +
                'Loading...'+
                '</div>'+
                '<p>'+loadmsg+'</p>' +
                '</div>');
    var $win = $(window);
    var windowWidth = $win.width();
    var windowheight = $win.height();
    $load.width(windowWidth).height(windowheight);
    $load.find(".loader").css({
        borderTop: '1.1em solid '+secondcolor,
        borderRight: '1.1em solid '+secondcolor,
        borderBottom: '1.1em solid '+secondcolor,
        borderLeft: '1.1em solid '+loadcolor
    });
    $load.find('p').css({
        color:loadcolor
    });
    $load.appendTo($('body'));
};
//移除加载动画
window.removeLoading = function() {
    $('.load-container').remove();
};


/**
* 修改成功提示 addSuccess()
* @param $element 传入模态框JQ对象 $('#modal_id')
* @param msg      提示文字
* @param callback 提示后回调(2s后)
* */
window.addSuccess =function($element,msg,callback) {
    if(msg == undefined){
        msg = '修改成功';
    }
    if(callback == undefined){
        callback =null;
    }
    var yes     = '<div class="yes-contain" style="float: left;margin-left: 28%">'+
                  '   <div class="yes-meng"></div>'+
                  '   <span class="glyphicon glyphicon-ok"></span>' +
                  '</div>';
    var container = '<div style="height: 150px;width: 100%">' +
                     yes +
                '<p style="float:left;margin: 45px 0 0 30px;font-size: 30px">'+msg+'</p>' +
                '</div>';
    $element.find('.modal-footer').remove();
    $element.find('.modal-body').html(container);
    setTimeout(callback,2000)
}

$(document).ready(function(){
    //ie placeholder
    if( !('placeholder' in document.createElement('input')) ){
        $('input[placeholder],textarea[placeholder]').each(function(){
            var that = $(this),
                text= that.attr('placeholder');
            if(that.val()===""){
                that.val(text).addClass('placeholder');
            }
            that.focus(function(){
                if(that.val()===text){
                    that.val("").removeClass('placeholder');
                }
            }).blur(function(){
                if(that.val()===""){
                    that.val(text).addClass('placeholder');
                }
            }).closest('form').submit(function(){
                if(that.val() === text){
                    that.val('');
                }
            });
        });
    }
})

/**
* 弹出提示框 addAlert()
* @param msg    提示信息
* @param type   提示框类型
* */
window.addAlert = function(msg,type,callback) {
        msg  = msg  ? msg  :'温馨提示';
        type = type ? type :'danger';
        if(callback == undefined || typeof(callback) != 'function'){
            callback = null;
        }
        var container = $('.person-center-info-right');
        var temp =  '<div class="alert alert-'+type+' alert-dismissible" role="alert">'+
                    '   <button type="button" class="close" data-dismiss="alert">' +
                    '   <span aria-hidden="true">'+
                    "&times;"+
                    '</span><span class="sr-only">Close</span></button>'+msg+
                    '</div>';
        container.find('.alert').remove();
        container.prepend(temp);
        setTimeout(callback,1000);
};
(function ($) {

    window.egoNotice = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                title: "操作提示",
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            dialog: function (options) {
                options = $.extend({}, {
                    title: 'title',
                    url: '',
                    width: 800,
                    height: 550,
                    onReady: function () { },
                    onShown: function (e) { }
                }, options || {});
                var modalId = generateId();

                var content = dialogdHtml.replace(reg, function (node, key) {
                    return {
                        Id: modalId,
                        Title: options.title
                    }[key];
                });
                $('body').append(content);
                var target = $('#' + modalId);
                target.find('.modal-body').load(options.url);
                if (options.onReady())
                    options.onReady.call(target);
                target.modal();
                target.on('shown.bs.modal', function (e) {
                    if (options.onReady(e))
                        options.onReady.call(target, e);
                });
                target.on('hide.bs.modal', function (e) {
                    $('body').find(target).remove();
                });
            }
        }
    }();
})(jQuery);