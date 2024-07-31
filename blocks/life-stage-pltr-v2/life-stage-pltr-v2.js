import { setupFadeInObserver } from '../../utils/animations/fadeIn.js'

export default function decorate(block) {
  const [leftDiv, rightDiv] = block.children

  const topDiv = document.createElement('div')
  topDiv.classList.add('top-div')
  block.insertBefore(topDiv, leftDiv)

  leftDiv?.classList.add('column-left')
  rightDiv?.classList.add('column-right')

  // AOS add Styling
  leftDiv?.setAttribute('data-aos', 'fade-left');

  const columnsWrapper = document.createElement('div')
  columnsWrapper.classList.add('columns-wrapper')

  // Reverse the order of columns
  columnsWrapper.appendChild(rightDiv)
  columnsWrapper.appendChild(leftDiv)
  block.appendChild(columnsWrapper)

  // Add badges to the Text column
  leftDiv?.querySelectorAll('ul').forEach((ul) => {
    ul.classList.add('badges')
    ul.querySelectorAll('li').forEach((li) => {
      li.classList.add('badge')
    })
  })

  // Move the first button to 'top-div'
  const firstButtonContainer = leftDiv.querySelector('.button-container')
  if (firstButtonContainer) {
    topDiv.appendChild(firstButtonContainer)
  }

  // Replace first 'button'  with 'second-button'
  const secondButtonContainer = leftDiv.querySelectorAll('.button-container')[0]
  if (secondButtonContainer) {
    const secondButton = secondButtonContainer.querySelector('.button')
    if (secondButton) {
      secondButton.classList.remove('button')
      secondButton.classList.add('second-button')
    }
  }

  setupFadeInObserver([rightDiv], 2800, true) // `true` to allow multiple times observation
}
