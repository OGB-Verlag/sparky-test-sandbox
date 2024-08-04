export default function decorate(block) {
  const button = document.createElement('a')
  button.classList.add('backward-button')
  button.textContent = 'zurück zur Startseite'
  button.setAttribute('href', '/')
  button.style.textDecoration = 'underline'

  const backwardSVG = document.createElement('img')
  // Make icon vissible also from Universal Editor
  // backwardSVG.src = '../../icons/backward.svg'
  backwardSVG.src = 'https://raw.githubusercontent.com/OGB-Verlag/sparky-test-sandbox/main/assets/icons/backward.svg'
  https: backwardSVG.style.marginRight = '0.5rem'
  backwardSVG.style.position = 'relative'
  backwardSVG.style.top = '7px'
  button.insertBefore(backwardSVG, button.firstChild)

  block.appendChild(button)
}
