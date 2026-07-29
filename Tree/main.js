var playing = false;
var style = "color: white; font-style: bold; background-color: black; font-size: 24px;"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function man() {
    console.log(
        "%c * (Well, there's a man here.) ",
                style,
    );
    await sleep(5000);

    console.log(
        "%c * (He offered you something.) ",
                style,
    );
    await sleep(5000);
    console.log(
        "%c * (...) ",
                style,
    );
    await sleep(5000);
    console.log(
        "%c * (You received an Egg.) ",
                style,
    );
    document.cookie = "egg=true; max-age=" + (365 * 24 * 60 * 60) + "; path=/; SameSite=Lax; Secure";

}

$(document).ready(function(){
    var audio = $("#bgm")[0];
    $("#tree").click(function(){
        if (!playing) {
            man();
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

            // Goodbye o/
            setTimeout(function() {
                window.location.href = "https://www.lanausse.com";
            }, 60000);
        }
    });
});
