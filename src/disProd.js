const createElement = (el, className, source, title, id) => {
  const elm = document.createElement(`${el}`);
  elm.className = className;
  if (el === 'img') {
    elm.setAttribute('src', `${source}`);
    elm.setAttribute('alt', 'product');
  }
  if (el === 'button') {
    elm.setAttribute('type', 'submit');
  }
  if (el === 'h5') {
    elm.textContent = title;
  }
  if (className === 'btn-comment') {
    elm.setAttribute('data', id);
    elm.textContent = 'Comments';
  }

  if (el === 'i') {
    elm.setAttribute('data', id);
  }

  if (className === 'btn-reserve') {
    elm.setAttribute('data', id);
    elm.textContent = 'Reservations';
  }
  return elm;
};

const templateProduct = (source, title, id) => {
  const productCard = createElement('div', 'card-product');
  const productWrapper = createElement('div', 'card-wrapper');
  const containerInfo = createElement('div', 'cont-info');
  const figure = createElement('figure', 'cont-img');
  const img = createElement('img', 'img-product', source);
  const infoProduct = createElement('div', 'cont-info-wrapper');
  const titleProduct = createElement('h5', 'title-product', null, title);
  const likes = createElement('a', 'liked-cont');
  const icon = createElement('i', 'far fa-heart', null, null, id);
  const infoLikes = createElement('span', 'likes-counter');
  const btnWrapper = createElement('div', ' btn-wrapper');
  const btnComments = createElement('button', 'btn-comment', null, null, id);

  const btnReserv = createElement('button', 'btn-reserve', null, null, id);

  figure.appendChild(img);
  containerInfo.appendChild(figure);
  infoProduct.appendChild(titleProduct);
  likes.appendChild(icon);
  likes.appendChild(infoLikes);
  infoProduct.appendChild(likes);
  containerInfo.appendChild(infoProduct);
  productWrapper.appendChild(containerInfo);

  btnWrapper.appendChild(btnComments);
  btnWrapper.appendChild(btnReserv);
  productWrapper.appendChild(btnWrapper);
  productCard.appendChild(productWrapper);
  return productCard;
};

const data = JSON.parse(localStorage.getItem('products'));
const list = document.querySelector('.main');

const display = () => {
  data.forEach((el) => {
    list.appendChild(templateProduct(el.image, el.title, el.id));
  });
};

export default display;