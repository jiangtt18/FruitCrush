/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx;
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var bubbles = [];
var timeCount;
var moves = [];
var moveCount = 0;
var score;
var animationMoveTime;
var images = [rose, orange, lemon, orchard, lime, grapefruit, blue];
var againBtn = document.getElementById('againBtn');
var timeBtn = document.getElementById('timeBtn');
var basicBtn = document.getElementById('basicBtn');
var startPosX = null;
var startPosY = null;
var sound = document.getElementById('sound');
var bgm = document.getElementById('bgm');
var background = document.getElementById('background');
var body = document.getElementsByTagName('BODY');
var description = document.getElementById('description');
var timerMode = false;

function setJS(fileName) {
  var ele = document.createElement('script');
  ele.type = 'text/javascript';
  ele.src = fileName;
  document.body.appendChild(ele);

  setTimeout(function () {
    basicBtn.style.display = 'none';
    timeBtn.style.display = 'none';
    description.style.display = 'none';
    initialize();
  }, 200);
}

function Bubble(x, y) {
  // assign bubble
  this.x1 = x;
  this.y1 = y;
  this.animationInterval = 0;

  this.x2 = x;
  this.y2 = y;

  this.getY = function () {

    return (this.y1 + (this.y2 - this.y1) * this.animationInterval / 25) * 60 + 100;
  };

  this.setBubbleProp = function (x2, y2, colorIdx) {
    this.x2 = x2;
    this.y2 = y2;
    this.colorIdx = colorIdx;
    this.moving = true;
    this.animationInterval = 25; // cnotrol the time between drop and swap
    moves.push(this);
  };

  this.update = function () {
    this.animationInterval--;

    console.log(this.animationInterval);

    if (this.animationInterval <= 0) {
      this.moving = false;
    }
  };
}

function initialize() {
  // startBtn.style.display = 'none';
  moveCount = 3;
  if (timerMode) {
    timeCount = 10 * 1000;
  }
  score = 0;
  initBubbleBoard();
  initBubbleColor();
  initCanvas();
  // debugger;
  animationMoveTime = setInterval(checkBubbleStatus, 25); //swapping motion time
  // call continuesly . will always run down from 25 animationInteval. but will control the run down speed
  bgm.play();
  console.log(animationMoveTime);
}

function initBubbleBoard() {
  for (var x = 0; x < 10; x++) {
    bubbles[x] = [];
    for (var y = 0; y < 10; y++) {
      bubbles[x][y] = new Bubble(x, y);
    }
  }
}

function initBubbleColor() {
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      var foundcolor = false;
      while (!foundcolor) {
        foundcolor = false;
        var randomIndex = getRandomNum(6);
        if (!hasStraight3colors(x, y, randomIndex)) {
          bubbles[x][y].colorIdx = randomIndex;
          foundcolor = true;
        }
      }
    }
  }
}

function initCanvas() {
  canvas.onmousedown = pressMouse;
  canvas.onmouseup = releaseMouse;
}

// let start = document.getElementById('basicBtn');
// basicBtn.onclick = function(){
//   initialize();
//
// };


function gameOver() {
  ctx.clearRect(0, 0, 600, 700);
  againBtn.style.display = 'inline';
  ctx.font = 'bold 30px Open Sans';
  ctx.fillText('Score: ' + score, 300, 250);
}

function checkBubbleStatus() {
  if (timerMode) {
    timeCount -= 25;
    if (bgm.playbackRate == 1 && timeCount < 5000) {
      bgm.pause();
      bgm.playbackRate = 1.5;
      bgm.play();
    }
  }

  if (moves.length > 0) {
    console.log(moves);
    for (var i = 0; i < moves.length; i++) {
      // debugger;
      moves[i].update();
    }

    moves = moves.filter(function (bubble) {
      return bubble.animationInterval != 0;
    });

    if (moves.length == 0) {
      setRemoveMark();
      fall();
    }
  }
  draw();
  if (timerMode) {
    if (moves.length == 0 && timeCount <= 0) {
      resetGame();
    }
  } else {
    if (moves.length == 0 && moveCount == 0) {
      resetGame();
    }
  }
}

function resetGame() {
  clearInterval(animationMoveTime);
  animationMoveTime = null;
  bgm.pause();
  bgm.currentTime = 0;
  setTimeout(gameOver, 500);
  // gameOver();
}

function setRemoveMark() {
  setHorizontalRemoveMark();
  setVerticalRemoveMark();
}

function setHorizontalRemoveMark() {
  for (var x = 0; x < 10; x++) {
    var currentColorIdx = bubbles[x][0].colorIdx;
    var numSameColor = 1;
    for (var y = 1; y < 10; y++) {
      var nextColorIdx = bubbles[x][y].colorIdx;
      if (currentColorIdx == nextColorIdx) {
        numSameColor++;
        if (numSameColor >= 3) {
          bubbles[x][y - 2].remove = true;
          bubbles[x][y - 1].remove = true;
          bubbles[x][y].remove = true;
        }
      } else {
        currentColorIdx = nextColorIdx;
        numSameColor = 1;
      }
    }
  }
}

function setVerticalRemoveMark() {
  for (var y = 0; y < 10; y++) {
    var currentColorIdx = bubbles[0][y].colorIdx;
    var numSameColor = 1;
    for (var x = 1; x < 10; x++) {
      var nextColorIdx = bubbles[x][y].colorIdx;
      if (currentColorIdx == nextColorIdx) {
        numSameColor++;
        if (numSameColor >= 3) {
          bubbles[x - 2][y].remove = true;
          bubbles[x - 1][y].remove = true;
          bubbles[x][y].remove = true;
        }
      } else {
        currentColorIdx = nextColorIdx;
        numSameColor = 1;
      }
    }
  }
}

