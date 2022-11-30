// 1) Generar dos variables: usuarioConEmail y contrasenia. Asignarle un valor aleatorio. A través de tres prompts, pídale al usuario los siguientes datos.


/////////// PARA EL CASO LOGIN

// TODOS LOS PUNTOS TIENEN QUE HACERSE CON FUNCIONES. CADA PUNTO PUEDE EXPRESARSE COMO UNA FUNCIÓN. LAS RESPONSABILIDADES DEBEN ESTAR SEPARADAS.
//UTILICE FUNCIONES QUE RECIBAN PARÁMETROS Y PASE ARGUMENTOS EN LA LLAMADA.


// a) A través de 3 prompts, pídale al usuario que ingrese su nombre, usuario y su contraseña. Valide que el usuario y la contraseña coincidan con los datos de las variables, estos datos tienen que ser iguales entre sí. En el caso de que no lo sean, devuelva un mensaje en forma de alerta, para cada uno de los casos: "Su usuario es erróneo" o "Su contraseña es errónea". EN EL CASO DE QUE SE EQUIVOQQUE EN LOS DOS: "SU USUARIO Y CONTRASEÑA SO ERRÓNEOS".
// b) Luego de que el usuario se loguee exitosamente, envíe una alerta que notifique "Bienvenido ${nombre}". La alerta debe saludar al usuario que se loguea.
// c) Valide con un bucle que el usuario tiene una arroba. En el caso que no la contenga, envíe un prompt con el siguiente mensaje: "Ingrese nuevo email". Cambie el valor de la variable usuarioConEmail.
// d) Valide si la contraseña del usuario tiene más de 8 caracteres. En el caso de que tenga más de ocho caracteres, no haga nada. De lo contrario, envíe un alerta con el siguiente mensaje: "Su contraseña es insegura."
// e) Valide con un bucle que la contraseña al menos tenga un número. En el caso de que no tenga uno, envíe un prompt que exprese lo siguiente: "Su contraseña debe tener caracteres alfanuméricos. Desea cambiarla?". Si el usuario dice si, entonces cambie el valor de la contraseña.



// PUNTO A 
const email="ese.rey@gmail.com"
const contra= "ll"
let nombreUsuario = prompt ("Ingrese su nombre de usuario")
let usuarioConEmail= prompt ("Ingrese su email")
let contrasenia = prompt ("Ingrese su contraseña")
const valida = () => {
while (email != usuarioConEmail && contra != contrasenia) {
    alert ("Su usuario y contraseña son erroneos")
    usuarioConEmail = prompt ("Ingrese un email válido")
    contrasenia = prompt ("Ingrese contraseña correcta")
} 

while (email != usuarioConEmail) {
alert ("Su usuario es incorrecto")
usuarioConEmail = prompt ("Ingrese un email válido")
}

while (contra != contrasenia) {
alert ("Su contraseña es incorrecta")
contrasenia = prompt ("Ingrese contraseña correcta")
}
}
console.log(valida())

// PUNTO B
const saludar = () => {
        alert ("Bienvenido " + `${nombreUsuario}`)
    }
console.log(saludar ())

// PUNTO C   
function validarArroba (emailI) {
    const letra="@"
    let validar=false
    for (let i=0; i<emailI.length; i++){
        if (emailI[i]===letra) {
            validar=true
        }
        else {
            emailI = prompt ("Ingrese un email válido")
        }
    } 
    return validar
}
console.log(validarArroba("emailIngresado"));  


// PUNTO D 

const validarContrasenia = () => {
    for (let i=0; i<contrasenia.length; i++ ) {
        if (contrasenia.length===8) {
    } else {
        alert("Su contraseña es insegura")
        break
    }
    }
}
console.log(validarContrasenia())

// PUNTO E 
let resp = "si"
const cambiarContraseña = () => {
 for (let i=0; i<contrasenia.length; i++)
    if (contrasenia[i].match(/[0-9]/)) {
         resp = prompt ("Su contraseña debe tener caracteres alfanuméricos. Desea cambiarla?")
    }
    if (resp==="si") {
    contrasenia = prompt("Ingrese su nueva contraseña")}
}
console.log(cambiarContraseña())
