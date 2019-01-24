'use strict';

$('.bookSelect').on('click', function() {
  $(this).next().toggleClass('hidden-form');
  $(this).next().toggleClass('visible-form');
  $(this).hide();
});
