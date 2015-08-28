(function () {
  if(window.SnakeGame === undefined){
    window.SnakeGame = {};
  }

  var SnakeGame = window.SnakeGame;

  var View = SnakeGame.View = function ($board) {
    this.game = new SnakeGame.Game();
    this.direction = "E";
    this.snake = this.game.snake;
    this.$board = $board;
    this.setupBoard();
    window.addEventListener("keydown",this.handleKeyEvent.bind(this));
    $(".new-game").on("click", this.newGame.bind(this));
  };

  View.prototype.newGame = function(event) {
    $(".new-game").remove();
    $(".over").remove();
    this.game = new SnakeGame.Game();
    this.direction = "E";
    this.snake = this.game.snake;
    this.play();
  };

  View.prototype.setupBoard = function () {
    var $board = this.$board;
     for (var i = 0; i < 20; i++) {
       for (var j = 0; j < 40; j++) {
         var $square = $('<div data-pos = "' + JSON.stringify([i,j]) +'"></div>')
                      .addClass('square');
         $board.append($square);
       }
     }
  };

  View.prototype.render = function() {
    this.renderSnake();
    this.renderApple();
    this.renderState();
  };

  View.prototype.renderState = function() {
    $(".game-level").text("Level:" + this.game.level);
    $(".game-score").text("Score:" + this.game.score);
  };

  View.prototype.renderSnake = function() {
    var segs = this.snake.segments;

    //clear existed snake class
    $(".snake").removeClass('snake');

    //add new snake class
    segs.forEach(function(seg) {
      seg = JSON.stringify(seg);
      var $snakeSquare = $('.square[data-pos="'+seg+'"]');
      $snakeSquare.addClass('snake');
    });
  };

  View.prototype.renderApple = function() {
    var applePos = JSON.stringify(this.game.applePos);

    //clear existed apple class
    $(".apple").removeClass('apple');

    var $appleSquare = $('.square[data-pos="'+applePos+'"]');
    $appleSquare.addClass('apple');
  };

  View.prototype.handleKeyEvent = function(event) {
    var value = event.keyCode;
    var direction;
    switch (value) {
      case 68:
        direction = "E";
        break;
      case 83:
        direction = "S";
        break;
      case 65:
        direction = "W";
        break;
      case 87:
        direction = "N";
        break;
      default:
        return;
    }
    this.direction = direction;
  };

  View.prototype.play = function() {
    var view = this;

    var myFunction = function(){
      view.snake.turn(view.direction);
      view.snake.move();
      if(view.game.isOver()) {
        var $overView = $("<div>");
        $overView.addClass('over');
        var $gameOver = $("<img>");
        $gameOver.addClass('gameover');
        $gameOver.attr('src', 'http://res.cloudinary.com/dypfv4yqq/image/upload/v1440738018/go_aquqnk.gif');
        var $restart = $("<img>");
        $restart.addClass('restart');
        $restart.attr('src', 'http://res.cloudinary.com/dypfv4yqq/image/upload/v1440740530/rs_qorhhn.gif');
        $overView.append($gameOver).append($restart);
        $('body').append($overView);
        $(".restart").on("click", view.newGame.bind(view));
      } else {
        view.render();
        console.log(view.game.speed);
        timeout = setTimeout(myFunction, view.game.speed);
      }
    };
    myFunction();
  };
})();
