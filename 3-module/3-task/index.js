function camelize(str) {
  let arr = str.split('');
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '-') {
      arr.splice(i, 1);
      res.push(arr[i].toUpperCase());

    } else {
      res.push(arr[i]);
    }
  }
  return res.join('');
}