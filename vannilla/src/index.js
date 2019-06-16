import cislonaslova from 'cislonaslova';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = ['Hello', 'webpack', cislonaslova(53)].join(' ');

  return element;
}

document.body.appendChild(component());
