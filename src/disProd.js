import axios from 'axios';
import getProducts from './getProducts';
import CommentsPopUp from './comments';
import Config from './config';

const endPoints = new Config();

const comments = new CommentsPopUp();

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

const templateProduct = (source, title, id, data) => {
  const productCard = createElement('div', 'card-product');
  const productWrapper = createElement('div', 'card-wrapper');
  const containerInfo = createElement('div', 'cont-info');
  const figure = createElement('figure', 'cont-img');
  const img = createElement('img', 'img-product', source);
  const infoProduct = createElement('div', 'cont-info-wrapper');
  const titleProduct = createElement('h5', 'title-product', null, title);
  const likes = createElement('a', 'liked-cont');
  const icon = createElement('i', 'far fa-heart', null, null, id);
  icon.addEventListener('click', async () => {
    let resg;
    const body = { item_id: id };
    try {
      await axios.post(endPoints.likesEndPoint, body);
      const reqg = await axios.get(endPoints.likesEndPoint);

      resg = reqg;
    } catch (err) {
      console.log(err);
    }
    let likesDis;
    let likes;
    if (resg.data.length > 0) {
      likes = resg.data.filter((el) => el.item_id === id);
    }
    if (likes[0].likes > 1) {
      likesDis = `${likes[0].likes} likes`;
    } else {
      likesDis = `${likes[0].likes} like`;
    }
    icon.nextSibling.textContent = likesDis;
  });
  let likesDis;
  if (data) {
    const ikes = data.filter((el) => el.item_id === id);
    if (ikes.length > 0 && ikes[0].likes > 1) {
      likesDis = `${ikes[0].likes} likes`;
    }
    if (ikes.length > 0 && ikes[0].likes <= 1) {
      likesDis = `${ikes[0].likes} like`;
    }
    if (ikes.length === 0) {
      likesDis = '0 like';
    }
  } else {
    likesDis = '0 like';
  }

  const infoLikes = createElement('span', 'likes-counter', null, null, id);
  infoLikes.textContent = likesDis;

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

const list = document.querySelector('.main');

const display = async () => {
  try {
    const products = await getProducts();
    const req = await axios.get(endPoints.likesEndPoint);
    products.forEach((el) => {
      list.append(templateProduct(el.image, el.title, el.id, req.data));
    });
    comments.enable();
  } catch (err) {
    console.log(err);
  }

  return 3;
};
export default display;