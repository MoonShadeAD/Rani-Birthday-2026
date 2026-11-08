const state = {

    evidenceFound: 0,

    evidenceTotal: 4,

    achievements: [],

    recoveryComplete: false,

    culpritFound: false

};

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document
        .getElementById(id)
        .classList.add("active");
}

function typeWriter(
    element,
    text,
    speed = 45,
    callback = null
) {

    let i = 0;

    element.innerHTML = "";

    function type() {

        if (i < text.length) {

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(type, speed);

        } else {

            if (callback) callback();
        }
    }

    type();
}

const introText = `

Detective,

At approximately 00:00 hours,
a birthday surprise was stolen.

The suspect appears to have
left behind evidence.

Proceed with caution.

`;

typeWriter(
    document.getElementById(
        "introTypewriter"
    ),
    introText
);

document
.getElementById("openCaseBtn")
.addEventListener("click", () => {

    showScreen("boardScreen");

});

function unlockAchievement(name) {

    if (
        state.achievements.includes(name)
    ) return;

    state.achievements.push(name);

    const popup =
        document.getElementById(
            "achievementPopup"
        );

    document
        .getElementById(
            "achievementText"
        )
        .innerText = name;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    }, 3000);
}

const evidenceData = {

    memory1: `Witness Report #01: Subject kept smiling like an idiot until he fell asleep after receiving this selfie. This is the 2nd selfie the subject received that night when my dearest Rani explicitly confessed that she felt "something" as well.`,

    memory2: `Subject melted and kept smiling for hours on end after receiving this selfie. This is just so darn cute and adorably loveable... You're to blame for this... How can I not fall for someone so adorably cute and beautiful.`,

    memory3: `Subject fell head over heels (all over again) for this angelic Queen draped in her traditional pink mekhla-chador for Cultural Day`,

    memory4: `Relationship status: I don't know... Maybe more than friends, definitely less than lovers. Yet loyal only to each other. Cause: Inexplainable.`
};

document
.querySelectorAll(".polaroid")
.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const id = card.id;

            document
            .querySelector(
                ".viewerBody"
            )
            .innerText =
                evidenceData[id];

            if (
                !card.classList.contains(
                    "inspected"
                )
            ) {

                card.classList.add(
                    "inspected"
                );

                state.evidenceFound++;

                card.style.opacity = 0.8;
            }

            if (
                state.evidenceFound ===
                state.evidenceTotal
            ) {

                unlockAchievement(
                    "Evidence Expert"
                );

                document
                .getElementById(
                    "forensicsButton"
                )
                .style.display =
                "block";
            }
        }
    );

});

document
.getElementById("lamp")
.addEventListener("click", () => {

    unlockAchievement(
        "Bright Detective"
    );

    alert(
        "You look adorable when concentrating."
    );

});

document
.getElementById("coffeeCup")
.addEventListener("click", () => {

    unlockAchievement(
        "Professional Snooper"
    );

});

document
.getElementById(
    "forensicsButton"
)
.addEventListener(
    "click",
    () => {

        showScreen(
            "forensicsScreen"
        );

    }
);

const terminalLines = [

"> boot forensic suite",

"> loading modules",

"> scan evidence",

"4 memory fragments recovered",

"> decrypt hidden archive",

"birthday_surprise.enc",

"> decrypting",

"success",

"> opening suspect.dat",

"PRIMARY SUSPECT: Apka \"Jodu ka Gulam\"",

"Message from suspect.dat: \"I know you're snooping around. You won't find anything. Give up now.\"",

"","","Message from suspect.dat: \"তুমি মোৰ হৃদয়ৰ সেই গান, যাৰ সুৰ কেতিয়াও শেষ নহয়। ❤\"",
"Message from suspect.dat: \"Same as Always... Detective Rani ❤\""//,
// "Message from suspect.dat: 😘😘😘"

];

