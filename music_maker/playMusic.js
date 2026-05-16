//音を出す機能
const audioCtx = new AudioContext();


async function playMusic() {
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }


  const sampleRate = audioCtx.sampleRate;
  const duration = 48; // 秒

  const buffer = audioCtx.createBuffer(
    1,
    sampleRate * duration,
    sampleRate
  );
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;
    data[i] = 0
    for (let j = 0 ; j < sheetMusic.length; j++){
      let temp = 0;
      if (sheetMusic[j][1] <= t && t < sheetMusic[j][1] + sheetMusic[j][2]){
        temp = Math.exp(-3 * (t - sheetMusic[j][1])) * functions[select](2 * Math.PI * 440 * 2 ** (sheetMusic[j][0]/12) * (t - sheetMusic[j][1]));
      }
      data[i] = data[i] + temp; //ここが危険
    }
  }



  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  source.connect(audioCtx.destination);

  source.start();

  
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    max = Math.max(max, Math.abs(data[i]));
  }
  console.log(max);
  console.log(data[67700]);
  console.log(audioCtx.state);
}
