function generarContraseña() {
  const tamano = parseInt(document.getElementById("tamano").value);
  const incluirMayusculas = document.getElementById("mayusculas").checked;
  const incluirMinusculas = document.getElementById("minusculas").checked;
  const incluirNumeros = document.getElementById("numeros").checked;
  const incluirSimbolos = document.getElementById("simbolos").checked;

  let caracteres = "";
  if (incluirMayusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (incluirMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
  if (incluirNumeros) caracteres += "0123456789";
  if (incluirSimbolos) caracteres += "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

  let contraseña = "";
  for (let i = 0; i < tamano; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres.charAt(randomIndex);
  }

  return contraseña;
}

function mostrarTamano() {
  const tamano = document.getElementById('tamano').value;
  document.getElementById('tamanoValor').textContent = tamano;
}

function evaluarFortaleza(contraseña) {
  // Niveles de seguridad
  let nivelSeguridad = "";

  // Reglas de evaluación de fortaleza
  const longitudMinima = 8;
  const tieneMayusculas = /[A-Z]/.test(contraseña);
  const tieneMinusculas = /[a-z]/.test(contraseña);
  const tieneNumeros = /[0-9]/.test(contraseña);
  const tieneCaracteresEspeciales = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(contraseña);

  // Evaluar fortaleza de la contraseña
  if (contraseña.length < longitudMinima) {
    nivelSeguridad = "Muy débil";
  } else if (
    tieneMayusculas &&
    tieneMinusculas &&
    tieneNumeros &&
    tieneCaracteresEspeciales
  ) {
    nivelSeguridad = "Fuerte";
  } else if (
    (tieneMayusculas && tieneMinusculas && tieneNumeros) ||
    (tieneMayusculas && tieneMinusculas && tieneCaracteresEspeciales) ||
    (tieneMayusculas && tieneNumeros && tieneCaracteresEspeciales) ||
    (tieneMinusculas && tieneNumeros && tieneCaracteresEspeciales)
  ) {
    nivelSeguridad = "Moderada";
  } else {
    nivelSeguridad = "Débil";
  }

  return nivelSeguridad;
}

function botonContraseña() {
  const contraseña = generarContraseña();
  const nivelSeguridad = evaluarFortaleza(contraseña);

  document.getElementById("contraseña").value = contraseña;
  const nivelSeguridadElement = document.getElementById("nivelSeguridad");
  nivelSeguridadElement.textContent = nivelSeguridad;

  nivelSeguridadElement.classList.remove("muy-debil", "debil", "moderada", "fuerte");
  if (nivelSeguridad === "Muy débil") {
    nivelSeguridadElement.classList.add("muy-debil");
  } else if (nivelSeguridad === "Débil") {
    nivelSeguridadElement.classList.add("debil");
  } else if (nivelSeguridad === "Moderada") {
    nivelSeguridadElement.classList.add("moderada");
  } else {
    nivelSeguridadElement.classList.add("fuerte");
  }
}

function copiarDatos() {
  var copyText = document.getElementById("contraseña");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // Para celulares

  document.execCommand("copy");

  // mensaj de "Copiado al portapapeles"
  var mensaje = document.getElementById("mensajeCopia");
  mensaje.style.display = "block";
  
  // Ocultar el mensaje después de 3 segundos
  setTimeout(function(){
    mensaje.style.display = "none";
  }, 3000);
}

function botongenerar() {
  window.location.href = "index.html";
}

function botonmanual() {
  window.location.href = "manualdeusuario.html";
}
