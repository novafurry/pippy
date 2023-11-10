let recordingTimeMS = 10000;
function log(msg) {
  alert(msg)
}
function encodeUvXOR(e) {
  return encodeURIComponent(
    e.toString().split("").map((e, t) => t % 2 ? String.fromCharCode(2 ^ e.charCodeAt()) : e).join("")
  ) : e;
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
  embedThis.style = "width:100vw;height:100vh"
  embedThis.frameborder = 0
  embedThis.src = window.location.protocol+"//nebulaproxy.io/service/go/"+encodeUvXOR(url)
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
