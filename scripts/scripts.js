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
    `${window.hlx.codeBasePath}/styles/custom/bg.css`,
    `${window.hlx.codeBasePath}/styles/custom/column.css`,
    `${window.hlx.codeBasePath}/styles/custom/flexbox.css`,
    `${window.hlx.codeBasePath}/styles/custom/mobile.css`,
    `${window.hlx.codeBasePath}/styles/custom/margin.css`,
    `${window.hlx.codeBasePath}/styles/custom/mobile-sticky-button.css`,
    `${window.hlx.codeBasePath}/styles/custom/padding.css`,
    `${window.hlx.codeBasePath}/styles/custom/width.css`,
    `${window.hlx.codeBasePath}/styles/reset.css`,
  ]

  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss)
  })
}
