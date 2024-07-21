export default function decorate(block) {
  const wrapperDiv = block.closest('.title-advanced-wrapper')
  if (wrapperDiv) {
    if (block.classList.contains('title-advanced-align-left')) {
      block.classList.remove('title-advanced-align-left')
      wrapperDiv.classList.add('title-advanced-align-left')
    }

    if (block.classList.contains('title-advanced-align-right')) {
      block.classList.remove('title-advanced-align-right')
      wrapperDiv.classList.add('title-advanced-align-right')
    }

    if (block.classList.contains('title-advanced-align-center')) {
      block.classList.remove('title-advanced-align-center')
      wrapperDiv.classList.add('title-advanced-align-center')
    }
  }
}
