export default function decorate(block) {
  const wrapperDiv = block.closest('.image-advanced-wrapper')
  if (wrapperDiv) {
    if (block.classList.contains('image-advanced-align-right')) {
      wrapperDiv.classList.add('image-advanced-align-right')
    } else if (block.classList.contains('image-advanced-align-left')) {
      wrapperDiv.classList.add('image-advanced-align-left')
    } else if (block.classList.contains('image-advanced-align-center')) {
      wrapperDiv.classList.add('image-advanced-align-center')
    }
  }
}
