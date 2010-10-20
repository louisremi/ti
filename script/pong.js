var Playing = false;
(function($, init) {
  
var $ball = $('<img class="ball" src="img/ball.png" />'),
  $paddleLeft = $('<div class="paddle"></div>'),
  $paddleRight = $('<div class="paddle"></div>'),
  $scene = $('#scene'),
  ballWidth, ballHeight,
  paddleWidth, paddleHeight,
  viewWidth, viewHeight,
  speed = 10, angle;
  
init.list.push($ball);

$ball.bind('init', function() {
  viewWidth = _vw(100);
  viewHeight = _vh(100);
  ballHeight = ballWidth = _vh(10);
  paddleHeight = _vh(20);
  paddleWidth = _vw(2);
  var vh = _vh
    , vw = _vw
    , paddleOffset = vw(2)
    , ballStart = {
        top: viewHeight - ballHeight - vh(2)
      , left: vh(2)
      , border: vh(.5) + 'px solid white'
      , opacity: .5
    }
    , paddleDimensions = {
        width: paddleWidth
      , height: paddleHeight
    }
    , rPaddleStart = {
        right: vw(2)
      , top: vh(50)
    }
    , lPaddleStart = {
        left: vw(2)
      , top: vh(30)
    }
    ;
  paddleWidth += paddleOffset;
  ballStart[$.browser.mozilla? 'MozBorderRadius' : 'borderRadius'] = vh(1);  
  
  $ball
    .css($.extend({}, {width: ballWidth}, ballStart))
    .appendTo($scene).data('start', ballStart)
    .data('position', {
        top: ballStart.top
      , left: ballStart.left
    });
  $.each([
      [$paddleLeft, lPaddleStart]
    , [$paddleRight, rPaddleStart]
  ], function(i, arr) {
    arr[0]
      .css($.extend({}, paddleDimensions, arr[1]))
      .appendTo($scene)
      .data('start', arr[1])
      .data('position', arr[1]);
  });
});

$ball.bind('click', function() {
  if (!Playing) {
    $ball.css({
        border: 'none'
      , opacity: 1
    }).pong( 10, Math.PI/4 );
    $paddleLeft.add($paddleRight).css({
        opacity: 0
      , display: 'block'
    }).animate({opacity: 1});
    
  } else {
    $ball.trigger('reset');
  }
  Playing = !Playing;

}).bind('reset', function() {
  var ballStart = $.data(this, 'start');
  clearInterval($.data(this, 'interval'));
  $(this)
    .fadeOut()
    .queue(function() {
      $(this).css(ballStart).dequeue();
    })
    .fadeIn()
    .data('position', {
        top: ballStart.top
      , left: ballStart.left
    });
  $.each([$paddleLeft, $paddleRight], function(i, $el) {
    var start = $el.data('start');
    $el
      .fadeOut()
      .css(start)
      .data('position', start);
  });
});

$paddleRight.add($paddleLeft).bind('up', function() {
  var position = $.data(this, 'position'),
    top = position.top - 20;
  if ( top <= 0 ) {
    top = 0;
  }
  position.top = top;
  $(this).css('top', top).data('position', position);
}).bind('down', function() {
  var position = $.data(this, 'position'),
    bottom = viewHeight - (position.top + 20 + ballHeight);
  if ( bottom <= 0 ) {
    bottom = 0;
  }
  position.top = viewHeight - bottom - ballHeight
  $(this).css('top', position.top).data('position', position);

}).bind('move', function( e, top ) {
  var bottom = viewHeight - (top + paddleHeight)
    , position = $.data(this, 'position');
  if ( top <= 0 ) {
    top = 0;
  }
  if ( bottom <= 0 ) {
    top = viewHeight - paddleHeight;
  }
  position.top = top;
  $(this).css('top', top).data('position', position);
});;

$.fn.pong = function( speed, angle ) {
  var dx = Math.cos(angle) * speed
    , dy = Math.sin(angle) * speed;
  
  return this.each(function( i, el ) {
    $.data(this, 'speed', speed);
    $.data(this, 'angle', angle);
    var interval = setInterval(function() {
      var self = el
        , position = $.data(self, 'position')
        , top = position.top -= dy
        , left = position.left += dx
        , bottom = viewHeight - top - ballHeight
        , right = viewWidth - left - ballWidth
        , goingLeft = dx <= 0
        , paddleTop = (goingLeft? $paddleLeft : $paddleRight).data('position').top
        ;
      if ( top <= 0 || bottom <= 0 ) {
        dy = -dy;
      
      // hit right paddle or left
      } else if ( 
        ((goingLeft && left - paddleWidth <= 0) ||
        (!goingLeft && right - paddleWidth <= 0)) && (
          Math.abs((top + ballHeight/2) - (paddleTop + paddleHeight/2)) < paddleHeight/2
        ) ) {
        dx = -dx;
        
      } else if ( left <= 0 || right <= 0) {
        $ball.trigger('click');
        /*clearInterval(interval);
        position = {
            top: (viewHeight - paddleHeight)/2
          , left: (viewWidth - paddleWidth)/2
        }
        $ball
          .css($.extend({opacity: 0}, position))
          .data('position', position)
          .animate({opacity: 1})
          .pong( speed, Math.random()*2*Math.PI );*/
      }
      $(self).css(position).data('position', position);
    }, $.fx.interval);
    $.data(this, 'interval', interval);
  });
}

$(window).bind('keypress', function( e ) {
  switch( e.keyCode ) {
    case 97:
      $paddleLeft.trigger('up');
      break;
    case 113:
      $paddleLeft.trigger('down');
      break;
    case 112:
      $paddleRight.trigger('up');
      break;
    case 109:
      $paddleRight.trigger('down');
      break;
  }
}).bind($.browser.mozilla? 'MozTouchMove  ' : 'mousemove', function( e ) {
  if (Playing) {
    (e.clientX < screen.width / 2? $paddleLeft : $paddleRight).trigger('move', [e.clientY - paddleHeight/4]);
  }

});
  
})(jQuery, init);