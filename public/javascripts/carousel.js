$(document).ready(function(){
      $('.carousel').carousel({dist: -50, padding: 100, duration: 500});
    });

setInterval(function(){
  $('.carousel').carousel('next');
}, 5000);
