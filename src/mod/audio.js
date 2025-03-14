import WaveSurfer from 'wavesurfer.js'

export function addAudioElement(msgDiv, blob) {
  const audioDiv = document.createElement('div');
  audioDiv.setAttribute('class', 'm-0 p-2');
  msgDiv.append(audioDiv);
  const wavesurfer = WaveSurfer.create({
    container: audioDiv,
    waveColor: 'grey',
    progressColor: 'secondary',
    url: URL.createObjectURL(blob),
    audioRate: 1.5,
    interact: false,
    height: 50,
    barHeight: 0.7,
    barWidth: 3,
    barAlign: "bottom",
  });
  audioDiv.addEventListener('click', () => wavesurfer.playPause());
}