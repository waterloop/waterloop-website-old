$(document).ready(function(){
      $('.carousel').carousel({dist: -50, padding: 100, duration: 500, fullWidth: true});
      $('.media-carousel').carousel({height: "20vh", width: 500 , duration: 500, fullWidth: true});
    });

setInterval(function(){
  $('.carousel').carousel('next');
  $('.media-carousel').carousel('next');

}, 5000);
