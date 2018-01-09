(function($, TweenLite, TimelineLite){
  const container = $('#pod-container')
  const pod = $('#pod')

  let timeline

  function setupTimeline () {
    const bodyHeight = $('body').height()
    const viewportHeight = $(window).innerHeight()
    const viewportWidth = $(window).innerWidth()
    
    timeline = new TimelineLite()
    timeline.add('pod-start', pod.offset().top + pod.height() - viewportHeight)

    const animationDuration = viewportHeight * 0.8
    const fromOpts = {
      left: - pod.width()  // Start with the pod completely off screen
    }
    const toOpts = {
      left: viewportWidth,
      easee: Sine.easeInOut
    }

    timeline.fromTo(pod, animationDuration, fromOpts, toOpts, 'pod-start')
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