function runRecovery() {

    const terminal =
        document.getElementById(
            "terminalOutput"
        );

    terminal.innerHTML = "";

    let line = 0;

    const interval =
        setInterval(() => {

        terminal.innerHTML +=

        terminalLines[line] +
        "<br>";

        line++;

        terminal.scrollTop =
        terminal.scrollHeight;

        if (
            line >=
            terminalLines.length
        ) {

            clearInterval(interval);

            state.recoveryComplete =
                true;

            document
            .getElementById(
                "suspectBoardBtn"
            )
            .style.display =
            "block";
        }

    }, 1000);
}

document
.getElementById(
    "runRecoveryBtn"
)
.addEventListener(
    "click",
    runRecovery
);

document
.getElementById(
    "suspectBoardBtn"
)
.addEventListener(
    "click",
    () => {

        showScreen(
            "suspectScreen"
        );

    }
);

document
.querySelectorAll(
    ".suspectCard"
)
.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            if (
                card.classList.contains(
                    "culprit"
                )
            ) {

                unlockAchievement(
                    "Case Closed"
                );

                showScreen(
                    "revealScreen"
                );

            } else {

                alert(
                    "Evidence insufficient."
                );

            }

        }
    );

});

document.getElementById("openEvidence").addEventListener("click",() => {showScreen("letterScreen");});
document.getElementById("heart").scrollIntoView({ behavior: "instant" });

function thunder() {

    const flash =
    document.getElementById(
        "thunderFlash"
    );
    document.getElementByID("thunderAudio").play();

    flash.animate(
    [
        {
            opacity:0
        },
        {
            opacity:.15
        },
        {
            opacity:.05
        },
        {
            opacity:.25
        },
        {
            opacity:0
        }
    ],
    {
        duration:700
    });

}

for(let i=0;i<50;i++){

    const p =
    document.createElement("div");

    p.className="dust";

    p.style.left=
    Math.random()*100+"vw";

    p.style.animationDelay=
    Math.random()*10+"s";

    document.body.appendChild(p);

}

setInterval(() => {

    thunder();

}, 15000 + Math.random()*15000);

const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

function resizeRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeRain();
window.addEventListener("resize", resizeRain);

const drops = [];

for(let i = 0; i < 500; i++) {

    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 10 + Math.random() * 20,
        speed: 8 + Math.random() * 12
    });

}
function animateRain() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "rgba(180,200,255,0.25)";
    ctx.lineWidth = 1;

    drops.forEach(drop => {

        ctx.beginPath();

        ctx.moveTo(drop.x, drop.y);

        ctx.lineTo(
            drop.x - 3,
            drop.y + drop.length
        );

        ctx.stroke();

        drop.y += drop.speed;

        if(drop.y > canvas.height) {

            drop.y = -20;
            drop.x = Math.random() * canvas.width;

        }

    });

    requestAnimationFrame(
        animateRain
    );
}

animateRain();

window.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "rainAudio"
        )
        .play();
        document
        .getElementById(
            "detective"
        )
        .play();
    },
    { once: true }
);

detective.volume = 0.35;

let secret = [];

const code = [

"ArrowUp",
"ArrowUp",

"ArrowDown",
"ArrowDown",

"ArrowLeft",
"ArrowRight",

"ArrowLeft",
"ArrowRight",

"b",
"a"
];

document
.addEventListener(
    "keydown",
    e => {

        secret.push(e.key);

        secret =
        secret.slice(
            -code.length
        );

        if (
            JSON.stringify(secret)
            ===
            JSON.stringify(code)
        ) {

            unlockAchievement(
                "Master Detective"
            );

        }
    }
);

rainAudio.volume = 0.15;

function lightning() {

    const bolt =
        document.getElementById(
            "lightning"
        );

    bolt.animate(
        [
            { opacity: 0 },
            { opacity: .15 },
            { opacity: .05 },
            { opacity: .3 },
            { opacity: 0 }
        ],
        {
            duration: 700
        }
    );

    if (
        thunderAudio &&
        Math.random() > .3
    ) {

        thunderAudio.currentTime = 0;

        thunderAudio.volume =
            0.25;

        thunderAudio.play();
    }
}

function scheduleLightning() {

    lightning();

    setTimeout(
        scheduleLightning,

        8000 +
        Math.random() * 12000
    );
}

scheduleLightning();