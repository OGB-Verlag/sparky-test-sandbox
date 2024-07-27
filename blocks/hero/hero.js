export default function decorate(block) {
  const arrowContainer = document.createElement('div')
  arrowContainer.classList.add('arrow-container')
  block.appendChild(arrowContainer)
  arrowContainer.addEventListener('click', function () {
    window.scrollBy({
      top: 490,
      behavior: 'smooth',
    })
  })
}
