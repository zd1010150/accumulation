

$(document).ready(function () {
    var app = {
        init: function () {

            this.attachEvent();
        },

        attachEvent: function () {
            var self = this;
            //关闭popup
            $(".popup").on("click", "button.close", function () {
                $(this).closest(".popup").fadeOut();
            }).on("click",".join-in-btn",function(){
                $(this).closest(".popup").fadeOut();
                $('html, body').animate({
                    scrollTop: $("#live-account-iframe").offset().top
                },1000);
            });
            $("body").on("click",".activey-detail",function(){
                $(".popup").fadeIn();
            }).on("click","section.flow .join-in-btn",function(){
                $('html, body').animate({
                    scrollTop: $("#live-account-iframe").offset().top
                },1000);
            });



        },
        initView: function(){
            $(".popup").hide();
            this.initPopupLoginForm();
            this.initLoginForm();
        },
        changeTopics: function (e, callback) {
            var currentIndex = $(this).data("currentTopicIndex"),
                totalPages = $(this).data("totleTopic"),
                isNext = $(e.target).hasClass("next-btn"),
                index = currentIndex;
            if (isNext && currentIndex < totalPages) {
                index = currentIndex + 1;

            } else if ((!isNext) && currentIndex > 1) {
                index = currentIndex - 1;
            }
            $(this).data("currentTopicIndex", index);
            if (callback) {
                callback(index, totalPages);
            }
        },

        /**
         * popup 手机端的magazine
         */
        initPopupSmallMagazine:function(){
            $('div.pinch-zoom').each(function () {
                new RTP.PinchZoom($(this), {});
            });

            window.mySwipe = new Swipe(document.getElementById('slider'), {
                speed: 400,
                callback:function(index, elem){
                    if(index == MAGAZIN_SMALL_SCREEN_NUMBER){
                        $(".popup").hide();
                        $(".popup-login").show();
                    }
                }
            });
        },
        /**
         * popup-login 相关的事件
         */
        initPopupLoginForm:function(){
            var $registerTab = $(".register-tab"),
                $downloadTab = $(".login-download-tab");
            $registerTab.show();
            $downloadTab.hide();
            $registerTab.find("iframe").prop("src",REGISTER_URL+REGISTER_LOCAL_STYLE);
            $(".button-register").on("click",function(){
                $registerTab.hide();
                $downloadTab.show();
            });
            $(".button-login-download").on("click",function(){
                $registerTab.show();
                $downloadTab.hide();
            });
            $(".button-register,.button-login-download").on("touchstart",function(event){
                event.stopPropagation()
            })
        },
        /**
         * LOGINFORM 处理
         */
        initLoginForm:function(){
            var $form = $(".popup-login .login-download-tab form"),
                $email = $form.find("input[name=email]"),
                $pwd = $form.find("input[name=password]"),
                $emialUnregisterError =  $form.find(".email-error"),
                $loginError = $form.find(".login-error");
            $form.find("input.text").on("keyup",function(){
                $(this).val($(this).val().replace(/\<\>/g,''));
            });
            $email.on("blur",function(){
                $.ajax({
                    url:CHECK_EMAIL_URL+$email.val(),
                    dataType:"json",
                    type:"get"
                }).done(function(data,status){
                    $emialUnregisterError.addClass("unvisible");
                }).fail(function(){
                    $emialUnregisterError.removeClass("unvisible");
                });
            });
            $form.on("submit",function(e){
                e.preventDefault();
                if($.trim($pwd.val()).length < 1 || $.trim($email.val()).length < 1 || (!$emialUnregisterError.hasClass("unvisible"))){
                    return false;
                }
                $.ajax({
                    async: true,
                    crossDomain: true,//运行跨域
                    headers: {
                        "accept": "application/json"
                    },
                    url:LOGIN_URL,
                    data:$form.serialize(),
                    method: "POST"
                }).done(function(data){
                    $loginError.addClass("unvisible");
                    if(!data.error){
                        window.open(PDF_URL,"_self");
                    }
                }).fail(function(){
                    $loginError.removeClass("unvisible");
                });
            });
        }
    };
    app.init();
});



