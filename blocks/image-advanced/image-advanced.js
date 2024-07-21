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

    const pictureElement = wrapperDiv.querySelector('picture')
    if (pictureElement) {
      const imgElement = pictureElement.querySelector('img')
      if (block.classList.contains('image-advanced-role-none')) {
        block.classList.remove('image-advanced-role-none')
        pictureElement.setAttribute('role', 'none')
      } else {
        block.classList.remove('image-advanced-role-presentation')
        pictureElement.setAttribute('role', 'presentation')
        if (imgElement) {
          imgElement.removeAttribute('alt')
        }
      }
    }
  }
}
