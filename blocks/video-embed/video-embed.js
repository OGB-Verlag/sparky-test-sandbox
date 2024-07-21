/*
 * videoEmbed Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/videoEmbed
 */
// Eslint formating

const loadScript = (url, callback, type) => {
  const head = document.querySelector('head')
  const script = document.createElement('script')
  script.src = url
  if (type) {
    script.setAttribute('type', type)
  }
  script.onload = callback
  head.append(script)
  return script
}

const getDefaultvideoEmbed = (
  url,
) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
        scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
    </div>`

const videoEmbedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search)
  const suffix = autoplay ? '&muted=1&autoplay=1' : ''
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : ''
  const videoEmbed = url.pathname
  if (url.origin.includes('youtu.be')) {
    ;[, vid] = url.pathname.split('/')
  }
  const videoEmbedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
        <iframe src="https://www.youtube.com${
          vid ? `/videoEmbed/${vid}?rel=0&v=${vid}${suffix}` : videoEmbed
        }" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
        </div>`
  return videoEmbedHTML
}

const videoEmbedVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/')
  const suffix = autoplay ? '?muted=1&autoplay=1' : ''
  const videoEmbedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
        <iframe src="https://player.vimeo.com/video/${video}${suffix}" 
        style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen  
        title="Content from Vimeo" loading="lazy"></iframe>
        </div>`
  return videoEmbedHTML
}

const videoEmbedTwitter = (url) => {
  const videoEmbedHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`
  loadScript('https://platform.twitter.com/widgets.js')
  return videoEmbedHTML
}

const videoEmbedVideoMP4 = (url) => {
  const videoEmbedHTML = `<video width="800" controls>
  <source src="${url.href}" type="video/mp4">
  <source src="${url.href}" type="video/ogg">
  Your browser does not support HTML video.
</video>`
  return videoEmbedHTML
}

const loadVideoEmbed = (block, link, autoplay) => {
  if (block.classList.contains('videoEmbed-is-loaded')) {
    return
  }

  const EMBEDS_CONFIG = [
    {
      match: ['youtube', 'youtu.be'],
      videoEmbed: videoEmbedYoutube,
    },
    {
      match: ['vimeo'],
      videoEmbed: videoEmbedVimeo,
    },
    {
      match: ['twitter'],
      videoEmbed: videoEmbedTwitter,
    },
    {
      match: ['mp4'],
      videoEmbed: videoEmbedVideoMP4,
    },
  ]

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)))
  const url = new URL(link)
  if (config) {
    block.innerHTML = config.videoEmbed(url, autoplay)
    block.classList = `block videoEmbed videoEmbed-${config.match[0]}`
  } else {
    block.innerHTML = getDefaultvideoEmbed(url)
    block.classList = 'block videoEmbed'
  }
  block.classList.add('videoEmbed-is-loaded')
}

export default function decorate(block) {
  const placeholder = block.querySelector('picture')
  const link = block.querySelector('a').href
  block.textContent = ''

  if (placeholder) {
    const wrapper = document.createElement('div')
    wrapper.className = 'videoEmbed-placeholder'
    wrapper.innerHTML = '<div class="videoEmbed-placeholder-play"><button type="button" title="Play"></button></div>'
    wrapper.prepend(placeholder)
    wrapper.addEventListener('click', () => {
      loadVideoEmbed(block, link, true)
    })
    block.append(wrapper)
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect()
        loadVideoEmbed(block, link)
      }
    })
    observer.observe(block)
  }
}
