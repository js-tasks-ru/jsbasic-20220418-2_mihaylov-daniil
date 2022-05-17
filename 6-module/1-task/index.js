/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

let rows = [
  { name: 'Ilia', age: 25, salary: 1000, city: 'Petrozavodsk' },
  { name: 'Vasya', age: 14, salary: 1500, city: 'Moscow' },
  { name: 'Ivan', age: 22, salary: 100, city: 'Bryansk' },
  { name: 'Petya', age: 45, salary: 990, city: 'Chita' }
];

export default class UserTable {
  #rows = [];
  elem = null;
  constructor(rows) {
    this.#rows = rows;
    this.elem = document.createElement('div');
  }

  render() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    table.append(thead);
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'Имя';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = 'Возраст';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = 'Зарпалата';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = 'Город';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = '';
    tr.append(th);
    tr.append(th);
    thead.append(tr);
    const tbody = document.createElement('tbody');
    table.append(tbody);
    this.#rows.map(item => {
      tr = document.createElement('tr');
      for (let key in item) {
        let td = document.createElement('td');
        td.innerHTML = item[key];
        tr.append(td);
      }
      let td = document.createElement('td');
      let button = document.createElement('button');
      button.innerHTML = 'X';
      button.setAttribute("data-btn", "delete");
      td.append(button);
      tr.append(td);
      tbody.append(tr);
    })
    this.elem.append(table);


    this.elem.addEventListener('click', (event) => {
      if (event.target.dataset.btn) {
        event.target.closest('tr').remove();
      }
    });


  }

}


const table = new UserTable(rows);
console.log(table);
document.querySelector('body').append(table.elem);

table.render();
