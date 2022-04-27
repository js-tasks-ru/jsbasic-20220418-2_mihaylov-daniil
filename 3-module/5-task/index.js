function getMinMax(str) {
  const arr = str.split(' ');
  const arrFilter = arr.filter(item => !isNaN(item) ? true : false)
  const arrMap = arrFilter.map(item => Number(item));
  const obj = {
    min: Math.min(...arrMap),
    max: Math.max(...arrMap),
  };
  return obj;
}