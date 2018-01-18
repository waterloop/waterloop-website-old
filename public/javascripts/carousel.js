$(document).ready(function(){
      $('.carousel').carousel({padding: 400, indicators: false});
    });

setInterval(function(){
  $('.carousel').carousel('next');
}, 2000);
