const objects = [
    "KEY",
]

const characters = [
    "ANNI",
    "BABA",
    "BADBAD",
    "FOFO",
    "IT",
    "JIJI",
    "KEKE",
    "ME",

    "PIKU",
    "NIKU",

    "NIKO",

    ...objects,
]

const modifiers = [
    "SHIFT",
    "OUTER",
    "YOU",
    "FELL",
    "SWAP",
    "WIN",

    ...characters,
]

const babaCharacters = [
    ...characters,
]

const specialNouns = [
    "TEXT",
    "EMPTY", //Absence
    "ALL",
    "GROUP",
    "LEVEL",
    "CURSOR",
    "IMAGE",
    "ERROR",
    "BLOSSOM",
    "EDGE",
]

const properties = [
    "Auto",
    "Right",
    "Up",
    "Left",
    "Down",
    "Red",
    "Blue",
    "Orange",
    "Yellow",
    "Lime",
    "Green",
    "Cyan",
    "Purple",
    "Pink",
    "Rosy",
    "Grey",
    "Black",
    "Silver",
    "White",
    "Brown",
    "Best",
    "Happy",
    "Sad",
    "Angry",
    "Wonder",
    "Party",
    "Pet",
    "Broken",
    "Chill",
    "Defeat",
    "Back",
    "Fall",
    "Nudge",
    "Turn",
    "Float",
    "Phantom",
    "Hide",
    "Hot",
    "Locked",
    "Melt",
    "More",
    "Move",
    "Reverse",
    "Open",
    "Shut",
    "Power",
    "Pull",
    "Push",
    "Safe",
    "Shift",
    "Sink",
    "Sleep",
    "Still",
    "Stop",
    "Swap",
    "Teleport",
    "Weak",
    "Win",
    "Word",
    "You",
    "You 2",
    "Bonus",
    "End",
    "Done",
    "Revert",
    "Select",
    "3D",
    "Boom",
    "Hold",
]

const aus = [
    "20X6",
    "Absence",
    "Absolute",
    "Aftergore",
    "Agri",
    "Alter",
    "Arrangement",
    "Bad Future",
    //"Better Than",
    //"Broken Masquerade",
    "REWRITTEN", //"Chapter Rewritten",
    //"Chapter Take",
    //"Coffee Shop",
    "Convert",
    "CORRUPTED", //"Corruption",
    "CREEPY",//"Creepypasta",
    "Daredevil",
    "Dark",
    "D-Sides",
    "DeadCode",
    "Disbelief",
    "Dream",
    "Dust",
    "Error",
    //"End of",
    "Fail",
    "Fanon",
    "Fell",
    "Fresh",
    "Good Future",
    "Halloween Hack",
    "HELP_",
    "Horror",
    "Ink",
    "Insanity",
    "Internal Plexus",
    "Last Breath",
    "LEGO",
    "Mashup",
    "Mix",
    "MOVIE",
    "Muppet",
    "Neo",
    "Ocean",
    "Old-Timey",
    "One Hell of a Ride",
    "OPENHEART",
    "Outer",
    "Post-Blank",
    "Project",
    "Puppet Pipeline",
    "RANDOM", //"Random Role",
    "Reassurance",
    "Replacement",
    "Replanted",
    "Royal",
    "Seasons",
    "Sixbones",
    "Shift / Spin",
    "Soft",
    "Spamton Hijack",
    "Star Wars",
    "Story Mode",
    "Swap",
    //"Takes Action",
    "Toggle",
    "Tom & Jerry",
    "Twist",
    "Underground",
    "Update",
    "Verse",
    "Weird Route",
    "Wonderland",
    "Wrong Turn",
    "Xerioux",
    "Yellow",  // TODO: RM DUPE
]

const existingWords = [
    ...characters,
    ...modifiers,
    "AND",
    "FOR",
    "IS",
    "ON",
    "HAS",

    "&",

    "TS!",
]

const backgrounds = [
    "SHIFT.png",
    "OUTER.png",
    "FRESH.png",
    "YOU.png",
    "FELL.png",
]

const widths = [
    43, 106, 172, 236, 300, 361, 426, 489, 554, 617, 682, 744, 810, 872, 935, 1000, 1062, 1127,
    1191, 1254, 1316, 1382, 1444, 1507, 1572, 1634, 1699, 1763, 1826, 1890, 1953
]

const letterToName = {
    ":": "COLON",
    " ": "SPACE",
    ">": "GREATERTHAN",
    "<": "LESSTHAN",
    "/": "SLASH",
    "\\": "BACKSLASH",
    "|": "BAR",
    "?": "QUESTIONMARK",
    "\"": "QUOTE",
    "*": "ASTERISK",
}

