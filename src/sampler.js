function getAudioContext() {
  if (!getAudioContext.instance) {
    getAudioContext.instance = new (window.AudioContext || window.webkitAudioContext)();
  }

  return getAudioContext.instance;
}


export const play = (sound) => {
  var audio = getAudioContext();

  let data = audio.createBuffer(2, sound.dataLength / 2 * 8 / sound.bitsPerSample, sound.sampleRate);

  for (var channel = 0; channel < sound.channelNumber; channel++) {
    var nowBuffering = data.getChannelData(channel);
    for (var i = 0; i < data.length; i++) {
      if (channel === 0)
        nowBuffering[i] = sound.data.leftChannel[i];
      else
        nowBuffering[i] = sound.data.rightChannel[i];
    }
  }

  var source = audio.createBufferSource();
  source.buffer = data;

  source.connect(audio.destination);

  source.start();
};
