// declaración de variables
const countriesContainer = document.getElementById('countries-container');
const selectRegion = document.getElementById('select-region');
const query = document.querySelector('#query');
const baseURL = 'https://restcountries.com/v3.1';
let arrayCountries = [];

const darkLightMode = document.querySelector('.header__darkMode');
const moon = document.querySelector('imgMoon');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const searchImg = document.querySelector('.search__img');
const filter = document.querySelector('.filter');
const comboBox = document.querySelector('#select-region');

// declaración de funciones
const printCountries = (countries) => {

    countries.forEach(country => {

        const newNode = document.createElement('article'); // <article></article>
        newNode.classList.add('card'); // <article class="card"></article>
        newNode.innerHTML = `
        
                <div class="card__img">
                    <img src="${country.flags.png}" alt="">
                </div>

                <div class="card__description">
                 <a class="h2Href" href="./detailPage.html#${country.name.common}">
                    <h2>${country.name.common}</h2>
                 </a>
                    <span>Population: ${country.population}</span> 
                    <span>Region: ${country.region} </span> 
                    <span>Capital: ${country.capital} </span>
                </div>

        `; // <article> <h3> Argentina </h3> </article>
        countriesContainer.appendChild(newNode);
    });

}

const removeCountries = () => {
    while(countriesContainer.lastChild){ //Mientras el array tenga un hijo, tira true. Sino false.
        countriesContainer.removeChild(countriesContainer.lastChild);
    }
}

const getCountriesByRegion = async (region) => {
    try {
        let response;
        if(region === 'all'){
            response = await fetch(`${baseURL}/all`)
        } else{
            response = await fetch(`${baseURL}/region/${region}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}




// declaración de eventos
selectRegion.addEventListener('change', async (e)=>{
    console.log(e.target.value);
    removeCountries();
    arrayCountries = await getCountriesByRegion(e.target.value);
    printCountries(arrayCountries)
});

query.addEventListener('input', async (e)=>{
    console.log(e.target.value);
    removeCountries();
    const result = arrayCountries.filter( country => country.name.common.toLowerCase().includes(e.target.value.trim()) )
    //Filtramos de todos los paises, los que vayamos escribiendo.
    printCountries(result)
})


//Tema oscuro y claro

darkLightMode.addEventListener("click", () => {
    
    header.classList.toggle("lightMode");
    main.classList.toggle("lightMode");
    searchImg.classList.toggle("lightMode");
    query.classList.toggle("lightMode");
    comboBox.classList.toggle("lightMode");
    filter.classList.toggle("lightMode");
   

    // capturar todos los nodos que tengan como clase "card"
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.classList.toggle("lightMode");
    });
});



// ejecuciones inmediatas
fetch('https://restcountries.com/v3.1/all')
    .then(resp => resp.json()) //En caso de que se cumpla la promesa
    .then(data => {
        console.log(data);
        arrayCountries = data; // La data ya es el objeto literal parseado con todos los paises.
        //IMPORTANTE: Tenemos que asegurarnos que la promesa se haya cumplido. 
        //Recien en esta instancia está cumplida la promesa
        printCountries(arrayCountries);


    }) // recibo la promesa resuleta de convertir resp a objeto literal
    .catch(error => console.error(error)) //En caso de que no se cumpla
