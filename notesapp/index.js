const notesEl=document.querySelector('.notes')

const addBtn=document.getElementById('add');

const notes=JSON.parse(localStorage.getItem('ntoes'))

if(notes){
    notes.forEach(note=>{
        addNewNote(note)

    })
}

addBtn.addEventListener('click',()=>{
    addNewNote()
})
function addNewNote(text=''){
    // if(text.length>0){

        const note=document.createElement('div')
        note.classList.add('note')
        
        note.innerHTML=`<div class="notes">
        <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="del"><i class="fas fa-trash"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}" >
        
        </div>
        <textarea class=" ${text ? '' : 'hidden'}"></textarea>
        </div>
        `;
        
        const delBtn=note.querySelector('.del')
        const editBtn=note.querySelector('.edit')
        const main=note.querySelector('.main');
        const textarea=note.querySelector("textarea")
        
        textarea.value=text
        main.innerHTML=marked(text)
        
        editBtn.addEventListener('click',()=>{
            main.classList.toggle('hidden')
            textarea.classList.toggle('hidden')
        })
        
        delBtn.addEventListener('click',()=>{
            note.remove()
            updateLs()
        })
        
        textarea.addEventListener('input',(e)=>{
            const {value}=e.target;
            main.innerHTML=marked(value)
            
            updateLs()
        })
        
        
        document.body.appendChild(note);
    }


function updateLs(){
    const notesText=document.querySelectorAll('textarea');
    const notes=[];
    notesText.forEach(note=>{
        notes.push(note.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes))

}










