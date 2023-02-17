document.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('url-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log('hi');
  });
});
