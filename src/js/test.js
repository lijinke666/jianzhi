var JSONP = document.createElement("script");
JSONP.setAttribute("src","一个跨域请求的地址");
document.body.appendChild(JSONP);
//下载完成，立即执行jsonpCallback({...})
//服务器端
//1.接收到客户端请求
//2.解析请求中的回调函数名和参数，并准备数据
//3.拼接回调函数与数据，并返回。如jsonpCallback({...数据})
$.ajax({
    url: "请求地址",
    type: "post",
    data: "请求参数",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback:"flightHandler",
    beforeSend:function(){
        addLoading('努力查询中，请稍后');
    },
    success: function (data) {
        removeLoading();
        addData(data.data);
    },
    error: function () {
        removeLoading();
        alert("系统错误")
    },
    randomNameJsonpCallBack(data){
        success(data);
    },
    //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
});