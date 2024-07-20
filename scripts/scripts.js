import {
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  fetchPlaceholders,
} from './aem.js'
const LCP_BLOCKS = [] // add your LCP blocks to the list

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName)
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr)
    if (value) {
      to.setAttribute(attr, value)
      from.removeAttribute(attr)
    }
  })
}

/**
 * create an element.
 * @param {string} tagName the tag for the element
 * @param {string|Array<string>} classes classes to apply
 * @param {object} props properties to apply
 * @param {string|Element} html content to add
 * @returns the element
 */
export function createElement(tagName, classes, props, html) {
  const elem = document.createElement(tagName)
  if (classes) {
    const classesArr = typeof classes === 'string' ? [classes] : classes
    elem.classList.add(...classesArr)
  }
  if (props) {
    Object.keys(props).forEach((propName) => {
      elem.setAttribute(propName, props[propName])
    })
  }

  if (html) {
    const appendEl = (el) => {
      if (el instanceof HTMLElement || el instanceof SVGElement) {
        elem.append(el)
      } else {
        elem.insertAdjacentHTML('beforeend', el)
      }
    }

    if (Array.isArray(html)) {
      html.forEach(appendEl)
    } else {
      appendEl(html)
    }
  }

  return elem
}
/* helper script start */
const pathname = location.pathname.replace('.html', '').split('/')
export let targetObject = {
  model: null,
  isMobile: window.matchMedia('(max-width: 767px)').matches,
  ctaPosition: 'Top Menu Bar',
  ctaPosition: 'Top Menu Bar',
  pageName: pathname[pathname.length - 1],
  isTab: window.matchMedia('(max-width: 1024px)').matches,
}

export function renderHelper(data, template, callBack) {
  var dom = document.createElement('div')
  dom.innerHTML = template
  var loopEl = dom.getElementsByClassName('forName')
  Array.prototype.slice.call(loopEl).forEach(function (eachLoop) {
    var templates = ''
    var localtemplate = eachLoop.innerHTML
    for (var key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        var element = data[key]
        // data.forEach(function (element, index) {
        var dataItem = callBack ? callBack(element, key) : element
        var keys = Object.keys(dataItem)
        var copyTemplate = localtemplate
        copyTemplate.split('{').forEach(function (ecahKey) {
          var key = ecahKey.split('}')[0]
          var keys = key.split('.')
          var value = dataItem
          keys.forEach(function (key) {
            if (value && value.hasOwnProperty(key)) {
              value = value[key]
            } else {
              value = ''
            }
          })
          copyTemplate = copyTemplate.replace('{' + key + '}', value)
        })
        templates += copyTemplate
        // });
      }
    }
    eachLoop.outerHTML = templates
  })
  return dom.innerHTML
}

export function fetchAPI(method, url, data) {
  return new Promise(async function (resolve, reject) {
    try {
      if (method === 'GET') {
        const resp = await fetch(url)
        resolve(resp)
      } else if (method === 'POST') {
        data.headerJson = data.headerJson || {
          'Content-Type': 'application/json',
        }
        data.headerJson['Content-Type'] = data.headerJson['Content-Type']
          ? data.headerJson['Content-Type']
          : 'application/json'
        const request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data.requestJson),
          headers: data.headerJson,
        })
        const response = await fetch(request)
        const json = await response.json()
        resolve({ responseJson: json })
      }
    } catch (error) {
      console.warn(error)
      reject(error)
    }
  })
}

export function getProps(block, config) {
  return Array.from(block.children).map(function (el, index) {
    if (config?.picture) {
      return el.innerHTML.includes('picture') ? el.querySelector('picture') : el.innerText.trim()
    } else if (config?.index && config?.index.includes(index)) {
      return el
    } else {
      return el.innerHTML.includes('picture') ? el.querySelector('img').src.trim() : el.innerText.trim()
    }
  })
}

export function currenyCommaSeperation(x) {
  if (typeof x === 'number') {
    x = x.toString()
  }

  // Split the number into integral and decimal parts
  const parts = x.split('.')
  let integralPart = parts[0]
  const decimalPart = parts[1] ? `.${parts[1]}` : ''

  // Add commas after every two digits from the right in the integral part
  integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,')

  return integralPart + decimalPart
}

