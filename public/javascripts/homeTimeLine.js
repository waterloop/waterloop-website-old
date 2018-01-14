(function($, TweenLite, TimelineLite){
  const container = $('#pod-container')
  const pod = $('#pod')
  let podStartAnimationPoint
  let timeline

  function setupTimeline () {
    const bodyHeight = $('body').height()
    const viewportHeight = $(window).innerHeight()
    const viewportWidth = $(window).innerWidth()
    podStartAnimationPoint = pod.offset().top + pod.height() - viewportHeight
    
    timeline = new TimelineLite()

    const animationDuration = viewportHeight * 0.8
    const fromOpts = {
      left: - pod.width()  // Start with the pod completely off screen
    }
    const toOpts = {
      left: viewportWidth,
      easee: Sine.easeInOut
    }

    timeline.fromTo(pod, animationDuration, fromOpts, toOpts, podStartAnimationPoint)
    timeline.pause()
  }

  function progressTimeline (fromTop) {
    if (
      this.timelinePosition === undefined ||
      fromTop > this.timelinePosition ||
      fromTop < podStartAnimationPoint
    ) {
      this.timelinePosition = fromTop
    }

    timeline.seek(this.timelinePosition)
  }

  setupTimeline()

  $(window).scroll(() => progressTimeline($(window).scrollTop()))
  $(window).resize(() => {
    console.log('resized')
    setupTimeline()
    progressTimeline($(window).scrollTop())
  })

  
})($, TweenLite, TimelineLite)
