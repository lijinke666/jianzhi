/**
 * Created by Administrator on 2016/12/15.
 */
$(document).ready(function () {
    var or = new OrderPrice();
    $("li.priceSequence").on('click',function () {
        or.sequenceTable('price');
    });
    $("li.priceReverse").on('click',function () {
        or.reverseTable('price');
    });
    $("li.timeSequence").on('click',function () {
        or.sequenceTable('time');
    });
    $("li.timeReverse").on('click',function () {
        or.reverseTable('time');
    });
});
function OrderPrice() {

}
OrderPrice.prototype = {
    getArray:function () {
        return $('div.ego-price-display table tbody tr').clone(true);
    },
    orderArray:function (type) {
        var arr = this.getArray();
        if (type == "" || type == undefined) {
            type = "price";
        }
        var len = arr.length,now,next;
        for (var i = 0; i < len; i++) {
            for(var j = 0; j < len - 1 - i; j++) {
                if(type == 'price'){
                    now   = parseFloat($(arr[j]).find('.realPrice').html().substr(1));
                    next  = parseFloat($(arr[j+1]).find('.realPrice').html().substr(1));
                }else if(type == "time"){
                    now   = parseInt(this.trimLargeTime($(arr[j])));
                    next  = parseInt(this.trimLargeTime($(arr[j+1])));
                }
                if (now > next) {
                    var temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    },
    sequenceTable:function (type) {
        var $tbody  = $('div.ego-price-display table tbody');
        var arr     = this.orderArray(type);
        $tbody.html('');
        for(var i=0; i<arr.length; i++){
            $tbody.append(arr[i]);
        }
    },
    reverseTable:function (type) {
        var $tbody  = $('div.ego-price-display table tbody');
        var arr     = this.orderArray(type);
        $tbody.html('');
        for(var i=arr.length-1; i>=0; i--){
            $tbody.append(arr[i]);
        }
    },
    trimLargeTime:function ($val) {
        var os = $val.find('.time').html();
        var ns = os.split("-")[1];
        ns = ns.substring(0,ns.length-1);
        return ns;
    }
};
