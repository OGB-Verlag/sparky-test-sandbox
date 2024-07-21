export default function decorate(block) {
  const wrapperDiv = block.closest('.image-advanced-wrapper')
  if (wrapperDiv) {
    if (block.classList.contains('image-advanced-align-left')) {
      block.classList.remove('image-advanced-align-left')
      wrapperDiv.classList.add('image-advanced-align-left')
    }

    if (block.classList.contains('image-advanced-align-right')) {
      block.classList.remove('image-advanced-align-right')
      wrapperDiv.classList.add('image-advanced-align-right')
    }

    if (block.classList.contains('image-advanced-align-center')) {
      block.classList.remove('image-advanced-align-center')
      wrapperDiv.classList.add('image-advanced-align-center')
    }

    if (block.classList.contains('image-advanced-role-none')) {
      block.classList.remove('image-advanced-role-none')
      block.classList.remove('image-advanced-role-presentation')
      wrapperDiv.setAttribute('role', 'none')
    } else {
      wrapperDiv.setAttribute('role', 'presentation')
    }
  }
}
