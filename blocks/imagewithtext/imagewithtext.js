export default function decorate(block) {
  const imagewithText = document.querySelector('.imagewithtext')
  if (imagewithText) {
    imagewithText.dataset.aos = 'zoom-in'
  }
}
