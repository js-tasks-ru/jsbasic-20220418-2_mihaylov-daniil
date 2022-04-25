function getMinMax(str) {
  const arr = str.split(' ');
  let res = [];
  arr.forEach(item => {
    if (!isNaN(item)) {
      res.push(Number(item));
    }
  })
  let obj = {
    min: Math.min(...res),
    max: Math.max(...res),
  }
  return obj;
}