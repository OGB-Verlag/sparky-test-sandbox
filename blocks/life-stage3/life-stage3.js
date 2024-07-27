const badgeClass = 'badge-primary'

export default function decorate(block) {
  const [leftDiv, rightDiv] = block.children

  const topDiv = document.createElement('div')
  topDiv.classList.add('top-div')
  block.insertBefore(topDiv, leftDiv, rightDiv)

  leftDiv?.classList.add('column-left')
  rightDiv?.classList.add('column-right')

  const columnsWrapper = document.createElement('div')
  columnsWrapper.classList.add('columns-wrapper')
  columnsWrapper.appendChild(leftDiv)
  columnsWrapper.appendChild(rightDiv)
  block.appendChild(columnsWrapper)

  ////////////////////////
  // Move the first button to the top element
  const firstButtonContainer = leftDiv.querySelector('.button-container')
  if (firstButtonContainer) {
    topDiv.appendChild(firstButtonContainer)
  }

  const secondButtonContainer = leftDiv.querySelectorAll('.button-container')[0]
  if (secondButtonContainer) {
    const secondButton = secondButtonContainer.querySelector('.button')
    if (secondButton) {
      secondButton.classList.remove('button')
      secondButton.classList.add('second-button')
    }
  }
}
