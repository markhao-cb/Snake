(function () {
  "use strick";
  if(window.SnakeGame === undefined) {
     window.SnakeGame = {};
  }
  var SnakeGame = window.SnakeGame;


  var Util = SnakeGame.Util = function() {};

  Util.getRandomNum = function(toNum) {
    return Math.floor(Math.random() * toNum);
  };

  Util.compareArray = function(array1, array2) {
    str1 = JSON.stringify(array1);
    str2 = JSON.stringify(array2);
    return str1 === str2 ? true : false ;
  };

  //Snake Class
  var Snake = SnakeGame.Snake = function(game){
    this.game = game;
    this.segments = [[0,0], [0,1], [0,2], [0,3]];
    this.direction = "E";
    this.direct = this.turn();
  };

  Snake.prototype.move = function() {
    var vec = this.direct;
    var segs = this.segments;
    var head = segs[segs.length-1];
    var newHead = [head[0] + vec[0], head[1] + vec[1]];

    segs.push(newHead);
    var lostTail = segs.shift();
    if (SnakeGame.Util.compareArray(newHead,this.game.applePos) && segs.length < 70) {
      segs.unshift(lostTail);
      this.ateApple();
    }
  };

  Snake.prototype.ateApple = function() {
    this.game.createNewApple();
    if (this.game.speed > 100) {
      this.game.level += 1;
      this.game.speed -= 10;
    }
    this.game.score += this.game.level * 10;
  };

  Snake.prototype.turn = function(direction) {
    var vec = [];

    switch (direction) {
      case "N":
        if (this.direction === "S") return;
        vec = [-1, 0];
        break;
      case "E":
        if (this.direction === "W") return;
        vec = [0, 1];
        break;
      case "S":
        if (this.direction === "N") return;
        vec = [1, 0];
        break;
      case "W":
        if (this.direction === "E") return;
        vec = [0, -1];
        break;
      default:
        vec = [0, 0];
    }
    this.direction = direction;
    this.direct = vec;
    return vec;
  };

  //Board Class
  var Board = SnakeGame.Board = function(game) {
    this.grid = this.setupBoard();
    this.snake = new Snake(game);
  };

  Board.prototype.setupBoard = function() {
    var board = [];
    for (var i = 0; i < 10; i++) {
      board.push([]);
    }
    return board;
  };

  var Game = SnakeGame.Game = function() {
    this.board = new Board(this);
    this.snake = this.board.snake;
    this.score = 0;
    this.level = 0;
    this.speed = 200;
    this.createNewApple();
  };

  Game.prototype.play = function() {
    this.snake.move();
  };

  Game.prototype.createNewApple = function() {
     this.applePos = this.getApplePos();
  };

  Game.prototype.getApplePos = function() {

    var pos = null;
    while (pos === null || !this.isValidPos(pos)) {
      pos = [Util.getRandomNum(9),Util.getRandomNum(9)];
    }
    return pos;
  };

  Game.prototype.isValidPos = function(pos) {
    var res = true;
    this.snake.segments.forEach(function (sp) {
      if (SnakeGame.Util.compareArray(sp,pos)) {
        res = false;
        return false;
      }
    });
    return res;
  };

  Game.prototype.hitItself = function(head) {
    var res = true;
    var segs = this.snake.segments;
    segs.slice(0,segs.length-1).forEach(function (sp) {
      if (SnakeGame.Util.compareArray(sp,head)) {
        res = false;
        return false;
      }
    });
    return res;
  };

  Game.prototype.isOver = function() {
    var segs = this.snake.segments;
    // var vec = this.snake.direct;
    var head = segs[segs.length - 1];
    // var newHead = [head[0] + vec[0], head[1] + vec[1]];
    if (!this.hitItself(head) ||
        head[0] > 9 || head[0] < 0 ||
        head[1] > 9 || head[1] < 0) {
      return true;
    } else {
      return false;
    }
  };
})();
