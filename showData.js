

const idShowGet = localStorage.getItem ('idShow')
const tituloShow = document.querySelector('#tituloShow')
const caratula = document.querySelector('#caratula')
const argumento = document.querySelector('#argumento')
const plataforma = document.querySelector('#network')
const nacionalidad = document.querySelector('.flag-align')
const premiere = document.querySelector('#premiere')
const generos = document.querySelector('#generos')
const estado = document.querySelector('#estado')
const emision = document.querySelector('#emision')
const tipoShow = document.querySelector('#showTipo')
const creador = document.querySelector('#creador')
let episodios = document.querySelector('#episodiosT')
const webOficial = document.querySelector('#weboficial')
const votos = document.querySelector('#rating')

const urlShow = 'https://api.tvmaze.com/shows/'+ idShowGet
        //console.log(urlShow)
   
     const datosShow = axios.get(urlShow)
        .then(function(respuesta){
            showData(respuesta.data)
           //console.log('MOVIE:  ' + respuesta.data)
        })
        .catch(function(error){
            console.log(error)
        })

        const showData = (shows) => {

            tituloShow.textContent = shows.name;            
            caratula.src = shows.image.medium
            argumento.innerHTML = shows.summary

            nacionalidad.src = "//static.tvmaze.com/intvendor/flags/" + shows.network.country.code.toLowerCase() + ".png"

            premiere.innerHTML = shows.premiered

            plataforma.textContent = shows.network.name 

            estado.textContent = shows.status;

            tipoShow.textContent = shows.type

            emision.innerHTML = shows.schedule.days[0] +' at ' + shows.schedule.time

            for(gen of shows.genres){                
             let genero = document.createElement('span')
             genero.textContent = gen                
             generos.appendChild(genero)
            }

            if( shows.officialSite === null){
                webOficial.innerHTML = 'N/A'
            }else 
            {webOficial.href = shows.officialSite
            webOficial.innerHTML = 'www.'+shows.network.name+'.com'}

            votos.textContent = shows.rating.average
        }

        const urlShowExtraData = urlShow + '/crew' 
        //console.log(urlShowExtraData)
        const datosCrew = axios.get(urlShowExtraData)
            .then(function(res){
                //console.log(res.data)
                for(person of res.data){
                   if(person.type === 'Creator')
                   {
                       //console.log(person.person.name)
                    creador.href = person.person.url
                    creador.textContent = person.person.name}
                }
            })
            .catch((error) => {console.log(error)})

        const ursEpisodes = urlShow + '/episodes'
        const datosEpisodios = axios.get(ursEpisodes)
            .then(function(episodiosres){
                episodios.textContent = episodiosres.data.length + ' capítulos'
                console.log(episodiosres.data.length)
                
            })
            .catch((error) => {console.log(error)})