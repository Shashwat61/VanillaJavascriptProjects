const API_KEY="04c35731a5ee918f014970082a0088b1"
const API=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
const IMAGEPATH='https://image.tmdb.org/t/p/w1280'
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const form=document.getElementById('form')
const input=document.getElementById('input')
const resultcontainer=document.getElementById('results')
const container=document.getElementById('container')


let movieid;
const API_DATA=`https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}&language=en-US`
let dataArray=[];
async function getMovies(url){
    const data=await fetch(url);
    const fetchedData=await data.json();
    showResults(fetchedData.results) 
}


// show movie results
function showResults(movies){
    console.log(movies)
       movies.forEach(movie=>{
           const {title}=movie
           
           
           const movieEl=document.createElement('div');
           movieEl.classList.add('select__movie')
          
           
           movieEl.innerHTML=`${title}`
           
           resultcontainer.appendChild(movieEl)
           console.log(movieEl)
           movieEl.addEventListener('click',(e)=>{
             ReceiveValue(e.target.innerText,movies)
             resultcontainer.innerHTML=''
             
            })
            
        })
        container.innerHTML=""

}

// match the value of the selected movie
function ReceiveValue(text,movies){
 
    const test=movies.filter((movie)=>text==movie.title)
     console.log(test)
    
     test.forEach((item)=>{
        const {id}=item
       
        getData(id)

     })

}

//get id,genre of selected movie  and show card
async function getData(id){
    movieid=id
    const data=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    const resp=await data.json();
    console.log(resp)
    dataArray.push(resp)
    console.log(dataArray)
    dataArray.forEach((item)=>{
        const {title,poster_path,popularity,id,overview,vote_average,adult,runtime,genres}=item
        console.log(title,poster_path,runtime,genres)
  
        const {0:{name:name1},  1:{name:name2}}=genres
         
        
        console.log(name1,name2)

        
        const main=document.createElement('div')
        main.classList.add('card');

        main.innerHTML=
        `
        <div class="card__image">
          <img src=" ${poster_path!==null ? IMAGEPATH + poster_path : 'data:image/png;base64,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'}" alt="">
          <div id="overview" class="card__movie--overview">
           ${overview}
          </div>    
           </div>
      <div class="card__movie--details">
      <div class="movie__name">
              <h3>${title}</h3>
              <span>${vote_average}</span>
          </div>

          <div class="card__buttons">
              <div class="card__buttons--feature">
                  <img src="icons/play.svg" alt="">
                  <img src="icons/plus.svg" alt="">
                  <img src="icons/thumbsup.svg" alt="">
                  <img src="icons/thumbsdown.svg" alt="">
                </div>
                <div id="toggle" class="card__buttons--overview">
                    <img src="icons/down.svg" alt="">
                </div>
            </div>
                <div class="card__movie--popularity">
                    <span>${popularity}</span>
                    <span>${adult ? 'R' : 'G'}</span>
                    <span>${getRunTime(runtime)}</span>
                </div>
               
                    <ul class="card__movie--genre">
                      <li>${name1}</li>
                      <li>${name2}</li>
                       
                    </ul>
        </div>`

      container.appendChild(main)
      const toggle=document.getElementById('toggle')
      const overviewshow=document.getElementById('overview')
      //toggling overview
      toggle.addEventListener('click',()=>{
          overviewshow.classList.toggle('overview')
      })
    })
}

//movie run time
function getRunTime(minutes){
   const hours=Math.floor(minutes/60);
   const remainingmintues=Math.floor(minutes%60);
   return `${hours}h ${remainingmintues}m`
}

// getMovies(API)
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchItem=input.value
    console.log(searchItem)
    if(searchItem){
        getMovies(SEARCHAPI+searchItem)
    }
    input.value=""
})






