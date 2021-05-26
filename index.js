const year='1 Jan 2022';

const daysel=document.getElementById("days")
const hoursel=document.getElementById("hours")
const minsel=document.getElementById("mins")
const secsel=document.getElementById("secs")

function countdown(){
    const newYearsDate=new Date(year);
    const currentDate=new Date();

    const totalseconds=(newYearsDate-currentDate)/1000;
    const days=Math.floor(totalseconds/3600/24);
    const hours=Math.floor(totalseconds/3600)%24;
    const mins=Math.floor(totalseconds/60) %60;
    const seconds=Math.floor(totalseconds%60)

    daysel.innerHTML=days;
    hoursel.innerHTML=formatTime(hours);
    minsel.innerHTML=formatTime(mins);
    secsel.innerHTML=formatTime(seconds);

   
    
    console.log(days,hours,mins,seconds)
}

function formatTime(time){
    return time<10 ? (`0${time}`) : time;
}

countdown();


setInterval(countdown,1000);