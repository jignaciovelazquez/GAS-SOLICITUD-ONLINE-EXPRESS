// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()





//Variables
const Fecha = new Date(Date.now());
let hoy = Fecha.getDate();
let mes = "0" + (Fecha.getMonth() + 1).toString();
let anio = Fecha.getFullYear();
let check = 0;
let generado = 0;


let FORMATO = "";
let COMENTARIO = "";




//Star
window.addEventListener('DOMContentLoaded', () => {
    //alert("Se cargo la pagina");
    //ModoInicio();

    OcultarSpinner();
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
})



//Eventos

document.getElementById("COMENTARIO").addEventListener("change", () => {
    let checks = document.querySelectorAll(".form-check-input");
    checks.forEach((e, index) => {
        if ((e.checked == true) && (index == 0)) {
            check = 1;
        }
        if ((e.checked == true) && (index == 1)) {
            document.getElementById("FECHA").value = `${anio}-${mes}-${hoy}`;
            check = 2;
        }
        if ((e.checked == true) && (index == 2)) {
            document.getElementById("FECHA").value = `${anio}-${mes}-${hoy}`;
            check = 3;
        }
    });
})



document.getElementById("FORMULARIO").addEventListener('submit', () => {

    let RESPUESTA = 0;

    DESPACHO = document.getElementById("DESPACHO").value;
    ID = document.getElementById("ID").value;
    NODO = document.getElementById("NODO").value;
    DIRECCION = document.getElementById("DIRECCION").value;
    DISENO = document.getElementById("DISENO").value;
    GESTION = document.getElementById("GESTION").value;
    CONTRATISTA = document.getElementById("CONTRATISTA").value;
    TECNICO = document.getElementById("TECNICO").value;
    FECHA = `${hoy}-${mes}-${anio}`;
    HORA1 = document.getElementById("HORA1").value;
    HORA2 = document.getElementById("HORA2").value;
    HORA = new Date().toLocaleString();
    OBS = document.getElementById("OBS").value;

    switch (check) {
        case 1:
            COMENTARIO = "Agendado"
            RESPUESTA = 0;
            break;
        case 2:
            COMENTARIO = "Tecnico en camino"
            RESPUESTA = 1;
            break;
        case 3:
            COMENTARIO = "Tecnico en sitio"
            RESPUESTA = 1;
            break;
    }

    OBS = `${COMENTARIO}\n ${OBS}`;

    if (validarCampos()) {
        alert("Debe completar todos los campos")
        return

    } else {


        OcultarBotonGenerar();
        MostrarSpinner();

        FORMATO = `Diseño: ${DISENO}\nTipo de Gestion: ${GESTION}\nContratista: ${CONTRATISTA}\nTecnico: ${TECNICO}\nID: ${ID}\nNodo: ${NODO}\nDirección: ${DIRECCION}\nFecha y Hora de Ejecucion: ${FECHA} entre ${HORA1} y ${HORA2}\nObservaciones: ${OBS}\n`;


        google.script.run.withSuccessHandler(function (output) {
            idduplicado = output[0];
            filaduplicado = output[1];
            if (idduplicado == 0) {
                document.getElementById("TEXTO").value = FORMATO;
                FECHA = `${FECHA} entre ${HORA1} y ${HORA2}`;
                google.script.run.Escribir(HORA, DESPACHO, ID, NODO, DIRECCION, DISENO, GESTION, CONTRATISTA, TECNICO, FECHA, OBS, RESPUESTA);
                setTimeout(function () {
                    MostrarBotonGenerar();
                    OcultarSpinner();
                    generado = 1;
                    window.alert("Gestión cargada correctamente");
                }, 2000);
                return
            }
            else {
                document.getElementById("TEXTO").value = FORMATO;
                document.getElementById("GENERAR").disabled = false;
                window.alert(`El ID: ${ID} ya se encuentra cargado en la fila: ${filaduplicado} de la Planilla de Carga de Prioridades, Favor Verificar`);
                return
            }
        }).buscarID(ID);


    }

})

document.getElementById("COPIAR1").addEventListener('click', () => {
    var codigoACopiar1 = document.getElementById('TEXTO');
    codigoACopiar1.select();
    codigoACopiar1.setSelectionRange(0, 99999);
    document.execCommand('copy');
})


document.getElementById("ENVIAR").addEventListener('click', () => {
    if (generado != 0) {
        abrirNuevoTab('https://api.whatsapp.com/send?&text=' + `Diseño: ${DISENO}, Tipo de Gestion: ${GESTION}, Contratista: ${CONTRATISTA}, Tecnico: ${TECNICO}, ID: ${ID}, Nodo: ${NODO}, Dirección: ${DIRECCION}, Fecha y Hora de Ejecucion: ${FECHA}, Observaciones: ${OBS}`)
    }
})


document.getElementById("BORRAR").addEventListener('click', () => {
    Limpiar();
})



//Funciones

function abrirNuevoTab(url) {
    // Abrir nuevo tab
    var win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
}


const MostrarBotonGenerar = () => {
    document.getElementById("BOTONGENERAR").classList.add("d-block");
    document.getElementById("BOTONGENERAR").classList.remove("d-none");
}

const OcultarBotonGenerar = () => {
    document.getElementById("BOTONGENERAR").classList.add("d-none");
    document.getElementById("BOTONGENERAR").classList.remove("d-block");
}

const MostrarSpinner = () => {
    document.getElementById("SPINNER").classList.add("d-block");
    document.getElementById("SPINNER").classList.remove("d-none");
}

const OcultarSpinner = () => {
    document.getElementById("SPINNER").classList.add("d-none");
    document.getElementById("SPINNER").classList.remove("d-block");
}



const Limpiar = () => {
    document.getElementById("ID").value = "";
    document.getElementById("DESPACHO").value = "";
    document.getElementById("NODO").value = "";
    document.getElementById("DIRECCION").value = "";
    document.getElementById("DISENO").value = "";
    document.getElementById("GESTION").value = "";
    document.getElementById("CONTRATISTA").value = "";
    document.getElementById("TECNICO").value = "";
    document.getElementById("FECHA").value = "";
    document.getElementById("HORA1").value = "";
    document.getElementById("HORA2").value = "";
    document.getElementById("OBS").value = "";
    document.getElementById("TEXTO").value = "";
}

function validarCampos() {
    if ((document.getElementById("ID").value == "") || (document.getElementById("DESPACHO").value == "") || (document.getElementById("NODO").value == "") || (document.getElementById("DIRECCION").value == "") || (document.getElementById("DISENO").value == "") || (document.getElementById("GESTION").value == "") || (document.getElementById("CONTRATISTA").value == "") || (document.getElementById("TECNICO").value == "") || (document.getElementById("FECHA").value == "") || (document.getElementById("HORA1").value == "") || (document.getElementById("HORA2").value == "")) {
        return true
    }
}
