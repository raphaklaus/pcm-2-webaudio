var audio = new (window.AudioContext || window.webkitAudioContext)();

let data = audio.createBuffer(2, audio.sampleRate * 3, audio.sampleRate);

for (var channel = 0; channel < data.numberOfChannels; channel++) {
  var nowBuffering = data.getChannelData(channel);
  for (var i = 0; i < data.length; i++) {
    nowBuffering[i] = Math.random() * 2 - 1;
  }
}

var source = audio.createBufferSource();

source.buffer = data;

source.connect(audio.destination);

source.start();
