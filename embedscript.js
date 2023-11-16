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
var mode = '';
func anErrorOccured(){
  if(!(mode == '')){
    if( mode == 'normal'){
      i.src = "https://nebulaproxy.io/service/go/"+customEncode(url)
      mode = 'greatsword'
    } else{
      document.write("Sowwyyy 3: We weawwwy twied, but we cawnt embed this site :(<br>please forgive uwu")
    }
  }
};
url = '"+url+"';
i = document.querySelector('iframe');
mode = 'normal';
i.src = url;
