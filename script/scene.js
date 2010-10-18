init.list.push('scene');

(function($) {
  
var $scene = $('#scene');
  
$(window).bind('smartresize', function( e, videoHeight) {
  $scene.css('top', ($('html').height() - _vh(100)) /2);
});

$scene.bind('init', function() {
  $(window).trigger('smartresize');
});
  
})(jQuery);
