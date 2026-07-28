var playing = false;

$(document).ready(function(){
    $("#tree").click(function(){
        if (!playing) {
            playing = true
            $("#bgm")[0].play();
        }
    });
});
