
jinp(1);
function jinp(kg){//禁屏
    if(kg==1){
        document.ontouchmove = function(){ return false;}
    }else{
        document.ontouchmove = function(){ return true;}
    }
}
/*页面加载*/
var ImagesSrc = [
    'img/bg_g1.jpg',
    'img/logo.png',
    'img/ly1.png',
    'img/ly2.png',
    'img/ly3.png',
    'img/ly4.png',
    'img/ly5.png',
    'img/p1_1.png',
    'img/p1_2.png',
    'img/p1_3.png',
    'img/p1_4.png',
    'img/p2_1.png',
    'img/p2_2.png',
    'img/p2_3.png',
    'img/s1.png',
    'img/s2.png',
    'img/s3.png',
    'img/xg_1.png',
    'img/xg_2.png',
    'img/xg_3.png',
    'img/xg_4.png',
    'img/yc1.png'
];
var loading = new LoadingImgs(ImagesSrc);
loading.progress = function (x) {
    document.querySelector('#loading p').innerHTML = 'Loading...'+x+'%';
};
loading.init();

$(function () {
    loading.complete = function () {
        console.log('22加载完成！');

        $('#loading').fadeOut(1000);
        $('.home').fadeIn(1000);

    };

    //领取礼包
    $('.p1_3').on('touchend',function () {
        $('.layer_information').show();
    });
    //填写信息领取礼包
    $('.receive_but').on('touchend',function () {

        $('.layer_information').hide();

        //礼包一
        $('.layer_peck-one').show();

        //礼包二
         //$('.layer_peck-two').show();

        //来晚了
        //$('.layer_come-late').show();

        //人山人海
         //$('.layer_much').show();

    });
    //活动规则
    $('.hd_but').on('touchend',function () {
        jinp(2);
        $('.layer_hd').show();
    });
    //关闭活动规则
    $('.error_but').on('touchend',function () {
        jinp(1);
        $('.layer_hd').hide();
    });
    //滑动活动规则隐藏手势
    $('.hd_mould').on('touchstart',function () {
        $('.rules_s').hide();
    });
    //我的奖品
    $('.prize_but').on('touchend',function () {

    });
    //返回主页
    $('.but').on('touchend',function () {
        $(this).parents('.layer').hide();
    });


    //验证手机号码
    $('.code_but').on('touchend',function () {
        if($('.number').attr('type') == 'tel'){
            var phone=$('.number').val();
            var phoneReg= /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(!phoneReg.test(phone)){
                var tips = '请输入有效的手机号码';
                $('.layer_num').show().children().text(tips);
                setTimeout(function () { $('.layer_num').hide() },1200)
            }
        }
    });
});

function LoadingImgs(params) {
    this.p  = 0;//进度
    this.Srcs  = null;
    this.imgs  = {};
    this.court  = 0;
    this.init = function () {
        this.Srcs = params;
        this.len = this.Srcs.length;
        this.go();
    };
    this.progress = function (x) {};
    this.complete = function () {};
    this.go = function () {
        var that = this;
        for(var i = 0; i < that.len; i++) {
            that.imgs[i] = new Image();
            that.imgs[i].src = that.Srcs[i];
            that.imgs[i].onload = function () {
                that.p = 100*((that.court+1)/that.len);
                that.p = parseInt(that.p);
                that.progress(that.p);
                if(that.court >= that.len-1)
                    that.complete();
                that.court++;
            }
        }
    }
}