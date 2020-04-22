// Función que permite crear el captcha en la vista
function Captcha(elementId) {
  var imageQuantity = 4; //Cantidad de objetos que serán mostrados en el captcha
  var colNumber = 2; //Cantidad de objetos por fila
  var pathImages = "images/"; //Ruta base de las imágenes
  var arrayImage = []; //Array con todas las imágenes
  var finalArray = []; //Arary con las imágenes a mostrar

  //Objeto clave-valor para asociar las preguntas y las imágenes
  const imageQuestion = function() {
    this.question = '',
    this.imageName = ''
  }

  //Función que crea el objeto clave-valor y lo agrega a la lista global
  const createObject = function (question, name) {
    var object = new imageQuestion();
    object.question = question;
    object.imageName = name;
    arrayImage.push(object);
  }

  //Fuinción para invocar la creación de los objetos de la lista global
  const createArray = function() {
    createObject('Qué imagen tiene una ardilla?', 'ardilla.png');
    createObject('Qué imagen tiene un tigre?', 'TIGRE.jpg');
    createObject('Qué imagen tiene un caballo?', 'caballo.jpg');
    createObject('Qué imagen muestra el mar?', 'mar.jpg');
    createObject('Qué imagen tiene un faro?', 'faro.jpg');
    createObject('Qué imagen tiene un jardín?', 'jardin.jpg');
    createObject('Qué imagen tiene un panda?', 'panda.jpg');
    createObject('Qué imagen tiene un surfista?', 'surfista.jpg');
    createObject('Qué imagen tiene un gato?', 'gato.jpg');
    createObject('Qué imagen tiene un perro?', 'perro.jpg');
    createObject('Qué imagen tiene un león?', 'leon.jpg');
    createObject('Qué imagen tiene un conejo?', 'conejo.jpg');
  }

  createArray();

  //Función que crea el HTML definitivo y lo envía a la vista - Paso 2
  const createHtml = function (tableBody) {
    var htmlInput = "";
    var questionInput = "";
    var index = Math.floor(Math.random() * finalArray.length);
    var secretImage = finalArray[index].imageName;
    document.cookie = "secretImage=" + secretImage + "";
    var question = finalArray[index].question;
    index = 0;

    questionInput =
      "<tr>" +
      '<td colspan="' +
      colNumber +
      '">' +
      '<span class="captcha-question">' +
      question.toUpperCase() +
      "</span>" +
      "</td>" +
      "</tr>";

    htmlInput =
      '<span>Captcha</span><table class="captcha-table"><tbody>' +
      tableBody +
      questionInput +
      "</tbody></table>";
    document.getElementById("captcha-container").innerHTML = htmlInput;
  };

  //Función que crea la estructura de las imágenes en una tabla - Paso 1
  const createBody = function () {
    var tableBody = "";
    var columnInput = "";
    var quantity = 0;
    finalArray = [];

    while (finalArray.length < 4) {
      var index = Math.floor(Math.random() * arrayImage.length);

      if (!finalArray.find((item) => item.imageName === arrayImage[index].imageName)) {
        finalArray.push(arrayImage[index]);
      }
    }

    for (i = 0; i < imageQuantity; i++) {
      quantity++;

      columnInput +=
        "<td>" +
        '<div class="custom-control custom-radio image-checkbox">' +
        "<input " +
        'type="radio" ' +
        'class="custom-control-input" ' +
        'id="rbImage_' +
        i +
        '" ' +
        'name="rbImage" ' +
        'value="' +
        finalArray[i].imageName +
        '" ' +
        "/>" +
        '<label class="custom-control-label" for="rbImage_' +
        i +
        '">' +
        "<img " +
        'src="' +
        pathImages +
        finalArray[i].imageName +
        '" ' +
        'alt="#" ' +
        "/> " +
        "</label> " +
        "</div>" +
        "</td>";

      if (quantity === colNumber) {
        tableBody += "<tr>" + columnInput + "</tr>";
        quantity = 0;
        columnInput = "";
      }
    }

    createHtml(tableBody);
  };

  //Función que crea el contenedor global y desencadena la creación del captcha
  const drawCaptcha = function () {
    htmlText = '<div id="captcha-container"></div>';
    document.getElementById(elementId).innerHTML = htmlText;
    createBody();
  };

  drawCaptcha();
}

//Función que permite validar si la imagen seleccionada es la correcta
//Retorna (true o false)
function validateSelectedImage() {
  var selectedImage = "";
  var response = false;

  document.getElementsByName("rbImage").forEach((val) => {
    if (val.checked) {
      selectedImage = val.value;
    }
  });

  if (selectedImage === getCookie("secretImage")) {
    response = true;
  } else {
    response = false;
  }

  return response;
}

//Función que permite consultar la cookie que almacena la imagen correcta (Guardada de forma aleatoria)
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  var response = "";

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      response = c.substring(name.length, c.length);
    }
  }

  return response;
}
