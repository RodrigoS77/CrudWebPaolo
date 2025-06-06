//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/3u9Ytp/integrantes";

//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrantes() {
    //Solicitar la respuesta de el servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta de el servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Enviamos el JSON  a la funcion
    MostrarDatos(data);
}

//Función para crear las filas de la tabla en base de JSON
//"datos" representara al JSON de donde viene la informacion
function MostrarDatos(datos){

    //Se llama a la tabla con el elemento "id" y luego por el tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para injectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla
    
    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();


//PROCESO PARA AGREGAR INTEGRANTE

const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar"); //BOTON PARA AGREGAR
const btnCerrar = document.getElementById("btnCerrar")

btnAgregar.addEventListener("click",()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//AGREGAR NUEVO INTEGRANTE

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a Sumbmit, evita que el formulario se envie de un solo.

    //CAPTURAMOS VALORES DEL FORMULARIO
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //VALIDACION BASICA
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente")
        return;
    }

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},  //TIPO DE DATO ENVIADO
        body: JSON.stringify({nombre,apellido,correo}) //DATOS ENVIADOS
    });

    //VERIFICAR SI LA API RESPONDE QUE LOS DATOS FUERON CREADOS CORRECTAMENTE
    if(respuesta.ok){
        alert("El registro fue agregado correctamente")

        //LIMPIAR EL FORMULARIO
        document.getElementById("frmAgregar").reset();

        //CERRAR EL MODAL
        modal.close();

        //RECARGAR LA TABLA
        ObtenerIntegrantes();
    }
});