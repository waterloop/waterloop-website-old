(function($, TweenLite, TimelineLite){
  const container = $('#deconst-pod')
  const pod = $('#pod')

  let bodyHeight
  let timeline
  let viewportHeight

  function setupTimeline () {
    bodyHeight = $('body').height()
    viewportHeight = $(window).innerHeight()
    
    timeline = new TimelineLite()
    timeline.add('pod-start', container.offset().top - (viewportHeight/ 2))
    timeline.to(pod, (viewportHeight/ 2), { right: 0 }, 'pod-start')
  }

  function progressTimeline (fromTop) {
    timeline.seek(fromTop)
  }

  setupTimeline()

  $(window).scroll(() => progressTimeline($(window).scrollTop()))
  
})($, TweenLite, TimelineLite)
