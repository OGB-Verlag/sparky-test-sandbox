export default function decorate(block) {
  const [leftDiv, rightDiv] = block.children

  const topDiv = document.createElement('div')
  topDiv.classList.add('top-div')
  block.insertBefore(topDiv, leftDiv)

  leftDiv?.classList.add('column-left')
  rightDiv?.classList.add('column-right')

  const columnsWrapper = document.createElement('div')
  columnsWrapper.classList.add('columns-wrapper')

  // Reverse the order of columns
  columnsWrapper.appendChild(leftDiv)
  columnsWrapper.appendChild(rightDiv)
  block.appendChild(columnsWrapper)

  // Add badges to the Text column
  // the tag list is the last pargraph before the link if there are 3 paragraphs or more
  // or the last paragraph if there are 2 paragraphs, that has only a single child node (text)
  const contentPars = leftDiv.querySelectorAll('p');
  const lastContentPar = contentPars[contentPars.length - 1];
  let tagListPar;
  if (lastContentPar.matches('.button-container') && contentPars.length > 2) {
    tagListPar = contentPars[contentPars.length - 2];
  } else if (contentPars.length > 1) {
    tagListPar = contentPars[contentPars.length - 1];
  }
  if (tagListPar && tagListPar.childNodes.length === 1) {
    const ul = document.createElement('ul');
    ul.className = 'badges';
    tagListPar.textContent.split(',').forEach((tag) => {
      const li = document.createElement('li');
      li.textContent = tag.trim();
      li.className = 'badge';
      ul.appendChild(li);
    });
    tagListPar.replaceWith(ul);
  }

  // Move the first button to 'top-div'
  const firstButtonContainer = leftDiv.querySelector('.button-container')
  if (firstButtonContainer) {
    topDiv.appendChild(firstButtonContainer)
  }

  // Replace first 'button' with 'second-button'
  const secondButtonContainer = leftDiv.querySelectorAll('.button-container')[0]
  if (secondButtonContainer) {
    const secondButton = secondButtonContainer.querySelector('.button')
    if (secondButton) {
      secondButton.classList.remove('button')
      secondButton.classList.add('second-button')
    }
  }

  rightDiv.dataset.aos = 'fade-in';
}
