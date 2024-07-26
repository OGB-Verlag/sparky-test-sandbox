export default function decorate(block) {
  const arrowContainer = document.createElement('div')
  arrowContainer.classList.add('arrow-container')

  const arrowLink = document.createElement('a')
  arrowLink.href = '#'

  arrowContainer.appendChild(arrowLink)

  block.appendChild(arrowContainer)

  arrowLink.addEventListener('click', function (event) {
    event.preventDefault()
    window.scrollBy({
      top: 1024,
      behavior: 'smooth',
    })
  })
}
