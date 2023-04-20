
// Declaracion de Variables
const baseURL = 'https://restcountries.com/v3.1';
const param = window.location.hash.split('#')[1].toLowerCase();
console.log(param)

// Declaracion de Funciones
const getCountryByName = async (name) => {
    try {
        const response = await fetch(`${baseURL}/name/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const printCountry = (country) => {

    const countryHTML = `

    <section class="country">
            <div class="country__backToMenu">
                <div>
                    <img src="./assets/icons/arrow-left.png">
                </div>
                <span> <a href="./index.html">Back</a> </span>
            </div>
    
            <div class="country__flag">
                <img src="${country.flags.png}">
            </div>
        </section>

        <section class="description">
            <h1>${country.name.common}</h1>
            <div class="grid1">

                <p class="paddingP"> <strong>Native Name:</strong> ${country.name.common} </p>
                <p> <strong>Population:</strong> ${country.population} </p>
                <p> <strong>Region:</strong> ${country.region} </p>
                <p> <strong>Sub Region:</strong> ${country.subregion} </p>
                <p> <strong>Capital:</strong> ${country.capital} </p>

            </div>
            
            <div class="grid2">

                <p class="paddingP2"> <strong>Top Level Domain:</strong> .be </p>
                <p> <strong>Currencies:</strong> ${country.currencies} </p>
                <p> <strong>Languages:</strong> ${country.languages} </p>

            </div>

            <div class="grid3">

                <h4>Border Countries:</h4>
                <div class="border-countries">
                    <span>France</span>
                    <span>Germany</span>
                    <span>Netherlands</span>
                </div>

            </div>

            
        </section>
    `;

    document.querySelector('.main').innerHTML = countryHTML;

}


// Declaraciones de Eventos





// Ejecuciones Inmediatas

getCountryByName(param).then( data =>{ 
    console.log(data)
    printCountry(data[0])
})