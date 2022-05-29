export default function promiseClick(button) {
  button.addEventListener('click', event => {
   new Promise((resolve, reject) => {
      return resolve(event);
    })
  }, {once: true})
}

promiseClick(button)
  .then(event => {
    return console.log(event);
  })
