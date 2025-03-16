import WaveSurfer from 'wavesurfer.js'

export function addAudioElement(msgDiv, blob) {
  const audioDiv = document.createElement('div');
  msgDiv.append(audioDiv);
  const wavesurfer = WaveSurfer.create({
    container: audioDiv,
    waveColor: 'grey',
    progressColor: 'secondary',
    url: URL.createObjectURL(blob),
    audioRate: 1.5,
    interact: false,
    height: 50,
    barWidth: 5,
    barRadius: 25,
    barHeight: 1.5,
    barAlign: 'bottom',
  });
  audioDiv.addEventListener('click', () => wavesurfer.playPause());
}