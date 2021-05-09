const form = document.querySelector('#searchForm');
const inputValue = document.querySelector('#inputvalue');
const cardContainer = document.querySelector('#cardContainer')
const idShow = document.querySelector('#idShow')

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchValue = form.elements.query.value;  
    const url = `http://api.tvmaze.com/search/shows?q=${searchValue}`
    const response = await axios.get(url)
    
    movieData(response.data)
})


const movieData =  (shows) => {
   console.log(shows)
    while (cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild)
    }

    for (movie of shows){  

       let idShow = movie.show.id

        const div1 = document.createElement('div')
        div1.classList.add('col', 'col-sm-auto', 'col-md-auto', 'col-lg-auto','mb-4')

        const div2 = document.createElement('div')
        div2.classList.add('card')
        div2.setAttribute('style', 'width: 13rem')

        const img = document.createElement('img')
        //img.setAttribute('style', 'width= 65%')
        if(movie.show.image === null){            
            img.classList.add('card-img-top')
            img.src = "tvm-header-logo.png"
        } else {           
        img.classList.add('card-img-top')
        img.src = movie.show.image.medium;
        }        

        const div3 = document.createElement('div')
        div3.classList.add('card-body')

        const title = document.createElement('h5')
        title.classList.add('card-title','titulo')
        title.textContent = movie.show.name
        //title.setAttribute('href', 'show.html/' + movie.show.id)
        title.setAttribute('style', 'text-align: center')
        
        const linkTitle = document.createElement('a')
        //linkTitle.innerHTML = title.textContent
        linkTitle.setAttribute('id', 'idShow')
        linkTitle.setAttribute ('href', 'show.html')
        linkTitle.setAttribute ('style', 'color: black')
        linkTitle.onclick = function() {getidShow(idShow)};

        const argument = document.createElement('p')
        argument.classList.add( 'card-text', 'scroll' )
        argument.innerHTML = movie.show.summary
       // argument.setAttribute()

        //div0.appendChild(div1)
        div1.appendChild(div2)
        div2.appendChild(img)
        div2.appendChild(div3)
        div3.appendChild(linkTitle)
        linkTitle.appendChild(title)
        div3.appendChild(argument)

        cardContainer.appendChild(div1)

       // console.log(movie.show)
       // console.log(idShow)
    }
}

 function getidShow (idShow){   
         
        /*const url = 'http://api.tvmaze.com/shows/'+idShow
        const response = await axios.get(url)
        console.log(response.data)*/
        localStorage.setItem('idShow', idShow )
        console.log(idShow ) 
        return idShow

}







