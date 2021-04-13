// Init SpeechSynth API
const synthSpeech = window.speechSynthesis;

// DOM Manupulation
const form = document.querySelector("form");
const userInput = document.querySelector("#user_input");
const voiceSelect = document.querySelector("#voiceSelect");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate_value");
const pitchValue = document.querySelector("#pitch_value");
const pitch = document.querySelector("#pitch");
const body = document.querySelector("body");

// Initial vioces
let voices = [];

const getUsersVioces = () => {
  voices = synthSpeech.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach((voice) => {
    // create option element
    const createOption = document.createElement("option");
    // Fill option with voices or languages
    createOption.textContent = voice.name + "(" + voice.lang + ")";

    // set neeeded option attributes
    createOption.setAttribute("data-lang", voice.lang);
    createOption.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(createOption);
  });
  console.log(voices);
};

getUsersVioces();

if (synthSpeech.onvoiceschanged !== undefined) {
  synthSpeech.onvoiceschanged = getUsersVioces;
}

// speak
const speak = () => {
  if (synthSpeech.speaking) {
    console.log("Already speaking....");
    return;
  }
  if (userInput.value !== "") {
    // add background animation speak
    body.style.background = "#141414 url(images/Sound-Wave-gif.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "cover";

    // Speak text start
    const speakText = new SpeechSynthesisUtterance(userInput.value);

    // Speak text end
    speakText.onend = (e) => {
      console.log("Done Speaking...");
      body.style.background = "#141414";
    };

    // Speak text error
    speakText.onerror = (e) => {
      console.log("Some thing went wrong please try again");
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set rate or pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synthSpeech.speak(speakText);
  }
};


// Event Listeners

// Text form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  userInput.blur();
});

// Voice select change
voiceSelect.addEventListener("submit", (e) => speak());

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));
