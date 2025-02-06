//se crea una función para llamar a la API 
// y obtener la información del personaje seleccionado

async function obtenerPersonaje(personaje) {
    
    try{
        //se crea una URL dinámica con el personaje ingresado
        const url=`https://dragonball-api.com/api/characters?name=${personaje.toLowerCase()}`;
        //con fetch se hace la petición a la API
        const respuesta = await fetch(url);
        //convierte la respuesta a formato JSON
        const datos = await respuesta.json();
       //comprobar si hay datos disponibles para el personaje
        if (datos && datos[0]){
            //si hay resultados toma el primer valor que es datos[0] y lo
            //envía a mostrarInfo
            const info = datos[0];
            mostrarInfoPersonaje(info);
        }else {
            //si no hay resultados da un error
            mostrarError("Personaje o encontrado o datos no disponibles.");
        }
    //MANEJO DE ERRORES-Muestra una serie de mensaje de erroes por fallo de conexión    
    }catch(error){
        console.error("Error al obtener datos de la API:",error)
        mostrarError("Hubo un error al cargar la información.");
    }

    }//fin función obtenerPersonaje

//Función para mostrar la información del personaje
//busca el DIV por ID para mostrar la información del personaje
function mostrarInfoPersonaje(info){
    const infoDiv=document.getElementById('personaje-info');
    //obtengo la imagen de la API
    const imagen= info.image || info.image_url ||  'https://blogger.googleusercontent.com/.powerpoint.jpg'; 
    //imagen por defecto en caso de error

    //muestra nombre, raza, clasificación, descripción, imagen
    infoDiv.innerHTML=`
    <img src="${imagen}" alt="${info.name}" style="width:300px;height:auto;" />
    <h2>${info.name}</h2><p><strong>Raza:</strong> ${info.race || 'Desconocida'}</p>
    <p><strong>Clasificación:</strong> ${info.affiliation || 'Desconocido'}</p>
    <p><strong>Descripción:</strong> ${info.description || 'No disponible'}</p>
    
    `;
}//fin función mostrarInfoPersonaje

//función para mostrar mensaje de error
function mostrarError(mensaje){
    const infoDiv=document.getElementById('personaje-info');
    infoDiv.innerHtml= `<p style="color:red;">${mensaje}</p>`;
}


//Escuchar Cambios en el combox
//Detecto la selección por ID personaje-select y llamo a la API a traves
//de la función obtenerPersonaje
document.getElementById('personaje-select').addEventListener('change',(event) =>{
    const personajeSeleccionado=event.target.value;
    if (personajeSeleccionado) { 
        obtenerPersonaje(personajeSeleccionado);
    }else {

        document.getElementById('personaje-info').innerHTML = ''; // Limpiar la sección si no se selecciona nada

    }
});

