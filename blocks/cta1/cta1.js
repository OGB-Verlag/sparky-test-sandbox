export default function decorate(block) {
  const button = block.querySelector('.button')

  if (button) {
    // Insert icon after the button text
    const afterIcon = document.createElement('img')
    // Make icon vissible also from Universal Editor
    // afterIcon.src = '../../icons/linkforward.svg'
    afterIcon.src = 'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/linkforward.svg'
    afterIcon.style.marginLeft = '0.5rem'
    afterIcon.style.position = 'relative'
    button.appendChild(afterIcon)
  }
}
