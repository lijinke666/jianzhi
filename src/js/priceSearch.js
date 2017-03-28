/**
 * Created by Administrator on 2016/12/5.
 */
$(document).ready(function () {
    $(".select2").select2({
        language:'zh-CN'
    });
    $('button.note-btn').on('click',function () {
        var $this = $(this);
        var modal = $('#priceNote');
        var title = $this.parent().parent().find('td')[0].innerHTML+"-备注";
        var note  = $this.attr('data-content');
        note = note.replace(/(;|；)/g, ";<br/>");
        modal.find('#priceLabel').html(title);
        modal.find('.modal-body').html(note);
        modal.modal();
    });



    //非顶部刷新
    (function () {
        var top       = document.documentElement.scrollTop|| document.body.scrollTop;
        if (top > 100){
            var $header   = $('.ego-header');
            var $img      = $header.find('.ego-logo');
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }
    })();
    //滚动
    window.onscroll = function () {
        var top       = document.documentElement.scrollTop|| document.body.scrollTop;
        var $header   = $('.ego-header');
        var $img      = $header.find('.ego-logo');
        if(top >= 100){
            $header.addClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/LOGO.png')
        }else if(top < 100){
            $header.removeClass('ego-header-onscroll');
            $img.attr('src','../static/image/index2/logo(white).png')
        }
    };
    //切换查询方式
    $('select[name="way"]').on('change',function () {
        var $val = $(this).val();
        if($val == 'import'){
            alert('去进口页面');
            // window.location.href = '';
        }else if ($val == 'export'){
            alert('区出口页面');
            // window.location.href = '';
        }
    });
    //页面逻辑
    $("#priceSearchBtn").on('click',function () {
        var $weight = $('input[name="weight"]');
        if($weight.val() == ''){
           addPopUp("请填写货物毛重",'3');
           return false;
        }
        //查询逻辑
        alert('执行查询逻辑')
    });
});