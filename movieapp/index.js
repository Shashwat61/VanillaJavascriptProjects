const API_KEY="04c35731a5ee918f014970082a0088b1"
const API=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
const IMAGEPATH='https://image.tmdb.org/t/p/w1280'
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const form=document.getElementById('form')
const input=document.getElementById('input')
const resultcontainer=document.getElementById('results')
const container=document.getElementById('container')

let dataArray=[];
async function getMovies(url){
    const data=await fetch(url);
    const fetchedData=await data.json();

    dataArray.push([...fetchedData.results]) 
    showResults(fetchedData.results)
   
    // console.log(fetchedData)
    // console.log(dataArray)
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

//show card and match the value of the selected movie
function ReceiveValue(text,movies){
 
    const test=movies.filter((movie)=>text==movie.title)
     console.log(test)
    
     test.forEach((item)=>{
        const {title,poster_path,popularity,id,overview}=item
        const main=document.createElement('div')
        main.classList.add('card');

        main.innerHTML=
        `
        <div class="card__image">
          <img src=" ${poster_path!==null && IMAGEPATH + poster_path}" alt="">
      </div>
      <div class="card__movie--details">
      <div class="movie__name">
              <h3>${title}</h3>
          </div>

          <div class="card__buttons">
              <div class="card__buttons--feature">
                  <img src="icons/play.svg" alt="">
                  <img src="icons/plus.svg" alt="">
                  <img src="icons/thumbsup.svg" alt="">
                  <img src="icons/thumbsdown.svg" alt="">
                </div>
                <div class="card__buttons--overview">
                    <img src="icons/down.svg" alt="">
                </div>
            </div>
                <div class="card__movie--popularity">
                    <span>${popularity}</span>
                    <span>18</span>
                    <span>1h 42m</span>
                </div>
               
                    <ul class="card__movie--genre">
                        <li>Witty</li>
                        <li>Irreverent</li>
                        <li>Dark Comedy</li>
                    </ul>

               
        </div>
        
        `
      container.appendChild(main)

     })

// let movieValue=this.innerText;

// console.log(movieValue)




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






