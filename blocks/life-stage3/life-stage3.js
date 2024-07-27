const badgeClass = 'badge-primary'

export default function decorate(block) {
  const [left, right] = block.children

  const topElement = document.createElement('div')
  topElement.classList.add('top-element')
  block.insertBefore(topElement, left)

  const firstButtonContainer = left.querySelector('.button-container')
  if (firstButtonContainer) {
    topElement.appendChild(firstButtonContainer)
  }

  left?.classList.add('column-left')
  right?.classList.add('column-right')

  left?.querySelectorAll('ul').forEach((ul) => {
    ul.classList.add('badges')
    ul.querySelectorAll('li').forEach((li) => {
      li.classList.add('badge', badgeClass)
    })
  })

  const columnsWrapper = document.createElement('div')
  columnsWrapper.classList.add('columns-wrapper')
  columnsWrapper.appendChild(left)
  columnsWrapper.appendChild(right)
  block.appendChild(columnsWrapper)

  const secondButtonContainer = left.querySelectorAll('.button-container')[0]
  if (secondButtonContainer) {
    const secondButton = secondButtonContainer.querySelector('.button')
    if (secondButton) {
      secondButton.classList.remove('button')
      secondButton.classList.add('second-button')
    }
  }
}
