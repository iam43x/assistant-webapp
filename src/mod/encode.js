export async function convertToPCM(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Создаем OfflineAudioContext для ресемплинга
  const offlineContext = new OfflineAudioContext(1, audioBuffer.length, 16000);
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start();

  const resampledBuffer = await offlineContext.startRendering();
  return encodePCM(resampledBuffer.getChannelData(0));
}

// Кодирование в RAW PCM (16-bit, Little-Endian)
function encodePCM(samples) {
  const buffer = new ArrayBuffer(samples.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i])); // Обрезаем значения
    view.setInt16(i * 2, s * 0x7FFF, true); // 16-bit Little Endian PCM
  }

  return new Blob([buffer], { type: 'application/octet-stream' });
}