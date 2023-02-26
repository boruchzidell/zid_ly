let shrinkMeButton = document.querySelector('input[type=submit]');
let urlInput = document.getElementById('original-url');
let container = document.getElementById('container');

async function submitFormHandler(event) {
  event.preventDefault();
  let originalUrl = urlInput.value;

  let response = await fetch('/', {
    method: 'POST',
    body: JSON.stringify({url: originalUrl}),
    headers: {'Content-Type': 'application/json'},
  });
  let hex = await response.text();

  if (response.status !== 200) {
    return;
  }

  let link = container.querySelector('a');
  link.setAttribute('href', `/${hex}`); // relative URL si it works in both dev and prod
  link.textContent = `${window.location.href}${hex}`;

  disableSubmit(false);

  urlInput.setAttribute('readonly', true);

  document.querySelectorAll('.hidden').forEach((el) => (el.className = 'show'));
}

function copyButtonHandler(event) {
  let text = document.getElementById('shortened-url').textContent;

  window.navigator.clipboard.writeText(text);

  this.innerText = 'Copied';
  this.disabled = true;

  // Re-enable after timeout
  setTimeout(() => {
    this.textContent = 'Copy';
    this.disabled = false;
  }, 2 * 1000);
}

function disableSubmit(border = true) {
  shrinkMeButton.disabled = true;

  urlInput.style.border = border ? 'solid red 1px' : null;

  urlInput.style.outline = 'none';

  shrinkMeButton.title = 'A valid URL starts with http';
}

function enableSubmit() {
  urlInput.style.border = null;

  shrinkMeButton.disabled = false;

  shrinkMeButton.title = '';
}

function validateUrlHandler() {
  let val = this.value;

  let options = {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_host: true,
    require_port: false,
    require_valid_protocol: true,
    allow_underscores: false,
    allow_protocol_relative_urls: true,
  };

  if (!validator.isURL(val, options)) {
    disableSubmit();
    // console.log('invalid!');
  }

  if (validator.isURL(val, options)) {
    enableSubmit();
    // console.log('valid!');
  }

  if (val === '') {
    disableSubmit(false);
    // console.log('empty!');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('url-form').addEventListener('submit', submitFormHandler);
  document.getElementById('copy-btn').addEventListener('click', copyButtonHandler);
  document.getElementById('original-url').addEventListener('input', validateUrlHandler);
});
