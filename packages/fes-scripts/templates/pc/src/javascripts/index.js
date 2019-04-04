import a from './modules/a';

function component() {
  const element = document.createElement('div');
  element.onclick = a;
  element.innerHTML = 'the ant will get color on cursor over it! !';
  return element;
}
let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    document.body.removeChild(element);
  });

  module.hot.accept('./modules/a', () => {
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}