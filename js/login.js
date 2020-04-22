//Referenciamos el js del captcha
document.write('<script src="js/captcha-component.js?v=1" type="text/javascript"></script>');

document.addEventListener("DOMContentLoaded", function(){
    validateAndCreateCaptcha();
});

//Función para validar si existe el componente principal en la vista y crear el captcha
function validateAndCreateCaptcha() {
    if (!!document.getElementById('captcha-viewer')) {
        //Creamos el captcha
        new Captcha('captcha-viewer');
    }
}

//Ejemplo para validar el formulario y la imagen seleccionada
function login() {
    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    if (user === 'user' && password === 'password') {
        //Invocamos la función del js del captcha, para validar
        if (!!validateSelectedImage()) {
            alert('Datos correctos');
        } else {
            alert('La imagen no coincide');
            validateAndCreateCaptcha();
        }
    } else {
        alert('Datos incorrectos.');
        validateAndCreateCaptcha();
    }
}
