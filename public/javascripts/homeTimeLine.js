(function($, TweenLite, TimelineLite){
  const container = $('#pod-container')
  const pod = $('#pod')

  let bodyHeight
  let timeline
  let viewportHeight

  function setupTimeline () {
    bodyHeight = $('body').height()
    viewportHeight = $(window).innerHeight()
    
    timeline = new TimelineLite()
    timeline.add('pod-start', pod.offset().top + pod.height() - viewportHeight)

    timeline.to(pod, (viewportHeight * 0.7), { right: 0, ease: Sine.easeInOut }, 'pod-start')
    timeline.pause()
  }

  function progressTimeline (fromTop) {
    timeline.seek(fromTop)
  }

  setupTimeline()

  $(window).scroll(() => progressTimeline($(window).scrollTop()))
  $(window).resize(() => {
    console.log('resized')
    setupTimeline()
    progressTimeline($(window).scrollTop())
  })

  
})($, TweenLite, TimelineLite)
