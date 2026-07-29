var playing = false;

$(document).ready(function(){
    var audio = $("#bgm")[0];
    $("#tree").click(function(){
        if (!playing) {
            playing = true
            audio.play();
            audio.volume = 0
            let fadeIn = setInterval(() => {
                if (audio.volume < 0.2) {
                    audio.volume += 0.001;
                } else {
                    audio.volume = 0.2;
                    clearInterval(fadeIn);
                }
            }, 500);

            console.log(
                "%c * (He is behind the tree.) ",
                "color: white; font-style: bold; background-color: black; font-size: 24px;",
            );

            // Goodbye o/
            setTimeout(function() {
                window.location.href = "https://www.lanausse.com";
            }, 60000);
        }
    });
});
