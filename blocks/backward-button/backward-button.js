export default function decorate(block) {
  const button = block.querySelector('.button')

  if (button) {
    // Insert icon before the button text
    const backwardSVG = document.createElement('img')
    backwardSVG.src = '../../icons/backward.svg'
    backwardSVG.style.marginRight = '0.6rem'
    button.insertBefore(backwardSVG, button.firstChild)

    // button.classList.remove('button')
    button.classList.add('backward-button')
    button.textContent = 'zurück zur Startseite'
    button.setAttribute('href', '/')
  }
}
