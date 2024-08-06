export default function decorate(block) {
  const button = block.querySelector('.button')

  if (button) {
    const beforeIcon = document.createElement('img')
    // beforeIcon.src = '../../icons/blueherz.svg'
    // Make icon vissible also from Universal Editor
    beforeIcon.src = 'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/blueherz.svg'

    beforeIcon.style.marginRight = '0.6rem'
    button.insertBefore(beforeIcon, button.firstChild)

    const afterIcon = document.createElement('img')
    afterIcon.src = 'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/blueherz.svg'
    afterIcon.style.marginLeft = '0.7rem'
    button.appendChild(afterIcon)

    // Rotate icons
    beforeIcon.style.transform = 'rotate(90deg)'
    afterIcon.style.transform = 'rotate(90deg)'
  }
}
