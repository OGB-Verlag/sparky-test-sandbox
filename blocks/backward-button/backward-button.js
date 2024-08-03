export default function decorate(block) {
  const backwardSVG = document.createElement('img')
  backwardSVG.src = '../../icons/backward.svg'
  backwardSVG.style.marginRight = '8px'
  backwardSVG.style.position = 'relative'
  backwardSVG.style.top = '-1px'
  secondButton.insertBefore(backwardSVG, secondButton.firstChild)
}
