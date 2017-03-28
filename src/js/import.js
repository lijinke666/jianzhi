/**
 * Created by Administrator on 2016/11/18.
 */
function ImportStep1() {
    this.delRole = {
        //寄件人
        senderName: $('#importSenderName'),
        senderPhone: $('#importSenderPhone'),
        senderCountry: $('#importSenderCountry'),
        senderArea: $('#importSenderArea'),
        senderCity:$('#importSenderCity'),
        senderDetailAddress: $('#importSenderDetailAddress'),
        senderPostCode: $('#importSenderPostCode'),
        //收件人
        receiverName: $('#importReceiverName'),
        receiverPhone: $('#importReceiverPhone'),
        receiverIdCard:$('#importReceiverIdCard'),
        receiverCountry: $('#importReceiverCountry'),
        receiverArea: $('#importReceiverArea'),
        receiverDetailAddress: $('#importReceiverDetailAddress'),
        receiverPostCode: $('#importReceiverPostCode')
    };
    this.onFoucus();
    this.onBlur();
    this.goNext();
}
ImportStep1.prototype = {
    onFoucus:function () {
        var delRole = this.delRole;
        //citypicker的单独处理
        $('#distpicker').on('click',function () {
            $(this).find('.city-picker-span').removeClass('del-role-validate del-role-noValidate');
            delRole.receiverArea.removeClass('del-role-validate del-role-noValidate');
        });
        for(var item in delRole){
            var _this = delRole[item];
            _this.on('focus',function () {
                $(this).removeClass('del-role-validate del-role-noValidate');
            });
        }
    },
    onBlur:function () {
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
        var _this = this;
        $('.delivery-next-btn').on('click',function () {
            for(var item in delRole){
                var $this = delRole[item];
                if($this.val() == '' &&  !$this.hasClass('ignorable')){
                    if($this.attr('id') == 'importReceiverArea'){
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
                    scrollTop:630
                });
                $('.delivery-step-item.step2').addClass('step-active');
            }
        });
    }
};
function ImportStep2() {
    var inputs = this.getInputs();
    this.bindBlur(inputs);
    this.bindFoucs(inputs);
}
ImportStep2.prototype = {
    getInputs:function () {
        var $inputs = $('.delivery-info-box').find('input');
        var pureInputs = [];
        for (var i=0;i<$inputs.length;i++){
            pureInputs[i] = $inputs[i];
        }
        return pureInputs;
    },
    //获取服务形式
    getService:function () {
        var $serviceCon =  $('.delivery-chooseService');
        var services = $serviceCon.find('input[type="checkbox"]:checked');
        console.log(services);
        var a = [];
        for(var i=0; i<services.length; i++){
            a.push($(services[i]).val());
        }
        return a;
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
            //验证服务
            var $serviceCon =  $('.delivery-chooseService');
            var services = $serviceCon.find('input[type="checkbox"]:checked');
            if(services.length == 0){
                addPopUp('请至少选择一项服务内容',3);
                var top = $serviceCon.offset().top;
                $('body,html').animate({
                    scrollTop:top-200
                });
                return false;
            }
            //获取当前页面的所有input
            var inputs = _this.getInputs();
            //重新绑定事件
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
            var noValidate = $('.delivery-info-box').find('.del-role-noValidate');
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
                    '<td><input type="radio" name="choose-delWay"></td>' +
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
            $('.table tr').on('click',function () {
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
    //select2下拉菜单
    $('.select2').select2({
        language:'zh-CN'
    });
    //选择服务
    $('div.service-item').on('click',function () {
        var $this   = $(this);
        var $check  = $this.find('input[type="checkbox"]:eq(0)');
        if($check.prop('checked')){
            $check.prop('checked',false);
            if($this.hasClass('transport')){
                $('.service-item.overseaPickUp').find('input[type="checkbox"]:eq(0)').prop('checked',false);
            }
        }else if(!$check.prop('checked')){
            $check.prop('checked',true);
            if($this.hasClass('overseaPickUp')){
                $('.service-item.transport').find('input[type="checkbox"]:eq(0)').prop('checked',true);
            }
        }
    });

    //增加商品
    $('.add-commodity-btn').on('click',function () {
        var $cBox = $('.delivery-commodity-box:first').clone(true);
        $cBox.find('input').val('').removeClass('del-role-validate del-role-noValidate');
        $cBox.find('.commodity-delete').show();
        $cBox.find('.after-tax-table').hide();
        $(this).before($cBox);
    });
    //删除商品
    $('.commodity-delete').on('click',function () {
        $(this).parent().parent().remove();
    });
    //计算总价
    $('input[name="commodityQuantity"]').change(function () {
        var $this       = $(this);
        var $container  = $this.parent().parent().parent().parent();
        var $Quantity  = parseFloat($this.val());
        var $price      = parseFloat($container.find('input[name="declarePrice"]').val());
        var $total      = $container.find('input[name="totalPrice"]');
        var total = 0;
        if (!isNaN($price) && !isNaN($Quantity)){
            total = $price*$Quantity;
            $total.val(total)
        }else {
            $total.val("")
        }
    });
    $('input[name="declarePrice"]').change(function () {
        var $this       = $(this);
        var $container  = $this.parent().parent().parent().parent();
        var $price      = parseFloat($this.val());
        var $Quantity   = parseFloat($container.find('input[name="commodityQuantity"]').val());
        var $total      = $container.find('input[name="totalPrice"]');
        var total = 0;
        if( !isNaN($price) && !isNaN($Quantity)){
            total = $price*$Quantity;
            $total.val(total)
        }else {
            $total.val("")
        }
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
    //行点选
    $('.table tr').on('click',function () {
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
        var senderCountry  =  $('#importSenderCountry');
        $('#importSenderName').val($item[1].innerHTML);
        $('#importSenderPhone').val($item[2].innerHTML);
        senderCountry.val($item[3].innerHTML.split("-")[0]);
        $('#importSenderArea').val($item[4].innerHTML);
        $('#importSenderCity').val($item[5].innerHTML);
        $('#importSenderDetailAddress').val($item[6].innerHTML);
        $('#importSenderPostCode').val($item[7].innerHTML);
        /*placeholder处理*/
        $('#select2-importSenderCountry-container').html($item[3].innerHTML);
        modal.modal('hide');
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
        cBox.find('select[name="commodityUnit"]').val($(tdList[5]).html());
        cBox.find('input[name="netWeight"]').val($(tdList[6]).html());
        cBox.find('input[name="specification"]').val($(tdList[7]).html());
        cBox.find('input[name="declarePrice"]').val($(tdList[8]).html());
        cBox.find('select[name="specification"]').val($(tdList[9]).html());
        modal.modal('hide');
    });
});