export function createCarousle(block, prevButton, nextButton) {
  block.parentElement ? block.parentElement.append(prevButton) : block.append(prevButton)
  block.parentElement ? block.parentElement.append(nextButton) : block.append(nextButton)
  prevButton.addEventListener('click', function (e) {
    targetObject.carouselButton = this
    targetObject.carouselButton.disabled = true
    prevSlide(e)
  })
  targetObject.carouselButton = prevButton
  nextButton.addEventListener('click', function (e) {
    targetObject.carouselButton = this
    targetObject.carouselButton.disabled = true
    nextSlide(e)
  })
  if (block.querySelectorAll('.carousel-item').length < 4 && !targetObject.isMobile) {
    prevButton.classList.add('dp-none')
    nextButton.classList.add('dp-none')
  }
  let currentSlide = 0
  let isDragging = false
  let startPos = 0
  let currentTranslate = 0
  let prevTranslate = 0
  const carousel = block
  const carouselInner = block.querySelector('#carouselInner')
  const slides = block.querySelectorAll('.carousel-item')
  const totalSlides = slides.length

  let visibleSlides = getVisibleSlides() // Get initial number of visible slides

  carousel.addEventListener('mousedown', dragStart)
  carousel.addEventListener('mouseup', dragEnd)
  carousel.addEventListener('mouseleave', dragEnd)
  carousel.addEventListener('mousemove', drag)

  carousel.addEventListener('touchstart', dragStart)
  carousel.addEventListener('touchend', dragEnd)
  carousel.addEventListener('touchmove', drag)

  carousel.addEventListener('wheel', scrollEvent) // Add scroll event listener
  function carouselResizeEventHandler() {
    visibleSlides = getVisibleSlides()
    setPositionByIndex()
  }

  window.addEventListener('resize', () => {
    targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches
    carouselResizeEventHandler()
  })

  function dragStart(event) {
    isDragging = true
    startPos = getPositionX(event)
    carouselInner.style.transition = 'none'
  }

  function dragEnd() {
    isDragging = false
    const movedBy = currentTranslate - prevTranslate

    if (movedBy < -100) {
      nextSlide()
    } else if (movedBy > 100) {
      prevSlide()
    } else {
      setPositionByIndex()
    }
    targetObject.carouselButton.disabled = false
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
      carouselInner.style.transform = `translateX(${currentTranslate}px)`
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  function getVisibleSlides() {
    if (targetObject.isMobile) {
      return 2
    } else if (targetObject.isTab) {
      return 3
    }
    return 4
  }

  function showSlide(index) {
    if (index >= slides.length) {
      // currentSlide = 0;
    } else if (index < 0) {
      // currentSlide = slides.length - 1;
    } else {
    }
    currentSlide = Math.max(0, Math.min(index, totalSlides - visibleSlides))
    setPositionByIndex()
    console.log('targetObject.carouselButton :: ', targetObject.carouselButton)
    targetObject.carouselButton.disabled = false
  }

  const setPositionByIndex = targetObject.isTab
    ? function () {
        // Tab
        currentTranslate =
          (currentSlide * -carouselInner.clientWidth) / (block.closest('.carousel-3pt5') ? 2 : visibleSlides)
        console.log('currentSlide :: ', currentSlide)
        console.log('-carouselInner.clientWidth :: ', -carouselInner.clientWidth)
        console.log('visibleSlides :: ', visibleSlides)
        console.log('currentTranslate :: ', currentTranslate)
        console.log('length :: ', slides.length)
        console.log('check length :: ', currentSlide + 4 == slides.length)
        console.log('targetObject.isTab :: ', targetObject.isTab)
        prevTranslate = currentTranslate
        carouselInner.style.transition = 'transform 0.5s ease'
        if (block.closest('.carousel-3pt5') && !targetObject.isTab && currentSlide + 4 == slides.length) {
          // Desktop View Logic 3.5 carousel
          // carouselInner.style.transform = `translateX(${-600}px)`
          // carouselInner.style.transform = `translateX(${currentTranslate }px)`;
          carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`
        } else {
          if (block.closest('.carousel-3pt5') && targetObject.isTab && currentSlide) {
            // Tab View Logic 3.5 carousel
            if (currentSlide + 4 > slides.length) {
              // targetObject.currentTranslate = 40
              if (currentTranslate > -2100 && targetObject.currentTranslate < 50) {
                targetObject.currentTranslate = targetObject.currentTranslate
                  ? (targetObject.currentTranslate += 340)
                  : 40
              }
            } else {
              targetObject.currentTranslate = 0
            }
            carouselInner.style.transform = `translateX(${currentTranslate - targetObject.currentTranslate}px)`
          } else {
            if (block.closest('.carousel-3pt5') && currentSlide) {
              // Desktop View Logic 3.5 carousel
              carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`
            } else {
              carouselInner.style.transform = `translateX(${currentTranslate}px)`
            }
          }
        }
      }
    : function () {
        // Desktop
        currentTranslate = (currentSlide * -carouselInner.clientWidth) / visibleSlides
        currentTranslate = (currentSlide * -carouselInner.clientWidth) / visibleSlides
        console.log('currentSlide :: ', currentSlide)
        console.log('-carouselInner.clientWidth :: ', -carouselInner.clientWidth)
        console.log('visibleSlides :: ', visibleSlides)
        console.log('currentTranslate :: ', currentTranslate)
        console.log('length :: ', slides.length)
        console.log('check length :: ', currentSlide + 4 == slides.length)
        prevTranslate = currentTranslate
        carouselInner.style.transition = 'transform 0.5s ease'
        if (block.closest('.carousel-3pt5') && currentSlide + 4 == slides.length) {
          // carouselInner.style.transform = `translateX(${-600}px)`
          carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`
        } else {
          carouselInner.style.transform = `translateX(${currentTranslate}px)`
        }
      }

  function nextSlide(e) {
    // if (currentSlide) {
    //   nextButton.disabled = true;
    // }
    // if (e && !e.target.closest('.slide-next').classList.contains('light')) {
    showSlide(currentSlide + 1)
    checkLastChildVisibility()
    // }
  }

  function prevSlide() {
    // if (currentSlide) {
    //   prevButton.disabled = true;
    // }
    showSlide(currentSlide - 1)
    checkLastChildVisibility()
  }

  function scrollEvent(event) {
    if (event.deltaY < 0) {
      prevSlide()
    } else {
      nextSlide()
    }
    event.preventDefault()
  }

  // Initialize the carousel
  showSlide(currentSlide)

  // Check if the last child is visible in the viewport
  function checkLastChildVisibility() {
    const lastChild = carouselInner.lastElementChild
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nextButton.classList.add('light')
            nextButton.disabled = true
          } else {
            nextButton.disabled = false
            nextButton.classList.remove('light')
          }
        })
      },
      {
        root: carousel,
        threshold: block.closest('.carousel-3pt5') ? 1 : 0.1,
      },
    )

    observer.observe(lastChild)
    checkFirstChildVisibility()
  }
  function checkFirstChildVisibility() {
    const firstChild = carouselInner.firstChild
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prevButton.classList.add('light')
          } else {
            prevButton.classList.remove('light')
          }
        })
      },
      {
        root: carousel,
        threshold: block.closest('.carousel-3pt5') ? 1 : 0.1,
      },
    )

    observer.observe(firstChild)
  }

  // Initialize the observer for the first time
  checkLastChildVisibility()
}

window.addEventListener('resize', () => {
  targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches
})
export function createButton(text, picture) {
  const button = document.createElement('button')
  button.classList.add('carousel-control', text)
  button.innerHTML = picture
  return button
}

export async function decoratePlaceholder(block, path) {
  try {
    const resp = await fetchPlaceholders(path)
    console.log(resp)
    return renderHelper([resp], `<div class="forName">${block.innerHTML}</div>`)
  } catch (error) {
    console.warn(error)
  }
}

export function decorateViewMore(block) {
  const section = block.closest('.section')
  if (!section.classList.contains('view-more-btn')) return

  const displayCount = parseInt(
    Array.from(section.classList)
      .find((cls) => cls.endsWith('-item-display'))
      ?.replace('-item-display', '') || '0',
  )

  // const items = block.classList.contains('columns') ? block.children : block.parentElement.parentElement.children

  // const toggleVisibility = (showAll = false) => {
  //   ;[...items].forEach((item, index) => {
  //     item.classList.toggle('dp-none', !showAll && index >= displayCount)
  //   })
  // }

  // toggleVisibility()

  const viewBtn = section.querySelector('.default-content-wrapper .button-container')
  const viewLink = viewBtn.querySelector('a')

  viewBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const isViewMore = viewLink.textContent.trim().toLowerCase() === 'view more'
    toggleVisibility(isViewMore)
    viewLink.textContent = isViewMore ? 'View less' : 'View more'
  })
}

export function decorateAnchorTag(main) {
  try {
    main.querySelectorAll('a').forEach(function (anchor) {
      if (anchor.innerHTML.includes('<sub>')) {
        anchor.target = '_blank'
      } else if (anchor.href.includes('/modal-popup/')) {
        const paths = anchor.href.split('/')
        const dataid = paths[paths.length - 1]
        anchor.dataset.modelId = dataid
        targetObject.modelId = dataid
        anchor.dataset.href = anchor.href
        anchor.href = 'javascript:void(0)'
        anchor.addEventListener('click', function (e) {
          targetObject.models = document.querySelectorAll('.' + dataid)
          targetObject.models?.forEach(function (eachModel) {
            eachModel.classList.add('dp-none')
            eachModel.remove()
            body.prepend(eachModel)
          })
          e.preventDefault()
          body.style.overflow = 'hidden'

          targetObject.models?.forEach(function (eachModel) {
            eachModel.classList.remove('dp-none')
            const crossIcon = eachModel.querySelector('em')
            if (crossIcon.innerHTML.includes(':cross-icon')) {
              crossIcon.innerHTML = ''
              crossIcon.addEventListener('click', function (e) {
                eachModel.classList.add('dp-none')
              })
            }
          })
        })
      }
    })
  } catch (error) {
    console.warn(error)
  }
}
/* helper script end */

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  )
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`)
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true')
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error)
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateAnchorTag(main)
  decoratePlaceholder(main)
  decorateButtons(main)
  decorateIcons(main)
  buildAutoBlocks(main)
  decorateSections(main)
  decorateBlocks(main)
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en'
  decorateTemplateAndTheme()
  const main = doc.querySelector('main')
  if (main) {
    decorateMain(main)
    document.body.classList.add('appear')
    await waitForLCP(LCP_BLOCKS)
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts()
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main')
  await loadBlocks(main)

  const { hash } = window.location
  const element = hash ? doc.getElementById(hash.substring(1)) : false
  if (hash && element) element.scrollIntoView()

  loadHeader(doc.querySelector('header'))
  loadFooter(doc.querySelector('footer'))

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`)
  loadFonts()

  sampleRUM('lazy')
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'))
  sampleRUM.observe(main.querySelectorAll('picture > img'))
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000)
  // load anything that can be postponed to the latest here
  import('./sidekick.js').then(({ initSidekick }) => initSidekick())
}

async function loadPage() {
  await loadingCustomCss()
  await loadEager(document)
  await loadLazy(document)
  loadDelayed()
}

loadPage()

async function loadingCustomCss() {
  // load custom css files
  var loadCssArray = [
    `${window.hlx.codeBasePath}/styles/reset.css`,
    `${window.hlx.codeBasePath}/styles/key-features/key-features.css`,
    `${window.hlx.codeBasePath}/styles/tab-with-cards/tab-with-cards.css`,
    `${window.hlx.codeBasePath}/styles/rte-wrapper/rte-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/custom/mobile-sticky-button.css`,
    `${window.hlx.codeBasePath}/styles/custom/bg.css`,
    `${window.hlx.codeBasePath}/styles/custom/column.css`,
    `${window.hlx.codeBasePath}/styles/custom/flexbox.css`,
    `${window.hlx.codeBasePath}/styles/custom/font-style.css`,
    `${window.hlx.codeBasePath}/styles/custom/mobile.css`,
    `${window.hlx.codeBasePath}/styles/custom/margin.css`,
    `${window.hlx.codeBasePath}/styles/custom/padding.css`,
    `${window.hlx.codeBasePath}/styles/custom/width.css`,
  ]

  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss)
  })
}
