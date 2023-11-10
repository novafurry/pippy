let preview = document.getElementById("preview");
let startButton = document.getElementById("screenPippy");
let pipbtn = document.getElementById("pip");
let recordingTimeMS = 10000;
function log(msg) {
  alert(msg)
}
function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
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

preview.addEventListener("loadedmetadata", function(){preview.requestPictureInPicture()})
pipbtn.addEventListener("click", function() {preview.requestPictureInPicture()})
