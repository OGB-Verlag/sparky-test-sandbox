export default function decorate(block) {
  const columns = block.children

  if (columns.length >= 2) {
    columns[0].classList.add('column-left')
    columns[1].classList.add('column-right')

    const paragraph = columns[1].querySelector('p')
    const contents = Array.from(paragraph.childNodes)

    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')

    div1.classList.add('text-section-1')
    div2.classList.add('text-section-2')
    div3.classList.add('text-section-3')

    let strongCount = 0

    contents.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE || node.tagName === 'BR') {
        if (strongCount === 0) {
          div1.appendChild(node.cloneNode(true))
        } else if (strongCount === 1) {
          div2.appendChild(node.cloneNode(true))
        } else if (strongCount === 2) {
          div3.appendChild(node.cloneNode(true))
        }
      } else if (node.tagName === 'STRONG') {
        strongCount++
        if (strongCount === 1) {
          div2.appendChild(node.cloneNode(true))
        } else if (strongCount === 2) {
          div3.appendChild(node.cloneNode(true))
        }
      }
    })

    const section2Content = Array.from(div2.childNodes)
    div2.innerHTML = ''
    section2Content.forEach((node, index) => {
      const newDiv = document.createElement('div')
      newDiv.classList.add(`text-section-2-${index + 1}`)
      newDiv.appendChild(node.cloneNode(true))
      div2.appendChild(newDiv)
    })

    const section2_3 = div2.querySelector('.text-section-2-3')
    if (section2_3) {
      const words = section2_3.innerHTML.split(' ')
      section2_3.innerHTML = ''
      const badgeClasses = ['badge-primary', 'badge-secondary', 'badge-success', 'badge-danger']
      words.forEach((word, index) => {
        const span = document.createElement('span')
        span.classList.add('badge')
        span.classList.add(badgeClasses[index % badgeClasses.length])
        span.textContent = word
        section2_3.appendChild(span)
        section2_3.appendChild(document.createTextNode(' '))
      })
    }

    paragraph.innerHTML = ''
    columns[1].appendChild(div1)
    columns[1].appendChild(div2)
    columns[1].appendChild(div3)
  }

  block.style.display = 'flex'
  block.style.justifyContent = 'space-between'
  block.style.alignItems = 'flex-start'
}
