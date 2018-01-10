# PCM 2 Webaudio

Parse wav file and send all PCM Data direct into Web Audio context buffer. You can listen to it in your browser. 

Currently only **16-bit depth stereo** is accepted.

## Running

- `npm run build`
- Open up the `index.html` in a reasonable browser
- Load `samples/voz.wav` click in load and then in play.

## Why?
I know, browsers can play wav files natively. But this way I can apply sound filters like signal amplification, fading, etc. Also I can broadcast audio via sockets if needed.

