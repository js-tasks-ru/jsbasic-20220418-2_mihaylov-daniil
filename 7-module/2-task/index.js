import createElement from '../../assets/lib/create-element.js';
let modalBody = document.createElement('div');
export default class Modal {

  constructor() {
    this.render();
    
  }


  close() {
    document.querySelector('body').classList.remove('is-modal-open');
    this.elem.remove();

  }


  onBtnCloseClick(event) {
    if(event.target.closest('button')) {
      document.querySelector('body').classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    }
  }

  onEscClick(event) {
    if(event.code === 'Escape') {
      document.querySelector('body').classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    }
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = title;

  }



  setBody(modalBody) {
    this.elem.querySelector('.modal__body').append(modalBody);
  }

  render() {
    const template = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
    <div class="modal__header">
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>
      <h3 class="modal__title">
  
      </h3>
    </div>
    <div class="modal__body">
    A сюда нужно добавлять содержимое тела модального окна
    </div>
  </div>
</div>

`;
  this.elem = document.createElement('div');
  this.elem.classList.add('modal');
  this.elem.innerHTML = template;
  }

  open() {
    document.querySelector('body').append(this.elem);
    document.querySelector('body').classList.add('is-modal-open');
    this.elem.addEventListener('click', this.onBtnCloseClick);
    document.addEventListener('keydown', this.onEscClick);

  }




}



// 