const numVariants = {
    "LESSTHAN": 2,
    "GREATERTHAN": 2,
    "SLASH": 2,
    "BACKSLASH": 2,
    "=": 2,
    "+": 2,
    "[": 2,
    "]": 2,
    "(": 2,
    ")": 2,
    "{": 2,
    "}": 2,
    "QUESTIONMARK": 2,
    "QUOTE": 2,
    "ASTERISK": 1,
    "&": 2,

    "0": 3,
    "1": 2,
    "2": 2,
    "3": 2,
    "4": 2,
    "5": 2,
    "6": 2,
    "7": 2,
    "8": 2,

    "A": 2,
    "B": 2,
    "D": 2,
    "E": 2,
    "F": 2,
    "G": 2,
    "H": 2,
    "I": 2,

    "K": 2,
    "L": 2,
    "N": 2,
    "O": 3,
    "P": 2,
    "Q": 3,

    "S": 2,
    "T": 2,
    "V": 2,
    "W": 2,
    "X": 2,

    "Z": 2
}

const kerning = {
    "/": [-5, -5],
    "-": [10,10],
    "I": [20, 20],
    ":": [5,5]
}

function resize() {
    $("#logo").css("width", "auto")
    var goal =  $("#logo").width();
    var candidates = widths.filter(function(width) {
        return width >= goal;
    });
    var closest = Math.min.apply(null, candidates);
    $("#logo").width(closest) //Math.ceil($("#logoShadow").width()/65)*65
}

function download() {
    document.documentElement.requestFullscreen().then(() => {
        console.log("Successfully entered fullscreen mode.");
    });

    $("html").css("transform", "scale(1) translateY(-15px)");

    /*
    setTimeout(() => {
        $("html").css("filter", "saturate(10) contrast(0) brightness(200%)");


        setTimeout(() => {
            $("html").css("filter", "saturate(1) contrast(1) brightness(100%)");

            setTimeout(() => {
                $("html").css("transform", "scale(0.8)");
            }, 1000);

        }, 100);


    }, 1500);
    */

}

function getCharacters() {
    return $("#onlyUsePremade").is(':checked') ? characters : babaCharacters;
}

function getModifiers() {
    return $("#onlyUsePremade").is(':checked') ? modifiers :
    [
        ...(true ? specialNouns : []),
        ...(true ? properties : []),
        ...(true ? aus : []),


        ...getCharacters(),
    ]
}

function createText(text) {
    return createImage(`imgs/TEXT/${text}.png`, text, "#logoShadow").attr("class", "text")
}

function createLetter(char, parent) {
    char = letterToName[char] ?? char
    const variant = Math.floor(Math.random()*(numVariants[char] ?? 1))+1;

    return createImage(`imgs/LETTERS/${char}${variant}.png`, char, parent).attr("class", "letter")
}

function createImage(url, alt, parent) {
    return $(`<img>`, {
        src: url,
        alt: alt,
    })
    .on("load", resize)
    .appendTo(parent)
    .each(function() {
        if (this.complete) {
            $(this).trigger('load');
        }
    });
}

function createCustomText(text, hue, parent) {
    text = text.toUpperCase();

    const group = createWordGroup("#logoShadow")
    .css("filter", `hue-rotate(${hue ?? Math.floor(Math.random() * 72)*5}deg)`);
    for (let i = 0; i < text.length; i++) {
        var letter = createLetter(text[i], group);

        // Kerning
        if (kerning[text[i]]) {
            letter.css("margin-left", kerning[text[i]][0] ?? 0);
            letter.css("margin-right", kerning[text[i]][1] ?? 0);
        }
        else letter.css("margin-left", Math.floor(Math.random() * 8)+3);
        letter.css("margin-bottom", Math.floor(Math.random() * 4));
    }
}

function createWordGroup(parent) {
    return $(`<div></div>`, {
        "class": "group"
    })
    .appendTo(parent)
}

function addModifier() {
    const modifier = getModifiers()[Math.floor(Math.random() * getModifiers().length)];
    updateLogo( ` AND ${modifier}`, false)
}

function updateLogo(text, clear = true) {
    if (text.toUpperCase()) {
        if (clear) $("#logoShadow").empty();
        const str = text.toUpperCase()
        str.split(" ").forEach((word) => {

            if (existingWords.includes(word)) createText(word);
            else createCustomText(word);

            createLetter(" ", "#logoShadow");
        });
    }

    // Remove trailing space
    $("#logoShadow").children().last().remove();
}

function generate() {
    $("#logoShadow").empty();
    if (Math.floor(Math.random() * 4) == 3) {
        createText("TS!").attr("id", "prefix")
    }

    var random = Math.floor(Math.random() * backgrounds.length);
    $("#main").css("background-image", `url(imgs/BGS/${backgrounds[random]})`);

    // LOGO
    const name = getCharacters()[Math.floor(Math.random() * getCharacters().length)];
    const modifier = getModifiers()[Math.floor(Math.random() * getModifiers().length)];
    updateLogo(`${name} IS ${modifier}`, false)
    console.log(name, modifier);

    for (var i = 1; i < $("#nodifierAmnt").val(); i++) addModifier();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        scale();
    }
});

$(document).ready(function(){
    $("#main").css("background-image", `url(imgs/BGS/YOU.png)`);
    updateLogo("BABA IS ")
    createCustomText("GENERATOR", 270)

    //generate();
    //addModifier();addModifier();addModifier();
});
