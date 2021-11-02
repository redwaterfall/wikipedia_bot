

let textInput = document.querySelector('#textInput');
let startButton = document.querySelector('#start');
let wordSed = "";
// new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript;

    console.log(transcript);
    textInput.value=transcript;
};
              
// start recognition
recognition.start();

startButton.addEventListener('click',async function(){
    recognition.start();
})