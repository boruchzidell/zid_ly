

async function submitForm(event) {
    event.preventDefault();

    let originalUrl = this.elements[0].value;

    let response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({url: originalUrl}),
      headers: { "Content-Type": "application/json" }
    });

    let hex = await response.text();

    let container = document.getElementById('container');

    let link = container.querySelector('a');
    link.setAttribute('href', `/${hex}`);
    link.textContent = `${window.location.href}${hex}`;

    document.querySelector('input[type=submit]').disabled = true;
    document.querySelector('#original-url').setAttribute('readonly', true);

    document.querySelectorAll('.hidden').forEach(el => el.className = 'show')

  }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('url-form').addEventListener('submit', submitForm);

  document.body.addEventListener('click', function(event) {
    let button = event.target;

    if (button.id === 'copy-btn') {
      let text = document.getElementById('shortened-url').textContent
      window.navigator.clipboard.writeText(text);

      button.innerText = 'Copied';

      // button.textContent = '  Copied   ';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = 'Copy';
        button.disabled = false;
        // button.style.background = 'lightgray';
      }, 2000)
    }
  // });

  // for (let i = 0; i < codes.length; i += 1) {
  //   let button = document.createElement('button');
  //   button.classList.add('copy_btn');
  //   button.textContent = 'Copy code';
  //   button.style.float = 'right';
  //   /*Makes button stay on top of other elements, and only works on positioned elements (absolute, relative, etc)*/
  //   button.style.position = 'relative'
  //   button.style.zIndex = '150';

  //   button.style.background = 'lightgray';
  //   button.style.color = 'black'
  //   button.style.fontSize = '.8em';
  //   button.style.minWidth = '7em';
  //   button.style.minHeight = '2em';
  //   button.style.cursor = 'pointer';
  //   button.style.margin = '0px';
  //   button.style.padding = '0px';

  //   codes[i].prepend(button);

  //   // Delete button on right-click
  //   button.addEventListener('contextmenu', function(event) {
  //     event.preventDefault();
  //     this.remove();
  //   });

    // Simulate :hover
    // button.addEventListener('mouseover', function() {
    //   this.style.background = 'darkgray';
    // });

    // button.addEventListener('mouseleave', function() {
    //   this.style.background = 'lightgray'
    // });
  })
});



// let url = 'http://localhost:5000/users'
// fetch(url, {
//     method: "POST",
//     body: JSON.stringify({username: "Demo"}),
//     headers: {"Content-Type": "application/json"}
// }).then(res => res.json()).then(resBody => console.log(resBody));
