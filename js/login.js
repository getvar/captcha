document.write('<script src="js/plgCaptcha.js" type="text/javascript"></script>');

document.addEventListener("DOMContentLoaded", function(){
    validateAndCreateCaptcha();
});

function validateAndCreateCaptcha() {
    if (!!document.getElementById('captcha-viewer')) {
        drawCaptcha('captcha-viewer');
    }
}

function login() {
    if (document.getElementById('user').value === 'user' && 
        document.getElementById('password').value === 'password') {
        if (validateSelectedImage() === true) {
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
