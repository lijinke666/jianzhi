/**
 *  getCheckBoxId() 获取页面上所有选中的checkbox的ID(批量发货，批量删除)
 *  长度为 0  返回 false
 *  否则返回一个id 的数组
 * */
window.getCheckBoxId = function () {
    var checkLsit = $('.waybill-list-table tbody input[type="checkbox"]:checked');
    if(checkLsit.length == 0){
        return false;
    }else {
        var array = [];
        for(var i=0; i<checkLsit.length; i++){
            array.push($(checkLsit[i]).val());
        }
        return array;
    }
};
/**
 *  getThisCheckBoxId() 获取当前运单的checkbox的ID
 *  返回当前运单的id
 *  @parm $ele 传入当前事件发生的对象$(this)
 *
 * */
window.getThisCheckBoxId = function ($ele) {
    var $tr  = $ele.parent().parent().parent().parent();
    var _val = $tr.find('input[type="checkbox"]').val();
    return _val;
};

/**
 * 创建select内容
 * @parm coupons[] 传入一个优惠券数组
 * 返回一段dom结构字符串
 * */
window.createCoupon = function (coupons) {
    var html = "";
    for(var i=0; i<coupons.length; i++){
        html+='<option value="'+coupons[i].id+'">'+coupons[i].desc+'</option>';
    }
    return html;
};
/**
 *  setModalVal() 设置模态框中当前余额、所需金额的值
 *  @parm nowBalance  当前余额
 *  @parm needBalance 所需金额
 *
 * */
