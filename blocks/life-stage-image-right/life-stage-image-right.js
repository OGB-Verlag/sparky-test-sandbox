export default function decorate(block) {
  const [leftDiv, rightDiv] = block.children

  const topDiv = document.createElement('div')
  topDiv.classList.add('top-div')
  block.insertBefore(topDiv, leftDiv)

  leftDiv?.classList.add('column-left')
  rightDiv?.classList.add('column-right')

  const columnsWrapper = document.createElement('div')
  columnsWrapper.classList.add('columns-wrapper')
  block.appendChild(columnsWrapper)

  // check screen width and update column order to have img allways on top
  const updateColumnOrder = () => {
    // Clear existing children
    while (columnsWrapper.firstChild) {
      columnsWrapper.removeChild(columnsWrapper.firstChild)
    }
    if (window.innerWidth < 900) {
      columnsWrapper.appendChild(rightDiv)
      columnsWrapper.appendChild(leftDiv)
    } else {
      columnsWrapper.appendChild(leftDiv)
      columnsWrapper.appendChild(rightDiv)
    }
  }

  updateColumnOrder()

  // resize event listener
  window.addEventListener('resize', updateColumnOrder)

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

  // Replace first 'button' with 'second-button' and insert SVG icons
  const secondButtonContainer = leftDiv.querySelectorAll('.button-container')[0]
  if (secondButtonContainer) {
    const secondButton = secondButtonContainer.querySelector('.button')
    if (secondButton) {
      secondButton.classList.remove('button')
      secondButton.classList.add('second-button')

      // Insert icon before and after the button text
      const herzSVG = document.createElement('img')
      // Make icon vissible also from Universal Editor
      //herzSVG.src = '../../icons/herz.svg'
      herzSVG.src = 'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/herz.svg'
      herzSVG.style.marginRight = '8px'
      herzSVG.style.position = 'relative'
      herzSVG.style.top = '-1px'
      secondButton.insertBefore(herzSVG, secondButton.firstChild)

      const arrowSVG = document.createElement('img')
      arrowSVG.src =
        'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/linkforward.svg'
      arrowSVG.style.marginLeft = '16px'
      arrowSVG.style.position = 'relative'
      arrowSVG.style.top = '-2px'
      secondButton.appendChild(arrowSVG)
    }
  }

  // AOS https://michalsnik.github.io/aos/
  // Animation based on screen width
  const setAOSAnimation = () => {
    if (window.innerWidth < 900) {
      rightDiv.dataset.aos = 'zoom-in'
      leftDiv.dataset.aos = ''
    } else {
      rightDiv.dataset.aos = 'zoom-in-right'
      leftDiv.dataset.aos = 'zoom-in-left'
    }
  }

  setAOSAnimation()

  // Event listener for AOS animation
  window.addEventListener('resize', setAOSAnimation)
}