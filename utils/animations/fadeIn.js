// fadeIn.js
export function fadeIn(element, duration = 600) {
  element.style.display = ''
  element.style.opacity = 0
  let last = +new Date()
  const tick = function () {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration
    last = +new Date()
    if (+element.style.opacity < 1) {
      ;(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  }
  tick()
}

const observedElements = new Set()

export function setupFadeInObserver(elements, duration = 600, multipleTimes = false) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fadeIn(entry.target, duration)
        if (!multipleTimes) {
          observer.unobserve(entry.target)
        }
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  elements.forEach((element) => {
    if (multipleTimes || !observedElements.has(element)) {
      observer.observe(element)
      observedElements.add(element)
    }
  })
}
