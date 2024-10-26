function validarFormulario() {
const nombre = document.getElementById("name").value.trim();
const asunto = document.getElementById("subject").value.trim();
const reclamo = document.getElementById("coments").value.trim();
       
if (!nombre || !asunto || !reclamo) {
    alert("Por favor, completa todos los campos requeridos.");
        return false;
    }
    alert("Reclamo enviado satisfactoriamente");
        return true;
}
