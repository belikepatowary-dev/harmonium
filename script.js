const keys = document.querySelectorAll(".key");

const noteMap = {
  a: "C",
  s: "D",
  d: "E",
  f: "F",
  g: "G",
  h: "A",
  j: "B"
};

// Create sound using Web Audio API
function playSound(note) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();

  const frequencies = {
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.00,
    A: 440.00,
    B: 493.88
  };

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequencies[note], context.currentTime);

  oscillator.connect(context.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, 300);
}

// Click event
keys.forEach(key => {
  key.addEventListener("click", () => {
    const note = key.getAttribute("data-note");
    playSound(note);
    key.classList.add("active");

    setTimeout(() => key.classList.remove("active"), 100);
  });
});

// Keyboard event
document.addEventListener("keydown", (e) => {
  const note = noteMap[e.key];

  if (note) {
    playSound(note);

    keys.forEach(key => {
      if (key.innerText.toLowerCase() === e.key) {
        key.classList.add("active");
        setTimeout(() => key.classList.remove("active"), 100);
      }
    });
  }
});
