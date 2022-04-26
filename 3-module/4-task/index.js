function showSalary(users, age) {
  return users
    .filter(item => {
      if (item.age <= age) {
        return true;
      }
      return false;
    })
    .map(item => `${item.name}, ${item.balance}`)
    .join('\n');
}