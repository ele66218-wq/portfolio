//canvas設定
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
let sheetMusic = [];
redrawCanvas();

function drawGrid(){
  ctx.lineWidth = 0.6;
  for(let x = 0; x <= width; x += 40){

    ctx.beginPath();

    ctx.moveTo(x, 0);
    ctx.lineTo(x, 880);

    ctx.stroke();
  }

  for(let y = 0; y <= 880; y += 20){

    ctx.beginPath();

    ctx.moveTo(0, y);
    ctx.lineTo(width, y);

    ctx.stroke();

  }
}

function drawNoteLabels(){
  ctx.fillStyle = "#000000";
  const notes = ["ド","ド#","レ","レ#","ミ","ファ","ファ#","ソ","ソ#","ラ","ラ#","シ"];
  for(let i = 0; i < 44; i++){
    ctx.fillText(notes[(((3-i)%12)+12)%12], 11, 13+20*i);
  }
}

function redrawCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 540, 40, 20);
  drawGrid();
  drawNoteLabels();

  ctx.fillStyle = "#00FF00";

  for (const note of sheetMusic) {
    const pitch = note[0];
    const startTime = note[1];

    const gridX = 40 * startTime;
    const gridY = 20 * (18 - pitch);

    ctx.fillRect(gridX, gridY, 40, 20);
  }
} 

canvas.addEventListener("click", (e) => {
  ctx.fillStyle = "#00FF00";

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x <= 40) return;

  const gridX = Math.floor(x / 40) * 40;
  const gridY = Math.floor(y / 20) * 20;

  const pitch = -(gridY/20-18);
  const startTime = gridX/40;
  const length = 1;

  const index = sheetMusic.findIndex(item =>
    item[0] === pitch &&
    item[1] === startTime &&
    item[2] === length
  );

  if (index === -1) {
    sheetMusic.push([pitch, startTime, length]);
    redrawCanvas();
  } else {
    sheetMusic.splice(index, 1);
    redrawCanvas();
  }

  
});

//楽譜は[音の高さ,開始時刻,音の長さ]で決めたい。

const functions = {
  "サイン波":x => Math.sin(x),
  "三角波":x => 1 - Math.abs(((2*x/Math.PI) % 4 + 4) % 4 - 2)
}

//音色のボタン選択
let select = "三角波";
const waveButtons = document.querySelectorAll("#waveButtons button")
waveButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    select = btn.textContent;
    waveButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});