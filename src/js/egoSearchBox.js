/**
 * Created by Administrator on 2016/11/29.
 */

$(document).ready(function () {
    $('.select2').select2({
        language: 'zh-CN'
    });
    //1级tab
    $('.ego-search-type').on('click', function () {
        var $this = $(this);
        var $priceBox = $('.ego-search-item.price');
        var $package = $('.ego-search-item.package');
        var $tax = $('.ego-search-item.tax');
        $this.addClass('active').siblings().removeClass('active');
        if ($this.hasClass('price')) {
            $priceBox.show();
            $package.hide();
            $tax.hide();
            $('.select2').select2({
                language: 'zh-CN'
            });
        } else if ($this.hasClass('package')) {
            $priceBox.hide();
            $package.show();
            $tax.hide();
            $('.select2').select2({
                language: 'zh-CN'
            });
        } else if ($this.hasClass('tax')) {
            $priceBox.hide();
            $package.hide();
            $tax.show();
            $('.select2').select2({
                language: 'zh-CN'
            });
        }
    });
    //2级tab
    $('.titleItem').on('click', function () {
        var $this = $(this);
        var $first = $this.parent().parent().find('.container-fluid.first');
        var $second = $this.parent().parent().find('.container-fluid.second');
        $this.addClass('active').siblings().removeClass('active');
        if ($this.hasClass('first')) {
            $second.hide();
            $first.show();
            $('.select2').select2({
                language: 'zh-CN'
            });
        } else if ($this.hasClass('second')) {
            $first.hide();
            $second.show();
            $('.select2').select2({
                language: 'zh-CN'
            });
        }
    });
    //序列化表单为json
    (function ($) {
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);
    //获取textArea内容并转化为数组
    function getWayBillFromTextArea($e) {
        var waybills = $e.val().split("\n");
        for (var i = 0; i < waybills.length; i++) {
            if (waybills[i] == "" || typeof(waybills[i]) == "undefined") {
                waybills.splice(i, 1);
                i = i - 1;
            }
        }
        return waybills;
    }

    //出口物流
    $('#exportSearchBtn').on('click', function () {
        // console.log();
        var exportDel = $('#exportSearch').serializeObject();
        if (exportDel.exportCountry == undefined) {
            addPopUp('请选择目的国家', '3');
            return false
        }
        if (exportDel.weight == '') {
            addPopUp('请填写包裹重量', '3');
            return false
        }
        alert('查询出口物流运价')
    });
    //进口物流
    $('#importSearchBtn').on('click', function () {
        // console.log();
        var importDel = $('#importSearch').serializeObject();
        if (importDel.importCountry == undefined) {
            addPopUp('请选择来源国家', '3');
            return false
        }
        if (importDel.province == undefined) {
            addPopUp('请选择省份', '3');
            return false
        }
        if (importDel.weight == '') {
            addPopUp('请填写包裹重量', '3');
            return false
        }
        alert('查询进口物流运价')
    });
    //易购单号查询
    $('#egoWayBillSearchBtn').on('click', function () {
        var $e = $(this).parent().parent().parent().find('.wayBillTextArea');
        var waybills = getWayBillFromTextArea($e);
        if (waybills.length > 10) {
            addPopUp('最多输入10个条单号', '3');
            return false;
        }
        for (var i = 0; i < waybills.length; i++) {
            if (waybills[i].split('').length != 17) {
                addPopUp('请输入正确的易购全球单号', '3');
                return false;
            }
        }
        alert('查询单号~')
    });
    //第三方单号查询
    $('#thirdWayBillSearchBtn').on('click', function () {
        var $e = $(this).parent().parent().parent().find('.wayBillTextArea');
        var waybills = getWayBillFromTextArea($e);
        console.log(waybills);
        if (waybills.length > 10) {
            addPopUp('最多输入10条单号', '3');
            return false;
        }
        //判断数组的每个单号长度是否相等
        if (waybills.length > 1) {
            for (var i = 1; i < waybills.length; i++) {
                if (waybills[i - 1].split('').length !== waybills[i].split('').length) {
                    addPopUp("请输入同一公司的单号");
                    return false;
                }
            }
        }
        alert('查询单号~')
    });
    //行邮税号
    var xysh = $('#xyshSearch');
    var newTax = $('#newtaxSearch');
    //税号税率设置
    xysh.find('select[name="productName"]').on('change', function () {
        var string = $(this).val().split('-');
        //置空
        xysh.find('span.tax_fee').html('');
        xysh.find('input[name="total_fee"]').val('');
        //置值
        xysh.find('input[name="xingyoushuihao"]').val('行邮申报号：' + string[0]);
        xysh.find('input[name="tax"]').val('税率：' + string[1]);
    });
    newTax.find('select[name="productName"]').on('change', function () {
        var tax = $(this).val();
        //置空
        newTax.find('span.tax').html('');
        newTax.find('input[name="total_fee"]').val('');
        //置值
        newTax.find('input[name="tax"]').val('税率：'+tax);
    });
    //税费计算
    xysh.find('input[name="total_fee"]').on('keyup', function () {
        var string = xysh.find('select[name="productName"]').val();
        if (string != null) {
            string = string.split('-');
            var tax_fee = (parseFloat($(this).val()) * parseFloat(string[1])).toFixed(2);
            if (isNaN(tax_fee)){
                tax_fee = "";
            }else if (tax_fee <= 50){
                tax_fee = "税费小于50元，免征"
            }else {
                tax_fee = tax_fee+" 元(CNY)";
            }
            xysh.find('span.tax_fee').html(tax_fee);
        }
    });
    newTax.find('input[name="total_fee"]').on('keyup', function () {
        var tax = newTax.find('select[name="productName"]').val();
        if (tax != null) {
            var tax_fee = (parseFloat($(this).val()) * parseFloat(tax)).toFixed(2);
            if (isNaN(tax_fee)){
                tax_fee = "";
            }else {
                tax_fee = tax_fee+" 元(CNY)";
            }
            newTax.find('span.tax_fee').html(tax_fee);
        }
    });
});
