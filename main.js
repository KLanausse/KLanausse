var playing = false;
const randomText = [
    "Hi! /␣/",
    "(pronounced la-now-sey)",
    "I should compose more often.",
    "I should program more often.",
    "Say hi to <a href=\"https://bsky.app/profile/dubzz.bsky.social\">Dubzz</a> for me!",
    "Say hi to <a href=\"https://x.com/Linguini_real\">Linguini</a> for me!",

    "I love reseaching music composers :P",
];

$(document).ready(function(){
    let random = Math.floor(Math.random() * randomText.length);
    $("#blurb").html(randomText[random]);


    $("html").click(function(){
        if (!playing) {
            playing = true
            $("#bgm")[0].play();
        }
    });

});
