let recordingTimeMS = 10000;
function log(msg) {
  alert(msg)
}
function customEncode(input) {
  // Check if input exists
  if (input) {
    // Convert input to a string
    let str = input.toString();

    // Split the string into an array of characters
    let charArray = str.split("");

    // Map over each character, XOR every other character's ASCII code with 2
    let encodedArray = charArray.map((char, index) => {
      if (index % 2) {
        return String.fromCharCode(2 ^ char.charCodeAt());
      } else {
        return char;
      }
    });

    // Join the modified array back into a string
    let encodedString = encodedArray.join("");

    // URI encode the entire string
    let finalResult = encodeURIComponent(encodedString);

    // Return the encoded result
    return finalResult;
  } else {
    // If input doesn't exist, return the input as is
    return input;
  }
}

function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
}
function startWebCam(){
 if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => preview.srcObject = stream).catch(error => log(error));
 }
}
async function anySite(url){
  document.getElementById("urlforPop").textContent = url
  let options = {
    width: 400,
    height: 400,
  };
  let pipWindow = await documentPictureInPicture.requestWindow(options);
  embedThis = document.createElement("iframe")
  embedThis.style = "width:100vw;height:100vh;position:absolute;top:0px;left:0px;border:0px solid white;"
  embedThis.frameborder = 0
  embedThis.src = window.location.protocol+"//nebulaproxy.io/service/~osana/"+url
  pipWindow.document.body.append(embedThis);
}

//Inside of the event listener callback function
if (!("PictureInPictureEvent" in window)) {
  document.write("Your browser does not support picture-in-picture. Therefore, Pippy will not work. Please upgrade your browser or contact us at pippyError@foxsden.is-a.dev if you think this is a mistake.")
}
if (!("documentPictureInPicture" in window)) {
  alert("Document Picture-In-Picture is not supported by your browser. Pippy Dock, and interactive webpage will not work.")
  document.getElementById("requiresDocumentPiP").hidden = true
}
document.addEventListener("load", function (){
  let preview = document.getElementById("screen");
  let startButton = document.getElementById("screenPippy");
  let pipbtn = document.getElementById("pip");
  startButton.addEventListener("click", function() {
    navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    }).then(stream => {
      preview.srcObject = stream;
      preview.requestPictureInPicture();
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;
      return new Promise(resolve => preview.onplaying = resolve);
    })
    .catch(log);
  }, false);

  preview.addEventListener("loadedmetadata", function(){
    wait(1000)
    preview.requestPictureInPicture()

  })
  pipbtn.addEventListener("click", function() {preview.requestPictureInPicture()})
})
