

const config = {
  fontSize: 16,
  color: '#00FF00',
  speed: 1,
  trailOpacity: 0.05,
  characters: 'アァイイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  backgroundColor: 'black',
};

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let columns;
let drops;
const chars = config.characters.split('');

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = Math.floor(canvas.width / config.fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrixRain() {
  ctx.fillStyle = `rgba(0, 0, 0, ${config.trailOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = config.color;
  ctx.font = `${config.fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * config.fontSize;
    const y = drops[i] * config.fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += config.speed;
  }
}

function animate() {
    drawMatrixRain();
    requestAnimationFrame(animate);
}


function livelyPropertyListener(name, val) {
  console.log(`livelyPropertyListener: ${name} = ${val}`);  

  switch (name) {
    case 'fontSize':
        config.fontSize = val;
        ctx.font = `${config.fontSize}px monospace`;
        initMatrix();
        break;
    case 'color':
        config.color = val;
      break;
    case 'speed':
        config.speed = val;
      break;
    case 'trailOpacity':
        config.trailOpacity = val;
      break;
    case 'characters':
        config.characters = val.length > 0 ? val : '01';
        chars.length = 0;
        chars.push(...config.characters.split('')); 
        break;
  }
}



window.addEventListener('resize', () => {
  initMatrix();
});

initMatrix();
animate();
