<script>
    $(document).ready(function() {
  var div = document.createElement('div'),
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      w,
      h,
      msTimer = 0.0,
      lightningTimer,
      lightningAlpha,
      rainArr = [50],
      rainSpeed = 4;

  // initialize
  function init() {
    document.body.appendChild(div);
    div.style.position = "fixed";
    div.appendChild(canvas);
    UpdatePosition();
    create_rain();
    lightningTimer = 8000.0;
    lightningAlpha = 0.0;

    // 1 frame every 30ms
    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(mainLoop, 30);
  }
  init();

  function create_rain() {
    var length = 500;
    rainArr = []; //Empty array to start with
    for (var i = length - 1; i >= 0; i--) {
      rainArr.push({
        x: 1,
        y: 0,
        z: 0
      });
    }

    for (var j = 0; j < 500; j++) {
      rainArr[j].x = Math.floor((Math.random() * 820) - 9);
      rainArr[j].y = Math.floor((Math.random() * 520) - 9);
      rainArr[j].z = Math.floor((Math.random() * 2) + 1);
      rainArr[j].w = Math.floor((Math.random() * 3) + 2);
    }
  }

  function mainLoop() {
    UpdatePosition();
    msTimer += 30;

    if (lightningTimer < 0.0)  {
      lightningTimer = 8000.0;
    }
    else {
      lightningTimer -= 30.0;
    }

    ctx.fillStyle = "#202426";
    ctx.fillRect(0,0,w,h);

    rain();

    if (lightningTimer < 500.0) {
      weather(lightningTimer);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, .1)';
    ctx.font = '30px Sans-Serif';
  }