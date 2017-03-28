//图片预览
var ID_CODE_REG = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
$('.pca-imgFile').on('change',function (e) {
    var file  = e.target.files||e.dataTransfer.files;
    var $item = $(this).parent();
    if(file){
        var nameArray = file[0].name.split('.');
        var _name = nameArray[nameArray.length-1];
        if (_name == 'jpg' || _name == 'bmp' || _name == 'png'){
            var reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload=function(){
                $item.find('img').attr('src',this.result);
                $item.find('p').animate({
                    opacity:0
                })
            };
        }else {
            addPopUp('请选择一张格式为png、jpg、bmp的图片',2);
        }
    }
});
$('button.ego-btn.submit').on('click',function () {
    var name    = $('input[name="realName"]').val(),
        idCode  = $('input[name="idCode"]').val(),
        front_id= $('input[name="front-idCard"]').val(),
        back_id = $('input[name="back-idCard"]').val(),
        agreement=$('input[name="spreadAgreement"]').val();
    if (name == '') {
        addPopUp('请输入您的真实姓名',3);
        return false;
    }
    console.log(ID_CODE_REG.test(idCode));
    if (idCode == '' || !ID_CODE_REG.test(idCode)) {
        addPopUp('请输入正确的身份证号',3);
        return false;
    }
    if (front_id == null || front_id == undefined || front_id == ''){
        addPopUp('请上传身份证正面',3);
        return false;
    }
    if (back_id == null || back_id == undefined || back_id == ''){
        addPopUp('请上传身份证背面',3);
        return false;
    }
    if (agreement == null || agreement == undefined || agreement == ''){
        addPopUp('请上传代理合作协议扫描件',3);
        return false;
    }
    /*$.ajax({
        url: "",
        type: "post",
        data: $('#spreadForm').serialize(),
        dataType: "json",
        beforeSend:function(){
            addLoading('资料上传中，请稍后');
        },
        success: function (data) {
            removeLoading();
            //egoNotice
            /!*egoNotice.alert({
                title:"提交成功",
                message:'<span style="color: #e5821d">资料已提交成功！</span>' +
                '<p>平台审核通过后可在个人邮箱查看您的专属推广链接</p>'
            });*!/
        },
        error: function () {
            addPopUp("系统错误",2);
            removeLoading()
        }
    });*/
    //写在success方法中;
    egoNotice.alert({
        title:"提交成功",
        message:'<span style="color: #e5821d">资料已提交成功！</span>' +
                '<p>平台审核通过后可在个人邮箱查看您的专属推广链接</p>'
    });
});

