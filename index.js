const newYear='1 Jan 2022'
const dayEl=document.querySelector('#days')
const hourEl=document.querySelector('#hours')
const minEl=document.querySelector('#mins')
const secondsEl=document.querySelector('#seconds')
function countdown(){
    const newDate=new Date(newYear)
    const currentDate=new Date()
    
   const totalseconds=Math.floor((newDate-currentDate)/1000)
   const days=Math.floor(totalseconds/3600/24)
   const hours=Math.floor(totalseconds/3600)%24
   const minutes=Math.floor(totalseconds/60)%60
   const seconds=Math.floor(totalseconds)%60

   dayEl.innerText=formatTime(days)
   hourEl.innerText=formatTime(hours)
   minEl.innerText=formatTime(minutes)
   secondsEl.innerText=formatTime(seconds)

}
function formatTime(time){
    return time <10 ? `0${time}` : time
}


//initial call
countdown()
setInterval(countdown,1000);
