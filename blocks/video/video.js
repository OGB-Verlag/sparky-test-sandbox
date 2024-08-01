/*
 * Video Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/video
 */

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

const getDefaultVideo = (
  url,
) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen="" allow="autoplay"
        scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
      </iframe>
    </div>`

const videoYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search)
  const suffix = autoplay ? '&muted=1&autoplay=1' : ''
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : ''
  const video = url.pathname
  if (url.origin.includes('youtu.be')) {
    ;[, vid] = url.pathname.split('/')
  }

  /*  const videoHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
        <iframe src="https://www.youtube.com${vid ? `/video/${vid}?rel=0&v=${vid}${suffix}` : video}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
        </div>`; 
    */

  const videoHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
        <iframe src="https://www.youtube.com/${video}?rel=0${suffix}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
      </div>`

  return videoHTML
}

const videoVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/')
  const suffix = autoplay ? '?muted=1&autoplay=1' : ''
  const videoHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
        <iframe src="https://player.vimeo.com/video/${video}${suffix}" 
        style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen  
        title="Content from Vimeo" loading="lazy"></iframe>
      </div>`
  return videoHTML
}

const videoTwitter = (url) => {
  const videoHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`
  loadScript('https://platform.twitter.com/widgets.js')
  return videoHTML
}

const videoMP4 = (url, autoplay) => {
  const autoplayAttr = autoplay ? 'autoplay loop muted' : ''
  const videoHTML = `<video width="800" controls ${autoplayAttr}>
  <source src="${url.href}" type="video/mp4">
  <source src="${url.href}" type="video/ogg">
  Your browser does not support HTML video.
</video>`
  return videoHTML
}

const loadVideo = (block, link, autoplay) => {
  if (block.classList.contains('video-is-loaded')) {
    return
  }

  const VIDEO_CONFIG = [
    {
      match: ['youtube', 'youtu.be'],
      video: videoYoutube,
    },
    {
      match: ['vimeo'],
      video: videoVimeo,
    },
    {
      match: ['twitter'],
      video: videoTwitter,
    },
    {
      match: ['mp4'],
      video: videoMP4,
    },
  ]

  const config = VIDEO_CONFIG.find((e) => e.match.some((match) => link.includes(match)))
  const url = new URL(link)
  if (config) {
    block.innerHTML = config.video(url, autoplay)
    block.classList = `block video video-${config.match[0]}`
  } else {
    block.innerHTML = getDefaultVideo(url)
    block.classList = 'block video'
  }
  block.classList.add('video-is-loaded')
}

export default function decorate(block) {
  const placeholder = block.querySelector('picture')
  const link = block.querySelector('a').href
  block.textContent = ''

  if (placeholder) {
    const wrapper = document.createElement('div')
    wrapper.className = 'video-placeholder'
    wrapper.innerHTML = '<div class="video-placeholder-play"><button type="button" title="Play"></button></div>'
    wrapper.prepend(placeholder)
    wrapper.addEventListener('click', () => {
      loadVideo(block, link, true)
      block.querySelector('video').play()
    })
    block.append(wrapper)
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect()
        loadVideo(block, link)
      }
    })
    observer.observe(block)
  }

  // playVideoOnClick(block);
}
