let preview = document.getElementById("screen");
let startButton = document.getElementById("screenPippy");
let pipbtn = document.getElementById("pip");
let recordingTimeMS = 10000;
function log(msg) {
  alert(msg)
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
  embedthis.src = url
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
