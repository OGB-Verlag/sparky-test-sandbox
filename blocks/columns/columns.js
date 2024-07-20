export default function decorate(block) {
  const cols = [...block.firstElementChild.children]
  block.classList.add(`columns-${cols.length}-cols`)

  // setup image columns
  ;[...block.children].forEach((row) => {
    ;[...row.children].forEach((col) => {
      const pic = col.querySelector('picture')
      const video = col.querySelector('video')
      if (pic) {
        const picWrapper = pic.closest('div')
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col')
        }
      }
      if (video) {
        const videoWrapper = video.closest('div')
        if (videoWrapper && videoWrapper.children.length === 1) {
          // video is only content in column
          videoWrapper.classList.add('columns-video-col')
        }
      }
    })
  })
}
