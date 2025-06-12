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
                    <button onclick ="AbrirModalEditar('${integrante.id}', '${integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
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


//FUNCION PARA BORRAR REGISTROS
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?")

    //VALIDACION TRUE O FALSE
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //RECARGAR TABLA
        ObtenerIntegrantes();
    }
}


/*Proceso para editar un registro */
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar")

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});


function AbrirModalEditar(id,nombre,apellido,correo){
    //SE AGREGAN LOS VALORES DEL REGISTRO EN LOS INPUT
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtEditarNombre").value = nombre;
    document.getElementById("txtEditarApellido").value = apellido;
    document.getElementById("txtEditarEmail").value = correo;

    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //EVITA QUE EL FORMULARIO SE ENVIE

    //CAPTURAMOS LOS VALORES DE LOS INPUT
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtEditarNombre").value.trim();
    const apellido = document.getElementById("txtEditarApellido").value.trim();
    const correo = document.getElementById("txtEditarEmail").value.trim();

    //VALIDACION DE LAS CONSTANTES
    if(!id || !nombre || !apellido || !correo){
        alert("Complete todos los campos")
        return;
    }

    //LLAMADA A LA API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({correo,nombre,apellido})
    });

    if(respuesta.ok){
        alert("El registro fue actualizado correctamente")
        modalEditar.close();
        ObtenerIntegrantes();
    }
    else{
        alert("El registro no pudo ser actualizado")
    }
});