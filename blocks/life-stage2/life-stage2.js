const badgeClasses = ['badge-primary', 'badge-secondary', 'badge-success', 'badge-danger']

export default function decorate(block) {
  const [left, right] = block.children

  left.classList.add('column-left')
  right?.classList.add('column-right')

  right.querySelectorAll('ul').forEach((ul) => {
    ul.classList.add('badges');
    ul.querySelectorAll('li').forEach((li, i) => {
      li.classList.add('badge')
      li.classList.add(badgeClasses[i % badgeClasses.length])
    });
  });

  block.style.display = 'flex'
  block.style.justifyContent = 'space-between'
  block.style.alignItems = 'flex-start'
}
