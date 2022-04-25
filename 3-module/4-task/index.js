function showSalary(users, age) {
  let res = [];
  users.forEach(item => {
    if (item.age <= age) {
      res.push(item.name + ', ' + item.balance);
    } else {
      return false;
    }
  })
  return res.join('\n');
}