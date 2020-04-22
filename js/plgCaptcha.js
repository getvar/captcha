var imageQuantity = 4;
var colNumber = 2;
var pathImages = "images/";
var selectedImage = "";
var index = 0;
var arrayImage = [
  "una ardilla.png",
  "un caballo.jpg",
  "un panda.jpg",
  "un TIGRE.jpg",
  "del mar.jpg",
  "un jardin.jpg",
  "un faro.jpg",
  "un surfista.jpg",
];
var finalArray = [];

function drawCaptcha(elementId) {
  htmlText = '<div id="captcha-container"></div>';
  document.getElementById(elementId).innerHTML = htmlText;
  createBody();
}

function createBody() {
  var tableBody = "";
  var columnInput = "";
  var quantity = 0;
  finalArray = [];

  while (finalArray.length < 4) {
    var index = Math.floor(Math.random() * arrayImage.length);

    if (!finalArray.find((item) => item === arrayImage[index])) {
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
      'id="ck2_' +
      i +
      '" ' +
      'name="ck2" ' +
      'value="' +
      finalArray[i] +
      '" ' +
      // 'onclick="validateSelectedImage()" ' +
      "/>" +
      '<label class="custom-control-label" for="ck2_' +
      i +
      '">' +
      "<img " +
      'src="' +
      pathImages +
      finalArray[i] +
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
}

function createHtml(tableBody) {
  var htmlInput = "";
  var questionInput = "";
  var secretImage = finalArray[Math.floor(Math.random() * finalArray.length)];
  document.cookie = "secretImage=" + secretImage + "";
  var question =
    "Qué imagen es " + secretImage.substring(0, secretImage.indexOf(".")) + "?";

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
}

function validateSelectedImage() {
  selectedImage = "";
  response = false;

  document.getElementsByName("ck2").forEach((val) => {
    if (val.checked) {
      selectedImage = val.value;
    }
  });

  if (selectedImage === getCookie("secretImage")) {
    response = true;
    // alert("Captcha correcto.");
  } else {
    // alert("Captcha incorrecto.");
    // drawCaptcha("captcha-container");
    response = false;
  }

  return response;
}

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
