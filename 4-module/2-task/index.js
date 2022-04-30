const table = document.querySelector('table');
function makeDiagonalRed(table) {
  const trs = Array.from(table.rows);
  for (let i = 0; i < trs.length; i++) {
    console.log(i);
    for (let k = 0; k < trs[i].children.length; k++) {
      if (trs[i].children[k] === trs[i].children[i]) {
        trs[i].children[k].style.backgroundColor = 'red';
      }
    }

  }

}


