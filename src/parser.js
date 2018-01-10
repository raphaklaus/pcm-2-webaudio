import { play } from './sampler.js';

const load = () => {
  let reader = new FileReader();
  
  reader.onload = (loadedFile) => {
    let binary = new Uint8Array(loadedFile.srcElement.result, 0, loadedFile.srcElement.result.byteLength);
    parse(binary);
  };

  document.querySelector('[type="file"]').files[0] |> reader.readAsArrayBuffer;
};

const parse = (binary) => {
  var sound = {
    channelNumber: toLittleEndian(binary.slice(22, 23)),
    sampleRate: toLittleEndian(binary.slice(24, 27)),
    bitsPerSample: toLittleEndian(binary.slice(34, 35)),
    dataLength: toLittleEndian(binary.slice(40, 43))
  };
  
  sound.data = Array.from(binary.slice(44, binary.length));

  sound.data = sound.data.map((byte, index) => {
    if (index % 2 === 0) {
      var short = composeBytes(byte, sound.data[index + 1]);
      var range = 1 << sound.bitsPerSample - 1;
      
      if (short >= range) {
        short |= ~(range -1);
      }
      return (short / range);

    }
  }).filter((item) => {
    return item !== undefined;
  });

  sound.data.leftChannel = sound.data.map((short, index) => {
    if (index % 2 === 0)
      return short;
  }).filter( (item) => {
    return item !== undefined;
  });

  sound.data.rightChannel = sound.data.map((short, index) => {
    if (index % 2 !== 0)
      return short;
  }).filter( (item) => {
    return item !== undefined;
  });

  document.querySelector('.play-button').addEventListener('click', play.bind(null, sound));
};

const composeBytes = (low, high) => {
  return parseInt(`0x${('00' + high.toString(16)).substr(-2)}${('00' + low.toString(16)).substr(-2)}`);
};

const toLittleEndian = (array) => {
  return parseInt(array.slice().reverse().reduce((prev, current) => {
    // review if
    if (current)
      return prev.toString(16) + current.toString(16);
    
    return '';
  }, ''), 16);
};

document.querySelector('.load-button').addEventListener('click', load);