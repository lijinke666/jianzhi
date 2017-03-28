/**
 * @添加提示框
 * @param string   msg      提示信息
 * @param number   type     提示类型 1：成功 2：失败 3：警告
 * @param function onRemove 消失后回调
 * @param number   time     消失时间
 * */
window.addPopUp   = function(msg,type,onRemove,time) {
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
    var windowWidth = $(window).width();
    var windowheight = $(window).height();
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
            backgroundColor:"#e5821d"
        });
    }

    $popup.width(windowWidth).height(windowheight);
    $popup.appendTo($('body'));
    $popup.find('.popUpBox').animate({
        top:'50%',
        opacity:'1'
    });
    setTimeout(function () {
        $popup.remove();
        setTimeout(function () {
            if( typeof onRemove == 'function' ){
                onRemove();
            }
        },50);
    },time);
};

/**
 * 添加加载动画 addLoading()
 * @param string   msg      提示信息
 * @param string   color    加载色号
 * */
window.addLoading = function (msg,color) {
    var loadmsg     = msg ? msg : '努力加载中...';
    var loadcolor   = color ? color :'#344e87  ';
    var spinner = "";
    for(var i=1; i<=3; i++){
            spinner += "<div class='spinner-container container"+i+"'>" +
                       "<div class='circle1'></div>" +
                       "<div class='circle2'></div>" +
                       "<div class='circle3'></div>" +
                       "<div class='circle4'></div>" +
                       "</div>"
    }
    var $load = $('<div class="spinnerBg">' +
                '<div class="spinner">' +
                spinner+
                '</div>'+
                '<p>'+loadmsg+'</p>' +
                '</div>');
    var $win = $(window);
    var windowWidth = $win.width();
    var windowheight = $win.height();
    $load.width(windowWidth).height(windowheight);
    $load.find(".spinner-container").find('div').css({
        backgroundColor:loadcolor
    });
    $load.find('p').css({
        color:loadcolor
    });
    $load.appendTo($('body'));
};
//移除加载动画
window.removeLoading = function() {
    $('.spinnerBg').remove();
};
