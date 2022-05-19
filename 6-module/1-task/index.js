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


export default class UserTable {
  #rows = [];
  elem = document.createElement('div');
  constructor(rows) {
    this.#rows = rows;
    this.render();
  }




  #onBtnClick = (event) => {
    if (event.target.dataset.btn) {
      event.target.closest('tr').remove();
    }
  }

  render() {
    const template = `
    <table>
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    ${this.#rows.map(item => {
      return `
      <tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.salary}</td>
      <td>${item.city}</td>
      <td><button data-btn ="delete">X</button></td>
      </tr>`;
    })}
    </tbody>
  </table>
    `;
    
    this.elem.innerHTML = template;


    this.elem.addEventListener('click', this.#onBtnClick);

  }

}






