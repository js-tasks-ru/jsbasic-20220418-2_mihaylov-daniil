function highlight(table) {
  const trs = table.rows;
  let age;
  let gender;
  let status;

  for (let i = 0; i < trs[0].children.length; i++) {
    if (trs[0].children[i].innerHTML === 'Age') {
      age = i;
    }
    if (trs[0].children[i].innerHTML === 'Gender') {
      gender = i;

    }
    if (trs[0].children[i].innerHTML === 'Status') {
      status = i;

    }
  }

  for (let i = 1; i < trs.length; i++) {
    let agePos = trs[i].children[age];
    let genderPos = trs[i].children[gender];
    let statusPos = trs[i].children[status];
    if (agePos.innerHTML < 18) {
      trs[i].style.textDecoration = 'line-through';
    }

    if (genderPos.innerHTML === 'm') {
      trs[i].classList.add('male');
    } else {
      trs[i].classList.add('female');
    }

    if (statusPos.dataset.available === 'true') {
      trs[i].classList.add('available');
    } else if (statusPos.dataset.available === 'false') {
      trs[i].classList.add('unavailable');
    } else {
      trs[i].setAttribute('hidden', true);
    }
  }
}


