/**
 * Adds a sr-only div to the body with the passed string as it's contents.
 * The div has aria-live set to polite, so it will be annonced by screenreaders.
 * There is a sticky parameter that will allow the div to stay on the screen.
 * If set to true after 10 or more seconds, the div is removed from the DOM.
 * @param  {string} str - the text to be announced
 * @param  {boolean} [sticky] - fixates the live region to the document, defaults to false
 */
export default function announce(str, sticky = false) {
  if (typeof str !== 'string') {
    return;
  }

  const time = (str.length * 200) + 10000;

  const announceEl = document.createElement('div');

  announceEl.style.cssText = `
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    clipPath: inset(50%);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
    whiteSpace: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `;

  announceEl.setAttribute('aria-live', 'polite');
  announceEl.setAttribute('id', 'announcement');
  document.body.appendChild(announceEl);

  // added slight timeout so that instructions get announced once the modal content read
  setTimeout(() => {
    announceEl.innerHTML = str;
  }, 2000);

  if (!sticky) {
    setTimeout(() => {
      announceEl.remove();
    }, time);
  }
}
