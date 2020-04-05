function makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const utilService = {
  makeId,
  getRandomInt,
  makeLorem,
  uploadImg
};

function makeLorem(length) {
  var randStr = "";
  while (randStr.length < length) {
    var wordLength = getRandomInt(3, 6);
    var word = _createWord(wordLength);

    if (Math.random() > 0.9) word += ",";

    randStr += word + " ";
  }
  randStr = randStr.substring(0, length);
  randStr = randStr[0].toUpperCase() + randStr.substr(1);

  return randStr;
}

function _getRandChar() {
  var LETTERS = "abcdefghijklmnopqrstuvwxyz";
  var randIndex = parseInt(Math.random() * LETTERS.length);
  return LETTERS.charAt(randIndex);
}

function _createWord(length) {
  var word = "";
  while (word.length < length) {
    var randChar = _getRandChar();
    word += randChar;
  }

  return word;
}

function uploadImg(ev) {
  const CLOUD_NAME = "rendomfun"; // yarin
  // const CLOUD_NAME = "ddkf2aaiu"; // ofek temp
  // const CLOUD_NAME = "dwuasrttm"; // ofek
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", ev.target.files[0]);
  formData.append("upload_preset", "fzqdc3dr"); // yarin
  // formData.append("upload_preset", "cdw1fzlw"); // ofek temp
  // formData.append("upload_preset", "cucssrug"); // ofek
  // console.log("UTIL IMGL: ", ev.target.files[0]);

  return fetch(UPLOAD_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log("IMG UPLOAD: ", res);
      return res.url;
      // return res
    })
    .catch(error => console.error(error));
}
