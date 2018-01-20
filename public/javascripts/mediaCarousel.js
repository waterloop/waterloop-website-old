$(document).ready(function(){
      $('.media-carousel').carousel({height: "20vh", width: 500 , duration: 500, fullWidth: true});
    });

setInterval(function(){
  $('.media-carousel').carousel('next');

}, 8000);
