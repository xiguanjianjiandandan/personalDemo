/**
 * Created by ���ϳ� on 2016/9/22.
 */
window.onload=function(){
    var curSong=1;
    $(".pre").on("click",function(){
        if(curSong==1){
            curSong=4
        }else{
            curSong--;
        }
        switchSong(curSong);

    });
    var isPlay=false;
    $(".play")[0].onclick=function(){
        if(!isPlay){
            isPlay=true;
            playAudio();
            $(".play").html("&#xe681;");
            $(".circle").css("animation-play-state","running");
            $(".lineIcon").css("animation-play-state","running");
        }else{
            isPlay=false;
            $("#audio")[0].pause();
            $(".play").html("&#xe6df;");
            $(".circle").css("animation-play-state","paused");
            //$(".lineIcon").css("transform",rotate(-20deg));
        }

    }
    $(".next").on("click",function(){
        if(curSong==4){
            curSong=1;
        }else{
            curSong++;
        }
        console.log("开始切换");
        switchSong(curSong);
    });
    $(".oneplay").on("click",function(){

    });
    $(".refresh").on("click",function(){
        $("#audio")[0].currentTime=0;
        playAudio();
    });
    var isShow=false;
    $(".south").on("click",function(){
        if(!isShow){
            isShow=true;
            showSouth();
        }else{
            isShow=false;
            hideSouth();
        }

    });
    var isMute=false;
    $(".south").on("dblclick",function(){
        if(!isMute){
            isMute=true;
            $(".southValue").css("height",100+"px");
            $("#audio")[0].volume=0;
            $(".south").css("color","red");
        }else{
            isMute=false;
            $(".southValue").css("height",70+"px");
            $("#audio")[0].volume=0.3;
            $(".south").css("color","#fff");
        }


    });

    $(".one").on("click",function(){
        changeBox(1);
        switchSong(1);
    });
    $(".two").on("click",function(){
        changeBox(2);
        switchSong(2);
    });
    $(".three").on("click",function(){
        changeBox(3);
        switchSong(3);
    });
    $(".four").on("click",function(){
        changeBox(4);
        switchSong(4);
    });

    //为总进度条添加点击事件，控制播放进度
    $(".total")[0].addEventListener("click",function(event){
        var currentWidth=event.offsetX;
        var totalWidth=parseInt($(".total").css("width"));
        var totalSecondsSum=parseInt($("#audio")[0].duration);
        $(".current").css("width",currentWidth);
        $("#audio")[0].currentTime=parseInt(currentWidth*totalSecondsSum/totalWidth);

    },false);


    //设置音量
    function setVolumn(event){
        $(".southValue").css("height",(event.offsetY)+"px");
        $("#audio")[0].volume=1-event.offsetY/100;
    }
    //显示音量条
    function showSouth(){
        $(".southProgress").css("display","block");
        $(".southValue").css("display","block");
        $(".southProgress")[0].addEventListener("mousedown",function(event){
            $(".southProgress")[0].addEventListener("mousemove",setVolumn,false);
        },false);

        $(".southProgress")[0].addEventListener("mouseup",function(event){
            $(".southProgress")[0].removeEventListener("mousemove",setVolumn,false);
        },false);


    }
    //隐藏音量条
    function hideSouth(){
        $(".southProgress").css("display","none");
        $(".southValue").css("display","none");
    }
    //切换音乐列表
    function changeBox(curSong){
        switch(curSong){
            case 1:
                $(".one").css("opacity",0.5);
                $(".two").css("opacity",1);
                $(".three").css("opacity",1);
                $(".four").css("opacity",1);
                break;
            case 2:
                $(".one").css("opacity",1);
                $(".two").css("opacity",0.5);
                $(".three").css("opacity",1);
                $(".four").css("opacity",1);
                break;

            case 3:
                $(".one").css("opacity",1);
                $(".two").css("opacity",1);
                $(".three").css("opacity",0.5);
                $(".four").css("opacity",1);
                break;

            case 4:
                $(".one").css("opacity",1);
                $(".two").css("opacity",1);
                $(".three").css("opacity",1);
                $(".four").css("opacity",0.5);
                break;
        }
    }
    //切换歌曲
    function switchSong(curSong){
        switch(curSong){
            case 1:
                $(".songname").text("丑八怪");
                $("#audio").prop("src","music/choubaguai.mp3");
                resetProgressPlay();
                playAudio();
                break;
            case 2:;
                $(".songname").text("绅士");
                $("#audio").prop("src","music/shenshi.mp3");
                resetProgressPlay();
                playAudio();
                break;
            case 3:
                $(".songname").text("一半");
                $("#audio").prop("src","music/yiban.mp3");
                resetProgressPlay();
                playAudio();
                break;
            case 4:
                $(".songname").text("认真的学");
                $("#audio").prop("src","music/xue.mp3");
                resetProgressPlay();
                playAudio();
                break;
        }
    }

    //对播放进度进行监听，并且自动改变进度条的位置
    function changeProgressTime(){
        $("#audio")[0].addEventListener("timeupdate",function(){
            console.log(11111);
            //获取当前时间进度
            var currentMinute=parseInt($("#audio")[0].currentTime/60);
            var currentSeconds=parseInt($("#audio")[0].currentTime%60);
            $(".currentTime").text(currentMinute+":"+currentSeconds);
            //获取总时间进度
            var totalSecondsSum=parseInt($("#audio")[0].duration);
            var currentSecondsSum=parseInt($("#audio")[0].currentTime);
            var perWidth=parseInt($(".total").css("width"))/totalSecondsSum;
            $(".current").css("width",currentSecondsSum*perWidth);
            if($("#audio")[0].currentTime==$("#audio")[0].duration){
               switchSong(1);
            }

        });
    }

    //重置进度条
    function resetProgressPlay(){
        $(".current").css("width",0);
    }
    //播放音乐
    function playAudio(){
        //必须在音频加载完成之后，即canplay方法执行之后，才可以获取到duration
        $("#audio")[0].load();//调用load方法触发音频的缓冲
        $("#audio").on("canplay",function(){
            $("#audio")[0].play();
            var totalMinute=parseInt($("#audio")[0].duration/60);
            var totalSeconds=parseInt($("#audio")[0].duration%60);
            $(".totalTime").text(totalMinute+":"+totalSeconds);
            changeProgressTime();
        });

    }



}