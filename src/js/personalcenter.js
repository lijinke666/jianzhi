/**
 * Created by Administrator on 2016/11/4.
 */
$(function () {
    'use strict';
    var $citypicker = $('#city-picker');

    /**
     * 初始化会员原地址:
     *
     * */
    var a = ['北京市','北京市','西城区']
    $citypicker.citypicker({
        province:a[0],
        city:a[1],
        district:a[2]
    });
    /**
     * 返回省市区地址
     * @return string 省市区无斜杠地址
     *
     * */
    function getAddress() {
        var bf_address = $citypicker.val();
        var address = bf_address.replace(/\//g,' ');
        return address;
    }
});
