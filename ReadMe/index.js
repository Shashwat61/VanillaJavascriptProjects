const voicesDropdown=document.querySelector('#voices')

const volValue=document.querySelector('.volume-value')

const rateValue=document.querySelector('.rate-value')
const options=document.querySelectorAll('[type="range"]')
const pitchValue=document.querySelector('.pitch-value')


const msg=new SpeechSynthesisUtterance();
let voices=[]




function populateVoices(){
 voices=this.getVoices()
 voicesDropdown.innerHTML=voices
 .map((item)=>`<option value="${item.name}">${item.name}(${item.lang}) </option>`).join('')
}

function setVoices(){
    msg.voice=voices.find(item=>item.name===this.value)

    toggle()
}

function toggle(start=true){
    speechSynthesis.cancel()
   
    if(start){
     speechSynthesis.speak(msg)
    }
        
}

function setOption(e){
   msg[this.name]=this.value
   document.querySelector(`.${this.name}-value`).innerHTML=this.value
   toggle()
}

document.querySelector('[name="text"]').addEventListener('change',(e)=>{
    msg.text=e.target.value
})
options.forEach(option=>option.addEventListener('change',setOption))
speechSynthesis.addEventListener('voiceschanged',populateVoices)
voicesDropdown.addEventListener('change',setVoices)
document.querySelector('#start').addEventListener('click',toggle)
document.querySelector('#cancel').addEventListener('click',()=>toggle(false))

document.querySelector('#pause').addEventListener('click',()=>{
   window.speechSynthesis.pause()
})
document.querySelector('#resume').addEventListener('click',()=>{
   window.speechSynthesis.resume()
})




