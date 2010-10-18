(function($) {

var $video = $('#video'),
  timeline;
$(function() {
  timeline = {
      current: 0
    , 2: new Bigimg('goutte.png')
    , 4: new Target(20, 'Les Dombes')
    , 12: new Target(50, '&Eacute;tang Grand-Romans')
    , 75: new Target(60, 'Canards Colverts')
    , 100: new Target(40, 30000, 'Limousines')
    , 150: new Target(50, '&Eacute;tang Servisey')
    , 210: new Target(60, 'Roselière')
  };
});

// <=> loop property
$video.bind('ended', function() {
  this.play();
  $(this).trigger('playing');
});

$video.bind('timeupdate', function() {
  var current = Math.floor(this.currentTime);
  if (current != timeline.current) {
    timeline.current = current;
    if (current = timeline[current]) {
      current.display();
    }
  }  
});

})(jQuery);