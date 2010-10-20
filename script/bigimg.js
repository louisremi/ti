var Bigimg;
(function($) {
  
var 
    $bigimg = $('<img class="bigimg"/>')
  , $video = $('#video')
  ;
  
/*init.list.push($bigimg);

$bigimg.bind('init', function() {
  
});*/
  
function bigimg( src, startTop, startLeft, endTop, endLeft, speed ) {
  this.src = 'bigimg/'+src;
  this.startTop = startTop || 0;
  this.startLeft = startLeft || '100%';
  this.endTop = endTop || 0;
  this.endLeft = endLeft || '-100%';
  this.speed = speed || 10000;
}

bigimg.prototype.display = function() {
  var animate = {};
  if ( this.startTop != this.endTop ) {
    animate.top = this.endTop;
  }
  if ( this.startLeft != this.endLeft ) {
    animate.left = this.endLeft;
  }
  return $bigimg.clone()
    .attr('src', this.src)
    .css({
        top: this.startTop
      , left: this.startLeft
    }).insertAfter($video).animate(animate, this.speed)
    .queue(function() {
      $(this).remove().dequeue();
    });
}

Bigimg = bigimg;
  
})(jQuery);