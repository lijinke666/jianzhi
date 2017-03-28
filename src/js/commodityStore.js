/**
 * Created by Administrator on 2016/12/23.
 */
window.getCheckBoxId = function () {
    var checkLsit = $('.commodityList tbody input[type="checkbox"]:checked');
    if(checkLsit.length == 0){
        return false;
    }else {
        var array = [];
        for(var i=0; i<checkLsit.length; i++){
            array.push($(checkLsit[i]).next().val());
        }
        return array;
    }
};
//获取某一行商品信息
function getCommodityInfo($this) {
    var tdList = $this.parent().parent().find('td');
    var array   = [];
    for(var i=0; i<tdList.length-1; i++){
        if(i == 0){
            array.push($(tdList[i]).find('input[name="commodityId"]').val());
        }else {
            array.push($(tdList[i]).html());
        }
    }
    return array;
}
//商品信息回填
function setCommodityInfo(info,contain) {
    var modal   = contain;
    //商品Id
    modal.find('input[name="commodityId"]').val(info[0]);
    //sku
    modal.find('input[name="skuCode"]').val(info[1]);
    //规格
    modal.find('input[name="specification"]').val(info[2]);
    //中文名称
    modal.find('input[name="nameZH"]').val(info[3]);
    //英文名称
    modal.find('input[name="nameEN"]').val(info[4]);
    //hs编码
    modal.find('input[name="hsCode"]').val(info[5]);
    //条形码
    modal.find('input[name="barCode"]').val(info[6]);
    //净重weight
    modal.find('input[name="weight"]').val(info[7]);
    //申报单位
    modal.find('select[name="declareUnits"]').val(info[8]);
    //申报单价
    modal.find('input[name="price"]').val(info[9]);
    //申报币别
    modal.find('select[name="declareCurrency"]').val(info[10]);
}
//商品验证
function commodityInfoValidate() {
    var hsCode          = $('input[name="hsCode"]').val();
    var $barCode        = $('input[name="barCode"]');
    var declareUnits    = $('select[name="declareUnits"]').val();
    var declareCurrency = $('select[name="declareCurrency"]').val();
    var hsReg           = /^\d{10}$/;
    var xyReg           = /^\d{8}$/;
    //sku
    if($('input[name="skuCode"]').val() == ''){
        addPopUp('商品编号(SKU)不能为空',2);
        return false;
    }
    //规格
    if( $('input[name="specification"]').val() == ''){
        addPopUp('商品规格不能为空',2);
        return false;
    }
    //中文名称
    if($('input[name="nameZH"]').val() == ''){
        addPopUp('商品中文名不能为空',2);
        return false;
    }
    //英文名称
    if($('input[name="nameEN"]').val() == ''){
        addPopUp('商品英文名不能为空',2);
        return false;
    }
    //hs编码
    if( hsCode == ''){
        addPopUp('hs编码不能为空',2);
        return false;
    }else if(!hsReg.test($.trim(hsCode)) || !xyReg.test($.trim(hsCode))){
        addPopUp('hs编码应为10位纯数字/行邮税号为8位',3);
        return false;
    }
    //净重weight
    if($('input[name="weight"]').val() == ''){
        addPopUp('商品重量不能为空',2);
        return false;
    }
    //申报单位
    if(declareUnits == '' || declareUnits == null){
        addPopUp('申报单位不能为空',2);
        return false;
    }
    //申报单价
    if($('input[name="price"]').val() == ''){
        addPopUp('申报单价不能为空',2);
        return false;
    }
    //申报币别
    if(declareCurrency == '' || declareCurrency == null){
        addPopUp('申报币别不能为空',2);
        return false;
    }
    //条形码
    if( $barCode.val() == ''){
        $barCode.val('无');
    }
    return true;
}

$(document).ready(function () {
    //checkbox控制
    $('.waybill-check-ctrl').on('click',function () {
        var $this        = $(this);
        var checkBoxList = $('.commodityList tbody input[type="checkbox"]');
        var isChecked = $this[0].checked;
        checkBoxList.each(function (index,e) {
            e.checked = isChecked;
        })
    });
    //打开新增
    $('#addCommodityBtn').on('click',function () {
        var modal = $('#addCommodityModal');
        modal.find('input').val('');
        modal.find('select').val('');
        modal.modal();
    });
    //打开修改
    $('button.modifyCommodity').on('click',function () {
        var info    = getCommodityInfo($(this));
        var modal   = $('#addCommodityModal');
        setCommodityInfo(info,modal);
        modal.modal();
    });
    //保存
    $('button.save').on('click',function () {
        if(commodityInfoValidate()){
            var data = $('#commodityInfoForm').serialize();
            console.log($('#addCommodityModal').find('input[name="commodityId"]').val());
            alert('提交表单'+data);
            //直接提交或者ajax
            /*$.ajax({
                url: "",
                type: "post",
                data: options,
                dataType: "json",
                beforeSend:function(){
                    addLoading('处理中，请稍后');
                },
                success: function (data) {
                    removeLoading();

                },
                error: function () {
                    addPopUp("系统错误",2);
                    removeLoading()
                }
            });*/
        }
    });
    //删除
    $('#deleteCommodityBtn').on('click',function () {
        var ids = getCheckBoxId();
        if(ids){
            alert('删除'+ids);
            /*$.ajax({
                url: "",
                type: "post",
                data: ids,
                dataType: "json",
                beforeSend:function(){
                    addLoading('处理中，请稍后');
                },
                success: function (data) {
                    removeLoading();
                    addLoading('删除成功，请稍后');
                },
                error: function () {
                    addPopUp("系统错误",2);
                    removeLoading()
                }
            });*/
        }else {
            addPopUp('请至少选择一条记录',3);
        }
    });
});