function fall() {
  for (var x = 0; x < 10; x++) {
    for (var y = 9, newIdx = 9; y >= 0; y--, newIdx--) {
      while (newIdx >= 0) {
        if (bubbles[x][newIdx].remove) {
          newIdx--;
        } else {
          break;
        }
      }

      if (y != newIdx) {
        var colorIdx = newIdx >= 0 ? bubbles[x][newIdx].colorIdx : getRandomNum(6);
        bubbles[x][y].setBubbleProp(x, newIdx, colorIdx);
      }
    }
  }

  resetMark();
}

function resetMark() {
  var playSound = true;
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      if (bubbles[x][y].remove) {
        bubbles[x][y].remove = false;
        score += 100;
        if (playSound) {
          sound.pause();
          sound.currentTime = 0;
          sound.play();
          playSound = false;
        }
      }
    }
  }
}

function getRandomNum(n) {
  return Math.floor(Math.random() * n);
}

function hasStraight3colors(x, y, curBubble) {
  var hasStraight3colors = false;
  if (y > 1) {
    var bottomBubble = bubbles[x][y - 2].colorIdx;
    var middleBubble = bubbles[x][y - 1].colorIdx;
    if (bottomBubble == middleBubble && middleBubble == curBubble) {
      hasStraight3colors = true;
    }
  }

  if (x > 1) {
    var leftBubble = bubbles[x - 2][y].colorIdx;
    var _middleBubble = bubbles[x - 1][y].colorIdx;
    if (leftBubble == _middleBubble && _middleBubble == curBubble) {
      hasStraight3colors = true;
    }
  }

  return hasStraight3colors;
}

function draw() {
  ctx.clearRect(0, 0, 600, 700);
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      var idx = bubbles[x][y].colorIdx;
      ctx.drawImage(images[idx], x * 60 + 10, bubbles[x][y].getY(), 40, 40);
    }
  }

  ctx.font = 'bold 20px Open Sans';
  ctx.textAlign = 'center';
  if (timerMode) {
    var sec = Math.floor(timeCount / 1000);
    // var mSec = timeCount % 100;

    if (sec < 0) {
      sec = '00';
    } else if (sec < 10) {
      sec = '0' + sec;
    }

    // if (mSec < 0) mSec = '00';

    ctx.fillText('Time Left : ' + sec, 150, 50);
  } else {
    ctx.fillText('Moves Left:' + moveCount, 150, 50);
  }

  ctx.fillText('Score :' + score, 450, 50);
}

function pressMouse(e) {
  startPosX = e.offsetX;
  startPosY = e.offsetY;
  // console.log('dX:' + startPosX);
  // console.log('dY:' + startPosY);
}

function releaseMouse(e) {
  var oldX = Math.floor(startPosX / 60);
  var oldY = Math.floor((startPosY - 100) / 60);
  // console.log('bubbleX:' + oldX);
  // console.log('bubbleY:' + oldY);
  var endPosX = e.offsetX;
  var endPosY = e.offsetY;
  var newPos = calcNewPos(startPosX, endPosX, startPosY, endPosY, oldX, oldY);
  var newX = newPos[0];
  var newY = newPos[1];
  //
  // console.log('bubbleX:' + newX);
  // console.log('bubbleY:' + newY);
  // debugger;
  if (bubbles[oldX][oldY].moving || bubbles[newX][newY].moving || animationMoveTime == null) {
    // let it drops
    return;
  }
  swapColorsAndPos(oldX, oldY, newX, newY); // drop to the ideal position. stops.
  moveCount--;
  draw();
}

function swapColorsAndPos(oldX, oldY, newX, newY) {
  var oldBubble = bubbles[oldX][oldY];
  var newBubble = bubbles[newX][newY];
  var oldColorIdx = oldBubble.colorIdx;
  oldBubble.setBubbleProp(newX, newY, newBubble.colorIdx);
  newBubble.setBubbleProp(oldX, oldY, oldColorIdx);
}

function calcNewPos(startPosX, endPosX, startPosY, endPosY, oldX, oldY) {
  var xDistance = endPosX - startPosX;
  var yDistance = endPosY - startPosY;
  var x = oldX;
  var y = oldY;
  if (Math.abs(xDistance) == 0 && Math.abs(yDistance) == 0) {
    return;
  } else if (Math.abs(endPosX - startPosX) > Math.abs(yDistance)) {
    x += xDistance > 0 ? 1 : -1;
  } else {
    y += yDistance > 0 ? 1 : -1;
  }
  return [x, y];
}
function setCanvasStyle() {
  // canvas.style.border = "5px solid rgb(255, 77, 136)";
  // canvas.style.borderRadius =  '50px';
  // document.getElementById('bg').style.width = '50%';
  // document.getElementById('bg').style.backgroundImage ='url("lib/images/gameBackground.png")';

}
basicBtn.onclick = function () {
  setJS('');

  setCanvasStyle();
};

var countDown = document.getElementById('countDown');
timeBtn.onclick = function () {
  setJS('./lib/timeTrial.js');
  timerMode = true;
  // countDown.style.display = 'block';
  // ctx.fillText('Time Left : ' , 80, 50);
  setCanvasStyle();
};

// mod dule.export = 'basic';

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map