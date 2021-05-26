const data=[
    {
        question:'how is the weather?',
        a:'cold',
        b:'hot',
        c:'mild',
        d:'humid',
        correct:'c'
    },
    {
        question:'most used programming language in 2019?',
        a:'java',
        b:'javascript',
        c:'C',
        d:'python',
        correct:'a'
    },
    {
        question:'president of India?',
        a:'ramnath kovind',
        b:'narendra modi',
        c:'yogi',
        d:'rahul',
        correct:'a'
    },
    {
        question:'HTML full form',
        a:'hyper text mocking language',
        b:'hyper text marking language',
        c:'hyper text markup language',
        d:'hyper text mongo language',
        correct:'c'


    },

];

const quiz=document.querySelector('.quiz')
const question=document.getElementById('question')
const a_text=document.getElementById('a_text')
const b_text=document.getElementById('b_text')
const c_text=document.getElementById('c_text')
const d_text=document.getElementById('d_text')
const submit=document.getElementById('submit')
let currentQuestion=0;
let score=0;

loadQuiz();
function loadQuiz(){
    deselect()
    const currentQuizData=data[currentQuestion]
     
    question.innerText=currentQuizData.question;
    a_text.innerText=currentQuizData.a;
    b_text.innerText=currentQuizData.b;
    c_text.innerText=currentQuizData.c;
    d_text.innerText=currentQuizData.d;

    console.log(currentQuizData)
}

function getSelected(){
    const answerEl=document.querySelectorAll('.answer');
      let selectedAnswer;
    answerEl.forEach((answer)=>{
        if(answer.checked){
             selectedAnswer=answer.id;
        }
    })
return selectedAnswer
}

function deselect(){
    const answerEl=document.querySelectorAll('.answer');
    answerEl.forEach((answer)=>{
       answer.checked=false  
    })
}


submit.addEventListener('click',()=>{
    
    const asnwerSelected=getSelected();
    
    if(asnwerSelected){
        if(asnwerSelected===data[currentQuestion].correct){
           score++;
          
        }
            currentQuestion++;
            if(currentQuestion<data.length){
                
                loadQuiz()
        }else{
            //SHOW RESULT
           quiz.innerHTML=`<h2>You scored ${score} out of ${data.length}</h2>
           <button onClick="location.reload()">Reset Game</button>`
        }
    }


})

