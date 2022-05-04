function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  friends.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.firstName} ${item.lastName}`;
    ul.append(li);
  });
  document.querySelector('body').append(ul);
  return ul;
}
