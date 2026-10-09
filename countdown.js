const birthday = new Date("November 11, 2026 00:00:00").getTime();
const popup = document.getElementById("casePopup");
const rainAudio = document.getElementById("rainAudio");
const cooldownAudio = document.getElementById("cooldownAudio");
const thunderAudio = document.getElementById("thunderAudio");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const terminal = document.getElementById("terminalMessage");

const terminalText = 
`> encrypted birthday file detected \n
> access denied \n
> release authorization pending \n
> countdown initiated`;

function typeWriter(element,text,speed = 35)
{
    let i = 0;
    async function type()
    {
        if (i < text.length)
        {
            if (text.charAt(i)=='>') await sleep(750)
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type,speed);
        }
    }
    type();
}
typeWriter(terminal,terminalText,100);

function updateCountdown()
{
    const now = new Date().getTime();
    const distance = birthday - now;

    if (distance <= 0)
    {
        clearInterval(countdownInterval);
        popup.style.display = "flex";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance %(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    const minutes = Math.floor((distance %(1000 * 60 * 60))/(1000 * 60));
    const seconds = Math.floor((distance %(1000 * 60))/1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown,1000);
updateCountdown();
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");
function resizeCanvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);
const drops = [];

for (let i = 0; i < 750; i++)
{
    drops.push({
        x:Math.random() * canvas.width,
        y:Math.random() *canvas.height,
        len: 10 + Math.random() * 20,
        speed: 10 + Math.random() * 12
    });
}

function drawRain()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "rgba(180,220,255,.18)";
    ctx.lineWidth = 0.8;

    drops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x,drop.y);
        ctx.lineTo(drop.x - 4,drop.y + drop.len);
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y >canvas.height)
        {
            drop.y = -50;
            drop.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawRain);
}
drawRain();

function lightning() {
    const bolt = document.getElementById("lightning");
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
    if (thunderAudio && Math.random() > .3)
    {
        thunderAudio.currentTime = 0;
        thunderAudio.volume = 0.55;
        thunderAudio.play();
    }
}

function scheduleLightning()
{
    lightning();
    setTimeout(scheduleLightning,8000 + Math.random() * 12000);
}
scheduleLightning();

function lampFlicker()
{
    document.body.classList.add("flicker");
    const spotlight = document.getElementById("spotlight");

    spotlight.animate(
        [
            { opacity: 1 },
            { opacity: .65 },
            { opacity: 1.15 },
            { opacity: .45 },
            { opacity: 1 }
        ],
        {
            duration: 250
        }
    );

    setTimeout(() => {document.body.classList.remove("flicker");}, 250);
    setTimeout(lampFlicker,15000 + Math.random() * 30000);
}
lampFlicker();

function startAtmosphere()
{
    if (!rainAudio) return;
    cooldownAudio.volume = 0.6;
    cooldownAudio.play().catch(() => {});
    rainAudio.volume = 0.15;
    rainAudio.play().catch(() => {});
}
document.body.addEventListener("click",startAtmosphere,{ once: true });