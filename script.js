try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  var instructions = document.getElementById("instructions");
  var capturedText = "";
} catch (ex) { // It is fairly experimental technology, if no support, hide the app.
  console.error(ex);
  alert("No Browser support for WebAPI");
  document.getElementById("no-browser").classList.remove("hidden");
  document.getElementById("app").classList.add("hidden");
}

recognition.onstart = () => {
  instructions.innerHTML = "Listening for voice input"
}

recognition.onspeechend = () => {
  document.getElementById("listenBtn").classList.remove("started");
    
  document.getElementById("listenBtn").innerHTML = "Listen"
  instructions.innerHTML = "<span class='important'>Speech detection stopped.</span>"
}

recognition.onerror = (e) => {
  console.error(e);
  (e.error == "no-speech") ? instructions.innerHTML = "No speech detected." : instructions.innerHTML = "Error occured";
  document.getElementById("listenBtn").classList.remove("started");
  document.getElementById("listenBtn").innerHTML = "Listen";
}

recognition.onresult = (e) => {
  let current = e.resultIndex;
  
  let transcript = e.results[current][0].transcript;
  
  document.getElementById("text-area").value += ("You: " + transcript + "\n");
  
  voiceParser(transcript);
  capturedText = transcript;
}

document.getElementById("listenBtn").addEventListener("click", (e) => {
  if (e.target.classList.contains("started")) {
    
    recognition.stop();
  } else {
    e.target.classList.add("started");
    
    e.target.innerHTML = "Stop Listening"
    recognition.start();
  }
});

document.getElementById("speakBtn").addEventListener("click", (e) => {
  speak(capturedText);
});

function speak (text) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
  
  document.getElementById("text-area").value += ("ME: " + text + "\n");
}
