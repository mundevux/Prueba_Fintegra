
//Variales que almacenan los elementos del DOM
let output = document.getElementById('output')
document.getElementById('btn').addEventListener('click',predictName);
let name = document.getElementById('nameInput');
document.getElementById('nameInput').addEventListener('change',checkName)
let country = document.getElementById('countryInput');
document.getElementById('countryInput').addEventListener('change',checkCountry)



// funcion que se ejecuta al hacer click en el boton
async function predictName(e){

    e.preventDefault();

    //Obtengo el valor del input
    let name = nameInput.value;
    let country = countryInput.value;


    //Valido que el input no este vacio
    let names = name.split(',');
    let countries = country.split(',');

    //Condicion para ejecutar si hay mas de un nombre
    //y mas de un pais
    if (names.length <= 1){
        // Si el se reciben datos en el input de Nombre y Pais, busca en la API
        if (name != '' && country != '') {
            const response = await fetch(`https://api.agify.io?name=${name}&country_id=${country}`);
            const data = await response.json();
            output.innerHTML = `Hola ${data.name} 👋, ¿Tienes ${data.age} años?.`; 
        }
        //Si solo se recibe un nombre, solo busca el nombre la API
        else if (name != '' && country === '' ) {
            const response = await fetch(`https://api.agify.io?name=${name}`);
            const data = await response.json();
            output.innerHTML = `Hola ${data.name} 👋, ¿Tienes ${data.age} años?.`; 
        }
        //Si no escribe nada, muestra el mensaje de ingresar algun nombre
        else {
            output.innerHTML = 'Por favor ingresa almenos un nombre.'; 
        }
    }
    //Si hay mas de un nombre, busca cada uno en la API
    else if(names.length >= 2){
        //Bucle para repetir la busqueda de cada nombre
        for (let i = 0; i < names.length; i++) {
            if(names[i] != '' && countries[i] != ''){
                const response = await fetch(`https://api.agify.io?name=${names[i]}&country_id=${countries[i]}`);
                const data = await response.json();
                output.innerHTML += `Hola ${data.name} 👋, ¿Tienes ${data.age} años?.</br>`; 
            }
            else if(names[i] != '' && countries[i] === ''){
                const response = await fetch(`https://api.agify.io?name=${names[i]}`);
                const data = await response.json();
                output.innerHTML += `Hola ${data.name} 👋, ¿Tienes ${data.age} años?.</br>`; 
            }
            else{
                output.innerHTML += 'Por favor ingresa almenos un nombre.'; 
            }
        }
    }
    else {
        output.innerHTML = 'Por favor ingresa almenos un nombre.'; 
    }
}


function checkName(){
    let name = nameInput.value;
    if (name == '') {
        output.style.display = 'none'; 
    }
}
function checkCountry(){
    let country = countryInput.value;
    if (country == '') {
        output.style.display = 'none'; 
    }
}
