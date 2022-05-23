export default class StepSlider {
  steps = null;
  value = null;
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();

  }


  get container() {
    if (!this.elem) {
      return null;
    }
    return this.elem;
  }


  onElemCustomClick = () => {
    const change = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(change);
  }


  onSliderClick = (event) => {
  let domRect = this.container.getBoundingClientRect();
  let left = event.clientX - domRect.left;
  let leftRelative = left / this.container.offsetWidth;
  let segments = this.steps - 1;
  let approximateValue = leftRelative * segments;
  let intValue = Math.round(approximateValue);

  let valuePercents = intValue / segments * 100;

  let thumb = this.container.querySelector('.slider__thumb');
  thumb.style.left = valuePercents + '%';
  let progress = this.container.querySelector('.slider__progress');
  progress.style.width= intValue / segments * 100 + '%'

  let sliderValue = this.container.querySelector('.slider__value');
  sliderValue.innerHTML = intValue;

    let spans = this.container.querySelectorAll('[data-value]');
    let spansArr = [...spans];
    for(let i = 0; i < spansArr.length; i++) {
      spansArr[i].classList.remove('slider__step-active');
    }
    spansArr[intValue].classList.add('slider__step-active');
    

    this.value = intValue;

  }


  render() {
    let arr = [];
    for(let i = 0; i < this.steps; i++) {
      arr.push(i);
    }

    console.log(arr);
    const template = `
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
  
    <!--Полоска слайдера-->
    <div class="slider__progress"></div>
  
    <div class="slider__steps">

      ${arr.map(item => `<span data-value='${item}'></span>`).join('')}
    </div>
    `;
    
    this.elem  = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = template;
    this.container.querySelector('.slider__progress').style.width = 0 + 'px';
    this.elem.addEventListener('click', this.onSliderClick);

    this.container.querySelector('[data-value]').classList.add('slider__step-active');

    this.elem.addEventListener('click', this.onElemCustomClick);
  }
}
