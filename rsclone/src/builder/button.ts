
class ButtonEffect{
  devideButton(node: HTMLElement){
    let text = node.textContent as string;
    node.textContent = '';
    while(text.length > 0){
      const letter = document.createElement('span');
      letter.textContent = text[0];
      letter.classList.add('btn__letter');
      node.append(letter);
      text = text.slice(1, text.length);
    }
  }
}

export default ButtonEffect;