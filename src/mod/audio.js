import WaveSurfer from 'wavesurfer.js'

export function addAudioElement(msgDiv, blob) {
    const audioDiv = document.createElement('div');
    audioDiv.setAttribute('class', 'm-0 p-2');
    msgDiv.appendChild(audioDiv);
    const wavesurfer = WaveSurfer.create({
        container: audioDiv,
        waveColor: 'grey',
        progressColor: 'secondary',
        url: URL.createObjectURL(blob),
        audioRate: 1.5,
        interact: false,
        height: 70,
        barHeight: 0.7,
        barWidth: 2,
    });
    audioDiv.addEventListener('click', () => wavesurfer.playPause());
}