function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');
  btn.addEventListener('click', () => {
    if (text.hidden !== true) {
      return text.hidden = true;
    }
    return text.hidden = false;
  });
}
