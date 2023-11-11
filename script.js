  let preview = document.getElementById("screen"); // defines a variable for the picture-in-picture's base
  let intsite = document.getElementById("intsite"); // defines a variable for the interactive website button
  let startButton = document.getElementById("screenPippy"); // defines a variable for the screen/window/tab button
  let pipbtn = document.getElementById("pip"); // defines a variable for the show picture-in-picture button
  let u2o = document.getElementById("url2open") // defines a variable for the url to open textbox in the modal element
  let anypip = document.getElementById("lpip") // defines a variable for the show pip button in the modal (interactive website)
  let startscreenfr = document.getElementById("startscreenfr")
  var pipWindow; // globals the pipWindow, defined later
  function log(msg) { // redirects the log function in the base code to an alert box.
    alert(msg)
  }

  function customEncode(input) { // custom encoder written by me with the help of GPT.
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

  function wait(delayInMS) { // waits a chosen period of time, in milliseconds
    return new Promise(resolve => setTimeout(resolve, delayInMS));
  }

  function startWebCam() {
    if (navigator.mediaDevices.getUserMedia) { // checks if browser supports UserMedia
      navigator.mediaDevices.getUserMedia({
          video: true
        }) // asks browser for video userMedia (cameras)
        .then(stream => preview.srcObject = stream) // sends the users camera to the preview video element
        .catch(error => log(error)); // logs an error, if one occurs
    }
  }
  async function anySite(url) {
    let options = { // defines default size for the interactive PiP
      width: 400, // measured in pixels (px)
      height: 400, // measured in pixels (px)
    };
    pipWindow = await documentPictureInPicture.requestWindow(options); // requests a documentPictureInPicture (interactive PiP), with the options defined above
    embedThis = document.createElement("div"); // creates an element, which will be sent to the PiP
    embedThis.innerHTML = "<iframe frameborder=0 style='width:100vw;height:100vh;position:absolute;top:0px;left:0px;border:0px solid white;' allowfullscreen src='https://foxsdenyt.github.io/pippy/embedded.html?" + url + "'></iframe>" // adds an iframe that loads the embedder page to the afforementioned element.
    pipWindow.document.body.append(embedThis); // adds the element to the PiP
  }
  if(!("mediaDevices" in navigator)){ // checks if browser supports grabbing mediaDevices
    document.write("Your browser does not support grabbing userMedia (Camera/Screen). Therefore, Pippy will not work. Please upgrade your browser or contact us at pippyError@foxsden.is-a.dev if you think this is a mistake.")
  }
  if (!("PictureInPictureEvent" in window)) { // checks if browser supports PictureInPicture
    document.write("Your browser does not support picture-in-picture. Therefore, Pippy will not work. Please upgrade your browser or contact us at pippyError@foxsden.is-a.dev if you think this is a mistake.")
  }
  if (!("documentPictureInPicture" in window)) { // checks if browser supports documentPictureInPicture
    alert("Document Picture-In-Picture is not supported by your browser. Pippy Dock, and interactive webpage will not work.")
    document.getElementById("requiresDocumentPiP").hidden = true
  }
  startButton.addEventListener("click", function() {
    navigator.mediaDevices.getDisplayMedia({ // Asks for window/tab/screen capture, but only display, not audio!
        video: true,
        audio: false
      }).then(stream => {
        preview.srcObject = stream; // sends it to the hidden video player
        startscreenfr.parentElement.show() // places a picture-in-picture of the hidden video player
        preview.captureStream = preview.captureStream || preview.mozCaptureStream; // ok i dont know what this does (i built this off already existing opensource code.)
        return new Promise(resolve => preview.onplaying = resolve); // returns a promise, to finish the function
      })
      .catch(log); //logs errors
  }, false);

  preview.addEventListener("playing", function() { // wait for the player to start playing before showing the PiP
    wait(1000) // waits 1000ms
    preview.requestPictureInPicture() // shows it

  })
  startscreenfr.addEventListener("click", function(){ // litterally the same as the last one
    wait(1000)
    preview.requestPictureInPicture()
  })
  pipbtn.addEventListener("click", function() { // function to manually trigger the PiP
    preview.requestPictureInPicture()
  })
  lpip.addEventListener("click", function() { // activates the document pip and closes the dialog
    anySite(document.getElementById("url2open").value);
    document.querySelector("dialog#anypip").close()
  })
  intsite.addEventListener("click", function() { // shows the document pip dialog
    document.querySelector("dialog#anypip").showModal()
  })
