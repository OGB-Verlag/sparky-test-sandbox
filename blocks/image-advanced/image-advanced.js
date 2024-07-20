export default function decorate(block) {
  const firstDiv = block.querySelector('div')

  if (firstDiv) {
    if (block.classList.contains('image-advanced-align-right')) {
      firstDiv.classList.add('image-advanced-align-right')
    } else if (block.classList.contains('image-advanced-align-left')) {
      firstDiv.classList.add('image-advanced-align-left')
    } else if (block.classList.contains('image-advanced-align-center')) {
      firstDiv.classList.add('image-advanced-align-center')
    }
  }
}
