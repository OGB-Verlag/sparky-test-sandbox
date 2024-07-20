export default function decorate(block) {
  const firstDiv = block.querySelector('div')

  if (firstDiv) {
    switch (true) {
      case block.classList.contains('image-advanced-align-right'):
        firstDiv.style.textAlign = 'right'
        break
      case block.classList.contains('image-advanced-align-left'):
        firstDiv.style.textAlign = 'left'
        break
      case block.classList.contains('image-advanced-align-center'):
        firstDiv.style.textAlign = 'center'
        break
      default:
        break
    }
  }
}
