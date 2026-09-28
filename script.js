const $=s=>document.querySelector(s);
window.addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),450));

// Birthday countdown in India time (Asia/Kolkata).
// On September 28 itself, the countdown stays at 00:00:00:00.
// On other days, it counts toward the next September 28 at midnight.
function indiaNow(){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(new Date());
  const o={}; for(const p of parts) o[p.type]=p.value;
  return {year:+o.year,month:+o.month,day:+o.day,hour:+o.hour,minute:+o.minute,second:+o.second};
}
function updateCountdown(){
  const n=indiaNow();
  if(n.month===9 && n.day===28){
    ["days","hours","minutes","seconds"].forEach(id=>$("#"+id).textContent="00");
    $("#countStatus").textContent="Happy Birthday, Sungjem! ♡";
    return;
  }
  const nowUtc=Date.now();
  const targetYear=n.month>9 || (n.month===9 && n.day>28) ? n.year+1 : n.year;
  // Midnight India = 18:30 UTC on previous calendar day.
  const targetUtc=Date.UTC(targetYear,8,27,18,30,0);
  let diff=Math.max(0,targetUtc-nowUtc);
  const days=Math.floor(diff/86400000); diff%=86400000;
  const hours=Math.floor(diff/3600000); diff%=3600000;
  const minutes=Math.floor(diff/60000); const seconds=Math.floor(diff/1000)%60;
  $("#days").textContent=String(days).padStart(2,"0");
  $("#hours").textContent=String(hours).padStart(2,"0");
  $("#minutes").textContent=String(minutes).padStart(2,"0");
  $("#seconds").textContent=String(seconds).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

// Reveal animations.
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));

// Stars.
const canvas=$("#stars"),ctx=canvas.getContext("2d");let W,H,stars=[];
function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";stars=Array.from({length:Math.min(90,Math.floor(innerWidth/12))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.3,v:Math.random()*.12+.03,a:Math.random()}))}
function draw(){ctx.clearRect(0,0,W,H);for(const s of stars){s.y-=s.v*devicePixelRatio;if(s.y<0)s.y=H;ctx.globalAlpha=.15+s.a*.45;ctx.fillStyle="#ffd8e7";ctx.beginPath();ctx.arc(s.x,s.y,s.r*devicePixelRatio,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();

// Letter modal.
const letter=`Ajung,

Happy Birthday. ♡

I'm really glad we got this chance to be together. Even if it's only for a short while, I'm happy that I get to share this little chapter with you.

I don't need to make this into some huge dramatic love story. I just want to enjoy the time we have, laugh with you, talk with you, and make a few memories that we'll both be happy to remember.

You deserve a birthday full of happiness, good health, peace, and all the little things that make you smile.

So here's to you, Sungjem — and to whatever beautiful moments this chapter still has waiting for us.

Happy Birthday, Ajung. ♡`;

let typing;
function openLetter(){ $("#modal").hidden=false; document.body.style.overflow="hidden"; const t=$("#typed");t.textContent="";let i=0;clearInterval(typing);typing=setInterval(()=>{t.textContent+=letter[i++]||"";if(i>=letter.length)clearInterval(typing)},24)}
function closeLetter(){clearInterval(typing);$("#modal").hidden=true;document.body.style.overflow=""}
$("#openLetter").onclick=openLetter;$("#closeModal").onclick=closeLetter;$("#closeBackdrop").onclick=closeLetter;document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modal").hidden)closeLetter()});

// Bundled audio. Mobile browsers require a user gesture; the Music button provides it.
const audio=new Audio("audio/birthday-piano.mp3");
audio.loop=true;audio.volume=.38;
$("#musicBtn").onclick=async()=>{
  try{
    if(audio.paused){await audio.play();$("#musicBtn").classList.add("playing");$("#musicLabel").textContent="Pause Music"}
    else{audio.pause();$("#musicBtn").classList.remove("playing");$("#musicLabel").textContent="Play Music"}
  }catch(err){$("#musicLabel").textContent="Tap to Play";toast("Tap the Music button once more to start the song ♡")}
};

// Small celebration.
$("#celebrate").onclick=()=>{
  $("#toast").textContent="For Sungjem — a little extra sparkle. ✨";$("#toast").classList.add("show");
  setTimeout(()=>$("#toast").classList.remove("show"),2600);
};
