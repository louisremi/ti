var Drops;
(function($) {
  
var $drops = [
    $('<img class="drop" src="img/drop0.png" />')
  , $('<img class="drop" src="img/drop1.png" />')
], $scene = $('#scene');

function drops( meanStartX, meanStartY, meanEndX, meanEndX, speed, nb, interval ) {
  this.startX = meanStartX || 50;
  this.startY = meanStartY || 100;
  this.endX = meanEndX || 50;
  this.endY = meanEndX || -10;
  this.speed = speed || 3000;
  this.nb = nb || 35;
  this.interval = interval || 250;
}

drops.prototype.display = function() {
  var self = this, nb = this.nb,
    interval = setInterval(function() {
      
      if (!nb--) {
        clearInterval(interval)
      }
      $drops[randomDrop()]
        .clone().appendTo($scene)
        .animate({path: 
          new $.path.bezier({
            start: {
              x: _vw(100),
              y: _vh(randomTop()),
              angle: _vh(randomAngle())
            },
            end: {
              x: -_vw(10),
              y: _vh(randomTop()),
              angle: _vh(randomAngle())
            }
          })
        }, self.speed)
        .queue(function() {
          $(this).remove().dequeue();
        });
    
  }, this.interval);
}
      
function randomDrop() {
  return Math.floor(Math.random()*2);
}
// between 60 and 80
function randomTop() {
  return Math.floor(Math.random()*30)+30;
}
function randomAngle() {
  return Math.floor(Math.random()*40)+20;
}

Drops = drops;
  
})(jQuery);
