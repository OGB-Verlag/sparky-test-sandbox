export default function decorate(block) {
  const wrapperDiv = block.closest('.title-advanced2-wrapper')
  if (wrapperDiv) {
    if (block.classList.contains('title-advanced2-align-left')) {
      block.classList.remove('title-advanced2-align-left')
      wrapperDiv.classList.add('title-advanced2-align-left')
    }

    if (block.classList.contains('title-advanced2-align-right')) {
      block.classList.remove('title-advanced2-align-right')
      wrapperDiv.classList.add('title-advanced2-align-right')
    }

    if (block.classList.contains('title-advanced2-align-center')) {
      block.classList.remove('title-advanced2-align-center')
      wrapperDiv.classList.add('title-advanced2-align-center')
    }
  }
}
