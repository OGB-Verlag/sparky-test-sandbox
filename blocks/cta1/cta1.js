export default function decorate(block) {
  const buttons = block.querySelectorAll('.cta1 .button')

  buttons.forEach((button) => {
    // Insert icon after the button text
    const afterIcon = document.createElement('img')
    afterIcon.src = '../../icons/linkforward.svg'
    afterIcon.style.marginLeft = '0.5rem'
    afterIcon.style.position = 'relative'
    button.appendChild(afterIcon)
  })
}
