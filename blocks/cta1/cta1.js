export default function decorate(block) {
  const button = block.querySelector('.button')

  if (button) {
    // Insert icon after the button text
    const afterIcon = document.createElement('img')
    afterIcon.src = '../../icons/linkforward.svg'
    afterIcon.style.marginLeft = '0.5rem'
    afterIcon.style.position = 'relative'
    button.appendChild(afterIcon)
  }
}
