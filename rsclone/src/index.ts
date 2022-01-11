
async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  document.body.appendChild(subHeader);
}

render();