window.setModalVal = function (nowBalance,needBalance) {
    var $modal = $('#bulkSendOut');
    $modal.find('span.nowBalance').html('￥'+nowBalance);
    $modal.find('span.needBalance').html('￥'+needBalance);
    if (nowBalance < needBalance){
        $modal.find('button.bulk-confirm').hide();
        $modal.find('button.bulk-recharge').show();
        $modal.find('.waybill-account-notice').show();
    } else if(nowBalance >= needBalance){
        $modal.find('button.bulk-confirm').show();
        $modal.find('button.bulk-recharge').hide();
        $modal.find('.waybill-account-notice').hide();
    }
    $modal.modal();
};
var coupons = [];
window.setModalConfirm = function (nowBalance,needBalance,id,coupons) {
    var $modal = $('#bulkSendOut');


    $modal.find('span.nowBalance').html('￥'+nowBalance);
    $modal.find('span.needBalance').html('￥'+needBalance);
    $("#confirm-ids").val(id);

    $modal.find('button.bulk-confirm').show();
    $modal.find('button.bulk-recharge').hide();
    $modal.find('.waybill-account-notice').hide();

    /*添加options*/
    if(coupons.length>0){
        for(var i=0; i<coupons.length; i++){
            options+='<option value="'+coupons[i].id+'">'+coupons[i].desc+'</option>';
        }
        var label = $modal.find('.couponLabel');
        label.find('select').html(options);
        label.show();
    }
    $modal.modal();
};
$(document).ready(function () {
    //起始时间
    $("#start_date").datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        pickerPosition: "bottom-left"
    }).on('changeDate',function () {
        $('#end_date').datetimepicker('setStartDate',$('input[name="start_date"]').val())
    });
    //结束时间
    $('#end_date').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        pickerPosition: "bottom-left"
    }).on('changeDate',function () {
        $('#start_date').datetimepicker('setEndDate',$('input[name="end_date"]').val())
    });
    //查询条件
    var $option = $('.way-bill-options').find('li');
    $option.on('click',function () {
        var $this   = $(this);
        var $option = $this.find('a').attr('value');
        var $button = $this.parent().parent().find('button');
        var $hidden = $this.parent().parent().find('input[type="hidden"]');
        $button[0].innerHTML = $this[0].innerText+' <span class="caret"></span>';
        $hidden.attr('value',$option)
    });
    //checkbox控制
    $('.waybill-check-ctrl').on('click',function () {
        var $this        = $(this);
        var checkBoxList = $('.waybill-list-table tbody input[type="checkbox"]');
        var isChecked = $this[0].checked;
        checkBoxList.each(function (index,e) {
            e.checked = isChecked;
        })
    });
    //回填单号
    $('#openDomesticNumber').on('click',function () {
        var checkLsit = $('.waybill-list-table tbody input[type="checkbox"]:checked');
        var $domesticNumberTable = $('.domesticNumberTable');
        $domesticNumberTable.find('tbody').html('');
        if (checkLsit.length == 0){
            addPopUp('请至少选择一条记录',3)
        }else {
            for (var i=0; i<checkLsit.length; i++){
                var wayBillNumber = $(checkLsit[i]).parent().parent().find('.waybillNumberSpan').html();
                var tr_list =   '<tr>' +
                    '<td>'+wayBillNumber+'</td>' +
                    '   <td>' +
                    '       <input type="hidden" value="'+wayBillNumber+'" name="egoNumber">'+
                    '       <input type="text"  name="domesticNumber">'+
                    '   </td>' +
                    '</tr>';
                $domesticNumberTable.find('tbody').append(tr_list);
            }
            $('#domesticNumber').modal();
        }
    });
    $('.delete-cancel').on('click',function () {
       $('#deleteConfirm').modal('hide');
    });
    /*------------------------------------------------*/
    //批量发货
    $('#bulkSendOutBtn').on('click',function () {
        var array = getCheckBoxId();
        if(array!=false){
           /* //$.ajax()......
            setModalVal('550','650');*/
          setModalConfirm(400,400,[1],coupons);
        }else {
            addPopUp('请至少选择一条记录',3)
        }
    });
    //单个发货
    $('button.send').on('click',function () {
        var id = getThisCheckBoxId($(this));
        alert('当前id为'+id);
        //$.ajax()......异步查询逻辑
        setModalVal('550','300');
    });
    /*-------------------------------------------------*/
    //批量删除
    $('#deleteConfirmBtn').on('click',function () {
        var array = getCheckBoxId();
        if(array!=false){
            egoNotice.confirm({ title:"确认删除？",message: "确认要删除选择的数据吗？" }).on(function (e) {
                if (!e) {
                    return;
                }else {
                    //确认
                    alert('走 删除去~');
                }
            })
        }else {
            addPopUp('请至少选择一条记录',3);
        }
    });
    //单个删除
    $('.delete').on('click',function () {
        var id = getThisCheckBoxId($(this));
        egoNotice.confirm({ title:"确认删除？",message: "确认要删除选择的数据吗？" }).on(function (e) {
            if (!e) {
                return;
            }else {
                alert('走 删除去~');
            }
        })
    });

    /*-------------------------------------------------*/
    //打印面单模态框控制
    $('#openPrintBill').on('click',function () {
        var tdList    = $('.waybill-list-table tbody input[type="checkbox"]:checked').parent();
        var orderId =[],productId =[];
        for(var i=0; i<tdList.length; i++){
            orderId[i]  = $(tdList[i]).find('input[type="checkbox"]').val();
            productId[i]= $(tdList[i]).find('input[name="product_id"]').val();
        }
        if(tdList.length>0){
            if(productId.length>1){
                for(var j=1; j<productId.length; j++){
                    if(productId[j-1] != productId[j]){
                        addPopUp("仅支持一次打印一种产品的运单",2);
                        return false;
                    }
                }
            }
            $('#printbill-ids').val(orderId);
            $('#printExpressBill').modal();
        }else {
            addPopUp('请至少选择一条记录',3);
        }
    });
    //确认打印
    $('#confirmPrint').on('click',function () {
        $('#printExpressBill').hide();
       var options = {
           type:$(".printBillType input[name='printWay']:checked").val(),
           ids:$('#printbill-ids').val()
       };
       console.log(options);
       $.ajax({
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
        });
    });

});