/**
 * Created by Administrator on 2016/11/14.
 */
function ExpStep1() {
    this.delRole = {
        //寄件人
        senderName: $('#expSenderName'),
        senderPhone: $('#expSenderPhone'),
        senderCountry: $('#expSenderCountry'),
        senderArea: $('#expSenderArea'),
        senderDetailAddress: $('#expSenderDetailAddress'),
        senderPostCode: $('#expSenderPostCode'),
        //收件人
        receiverName: $('#expReceiverName'),
        receiverPhone: $('#expReceiverPhone'),
        receiverCountry: $('#expReceiverCountry'),
        receiverArea: $('#expReceiverArea'),
        receiverCity: $('#expReceiverCity'),
        receiverDetailAddress: $('#expReceiverDetailAddress'),
        receiverPostCode: $('#expReceiverPostCode')
    };
    this.bindBlur();
    this.bindFoucs();
    this.goNext();
}
ExpStep1.prototype = {
    bindFoucs:function () {
        var delRole = this.delRole;
        //citypicker的单独处理
        $('#distpicker').on('click',function () {
            $(this).find('.city-picker-span').removeClass('del-role-validate del-role-noValidate');
            delRole.senderArea.removeClass('del-role-validate del-role-noValidate');
        });
        for(var item in delRole){
            var _this = delRole[item];
            _this.on('focus',function () {
                $(this).removeClass('del-role-validate del-role-noValidate');
            });
        }
    },
    bindBlur:function () {
        var delRole = this.delRole;
        for(var item in delRole){
            var _this = delRole[item];
            _this.on('blur',function () {
                var $this = $(this);
                if($this.val() == '' &&  !$this.hasClass('ignorable')){
                    $this.addClass('del-role-noValidate');
                }else if($this.val() != ''){
                    $this.addClass('del-role-validate');
                }
            });
        }
    },
    goNext:function () {
        var delRole = this.delRole;
        $('.delivery-next-btn').on('click',function () {
            for(var item in delRole){
                var $this = delRole[item];
                if($this.val() == '' &&  !$this.hasClass('ignorable')){
                    if($this.attr('id') == 'expSenderArea'){
                        $this.parent().find('.city-picker-span').addClass('del-role-noValidate');
                    }else {
                        $this.addClass('del-role-noValidate');
                    }
                }else if($this.val() != ''){
                    $this.addClass('del-role-validate');
                }
            }
            var noValidate = $('.delivery-deliveryinfo').find('.del-role-noValidate');
            //提示位置
            if(noValidate.length !=0 ){
                noValidate.first().focus();
                var top = noValidate.first().offset().top;
                $('body,html').animate({
                    scrollTop:top-200
                })
            }//判断是否都已非空
            else if(noValidate.length == 0){
                var $step1 = $('.delivery-deliveryinfo');
                var $step2 = $('.delivery-productInfo');
                $step1.fadeOut();
                $step2.fadeIn();
                $('body,html').animate({
                    scrollTop:0
                });
                $('.delivery-step-item.step2').addClass('step-active');
            }
        });
    }
};
function ExpStep2() {
    var inputs = this.getInputs();
    this.bindBlur(inputs);
    this.bindFoucs(inputs);
}
ExpStep2.prototype = {
    getInputs:function () {
        var $inputs = $('.delivery-productInfo').find('input');
        var pureInputs = [];
        for (var i=0;i<$inputs.length;i++){
            pureInputs[i] = $inputs[i];
        }
        return pureInputs;
    },
    bindFoucs:function (inputs) {
        $.each(inputs,function (index,e) {
           $(e).on('focus',function () {
                $(this).removeClass('del-role-validate del-role-noValidate');
           })
        });
    },
    bindBlur:function (inputs) {
        $.each(inputs,function (index,e){
            $(e).on('blur',function () {
                var $this = $(this);
                if($this.val() == '' &&  !$this.hasClass('ignorable')){
                    $this.addClass('del-role-noValidate');
                }else if($this.val() != ''){
                    $this.addClass('del-role-validate');
                }
            })
        });
    },
    validate:function (callback) {
        var _this = this;
        if(callback == undefined || typeof(callback) != 'function' ){
            callback = null;
        }
        $('.pbtn-next').on('click',function () {
            //获取当前页面的所有input
            var inputs = _this.getInputs();
            //绑定事件
            _this.bindFoucs(inputs);
            _this.bindBlur(inputs);
            //循环检测
            $.each(inputs,function (index,e) {
                if($(e).val() == '' &&  !$(e).hasClass('ignorable')){
                    $(e).addClass('del-role-noValidate');
                }else if($(e).val() != ''){
                    $(e).addClass('del-role-validate');
                }
            });
            //未通过列表
            var noValidate = $('.delivery-productInfo').find('.del-role-noValidate');
            //提示位置
            if(noValidate.length !=0 ){
                noValidate.first().focus();
                var top = noValidate.first().offset().top;
                $('body,html').animate({
                    scrollTop:top-200
                })
            }//判断是否都已非空
            else if(noValidate.length == 0){
                if (typeof (callback) == 'function'){
                    callback();
                }
            }
        });
    },
    priceMatchBind:function(data) {
        var tbody = $('.delivery-matchRate-contain tbody');
        tbody.html('');
        if (data.length == 0 || data == undefined){
            tbody.parent().after($('<div style="text-align: center;font-size: 18px">对不起，暂时没有合适您的运输方式</div>'))
        }else {
            for (var i=0; i<data.length; i++){
                var tr_list =   '<tr>' +
                    '<td><input type="hidden" name="w_addr" value="'+data[i].w_addr+'"><input type="radio" name="choose-delWay"></td>' +
                    '<td>'+data[i].method+'</td>' +
                    '<td>'+data[i].place+'</td>' +
                    '<td>'+data[i].total+'</td>' +
                    '<td>'+data[i].timeCost+'</td>' +
                    '<td>'+data[i].hasReturnFreight+'</td>' +
                    '<td>' +
                    '<a href="javascript:void(0)" tabindex="0" class="btn mr-note-btn" role="button" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="'+data[i].note+'">查看</a>'+
                    '</td>' +
                    '</tr>';
                tbody.append(tr_list);
            }
            //开启弹出提示
            $('.mr-note-btn').popover();
            //行点选
            $('.delivery-matchRate-contain .table tr').on('click',function () {
                var $this = $(this);
                $this.css({
                    backgroundColor:'#cecece'
                }).find('input[type="radio"]:eq(0)').prop("checked",true);
                $this.siblings().css({
                    backgroundColor:'none'
                }).find('input[type="radio"]:eq(0)').prop("checked",false);
                $('.w_addr_span').html($this.find('input[name="w_addr"]').val());
            });
            //第一行自动选中
            $('.table').find('tbody').find('tr:first').trigger('click');
        }
    },
    goNext:function () {
        var $step2 = $('.delivery-productInfo');
        var $step3 = $('.delivery-matchRate');
        $step2.fadeOut();
        $step3.fadeIn();
        $('body,html').animate({
            scrollTop:0
        });
        $('.delivery-step-item.step3').addClass('step-active');
    }
};
$(document).ready(function () {
    //增加商品
    $('.add-commodity-btn').on('click',function () {
        var $cBox = $('.delivery-commodity-box:first').clone(true);
        $cBox.find('input').val('').removeClass('del-role-validate del-role-noValidate');
        $cBox.find('.commodity-delete').show();
        $(this).before($cBox);
    });
    //删除商品
    $('.commodity-delete').on('click',function () {
        $(this).parent().parent().remove();
    });
    //step2到step1
    $('.pbtn-prev').on('click',function () {
        $('.delivery-deliveryinfo').fadeIn();
        $('.delivery-productInfo').fadeOut();
        $('.delivery-step-item.step2').removeClass('step-active');
        $('body,html').animate({
            scrollTop:0
        });
    });
    //step3到step2
    $('.mr-btn-prev').on('click',function () {
        $('.delivery-productInfo').fadeIn();
        $('.delivery-matchRate').fadeOut();
        $('.delivery-step-item.step3').removeClass('step-active');
    });
    //开启弹出提示
    $('.mr-note-btn').popover({
        trigger:'hover',
        placement:'auto'
    });
    //提交按钮解锁
    $('input[name="agree"]').on('click',function () {
        // console.log($(this)[0].checked);
        var $btn = $('.mr-btn-next');
        var isChecked = $(this)[0].checked;
        if (isChecked){
            $btn.attr('disabled',false).removeClass('disabled');
        }else  if (!isChecked){
            $btn.attr('disabled','disabled').addClass('disabled');
        }
    });
    //行点选
    $('.table.click tbody tr').on('click',function () {
        var $this = $(this);
        $this.css({
            backgroundColor:'#cecece'
        }).find('input[type="radio"]:eq(0)').prop("checked",true);
        $this.siblings().css({
            backgroundColor:'none'
        }).find('input[type="radio"]:eq(0)').prop("checked",false);
    });
    //第一行自动选中
    $('.table').find('tbody').find('tr:first').trigger('click');
    //发件地址自动填充
    $('#chooseSenderAddress').on('click',function () {
        var modal  =  $('#sender_address');
        var $item  =  modal.find('input[type="radio"]:checked').parent().parent().find('td');
        var inputs =  $('.del-sender').find('input');
        var picker    = $('#expSenderArea');
        for (var i = 0; i<inputs.length; i++ ){
            $(inputs[i]).val($item[i+1].innerHTML);
        }
        //处理citypicker
        picker.next().find('span.placeholder').html($item[4].innerHTML);
        modal.modal('hide');
        console.log(picker.val())
    });
    /*-------*/
    //打开商品模态框
    $('button.commodity-choose').on('click',function () {
        var $this  = $(this);
        var modal = $('#commodityStore');
        var now = new Date();
        var cid = now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+(Math.floor(Math.random () * 900) + 100);
        $this.parent().parent().attr('id',cid);
        modal.find('input[name="cBoxId"]').val(cid);
        modal.modal();
    });
    //商品明细填充
    $('#chooseCommodity').on('click',function () {
        var modal  = $('#commodityStore');
        var cBoxId = modal.find('input[name="cBoxId"]').val();
        var cBox   = $('#'+cBoxId);
        var tdList = modal.find('input[type="radio"]:checked').parent().parent().find('td');
        cBox.find('input[name="skuCode"]').val($(tdList[1]).html());
        cBox.find('input[name="hsCode"]').val($(tdList[2]).html());
        cBox.find('input[name="commodityNameCN"]').val($(tdList[3]).find('div.mr-note-btn').attr('data-content'));
        cBox.find('input[name="commodityNameEN"]').val($(tdList[4]).find('div.mr-note-btn').attr('data-content'));
        cBox.find('input[name="commodityWeight"]').val($(tdList[5]).html());
        cBox.find('input[name="declarePrice"]').val($(tdList[6]).html());
        cBox.find('select[name="currencyType"]').val($(tdList[7]).html());
        cBox.find('input[name="specification"]').val($(tdList[8]).html());
        cBox.find('input[name="barCode"]').val($(tdList[9]).html());
        cBox.find('input[name="declareUnits"]').val($(tdList[10]).html());
        modal.modal('hide');
    });

    $('.member-header').on('click',function () {
            roAddInfo();
    });
    //蓉欧补充信息展示
    function roAddInfo() {
        console.log("aaa");
        var $table  = $('.ro-add-info').find('table tbody');
        var $commodityList  = $('.delivery-commodity-box');
        var tr_1   = $table.find('tr:first');
        var cBox_1 = $($commodityList[0]);
        $table.find('tr:not(:first)').remove();
        fillAddTableInfo(tr_1,cBox_1);
        if ($commodityList.length>1){
            for(var i=1; i<$commodityList.length; i++){
                var $tr = tr_1.clone(true);
                fillAddTableInfo($tr,$($commodityList[i]));
                $table.append($tr);
            }
        }
    }
    //将商品信息填充到列表
    function fillAddTableInfo(tr,box) {
        tr.find('input[name="commodityName_table"]').val(box.find('input[name="commodityNameCN"]').val());
        tr.find('input[name="specification_table"]').val(box.find('input[name="specification"]').val());
        tr.find('input[name="barCode_table"]').val(box.find('input[name="barCode"]').val());
        tr.find('select[name="declareUnits_table"]').val(box.find('input[name="declareUnits"]').val());
        tr.find('input[name="hsCode_table"]').val(box.find('input[name="hsCode"]').val());
    }
});

