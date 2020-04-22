document.write('<script src="js/captcha-component.js?v=1" type="text/javascript"></script>');

document.addEventListener("DOMContentLoaded", function(){
    if (!!document.getElementById('captcha-viewer')) {
        new Captcha('captcha-viewer');
    }
});
