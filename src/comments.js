import closeIcon from './img/close_icon.png';
import Config from './config';

const config = new Config();
export default class CommentsPopUp {
  constructor() {
    // for testing purposes
    this.popUp = document.createElement('section');
    this.popUp.setAttribute('id', 'commentsPopUp');
    document.querySelector('body').innerHTML += '<span class="btn-comments" data="123">comments</span>';
  }

  display(id) {
    if (id) {
      this.getProductInfo(id).then((productInfo) => {
        if (productInfo.error === false) {
          const { title, image, category, price, description } = productInfo.data;
          this.popUp.style.display = 'flex';
          this.popUp.innerHTML = 'Loading...';
          this.popUp.innerHTML = `
            <img src="${closeIcon}" title="close" class="close-comment-popup">
            <img src="${image}" class="comment-cover">
            <h2>${title}</h2>
            <p>
              <ul class="d-flex">
                <li>
                <b>Price:</b> ${price}
                </li>
                <li>
                  <b>Category:</b> ${category}
                </li>
              </ul>
                <em>
                  ${description}
                </em>
            </p>
          `;
          document.querySelector('body').appendChild(this.popUp);
          const closeBtn = document.querySelector('.close-comment-popup');
          closeBtn.addEventListener('click', () => this.hide());
        }
      });
    }
  }

  hide() {
    this.popUp.style.display = 'none';
    this.popUp.innerHTML = '';
  }

  getProductInfo = async (id) => {
    let response;
    if (id) {
      const url = `${config.productsBaseUrl}/${id}`;
      response = await fetch(url).then((res) => res.json())
        .then((result) => ({ error: false, data: result }))
        .catch((error) => ({ error: true, msg: error }));
    } else {
      response = { error: true, msg: 'Missing product id' };
    }
    return response;
  }

  add = async (itemId, username, comment) => {
    let response;
    if (itemId && username && comment) {
      response = await fetch((config.commentsEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          username,
          comment,
        }),
      }))
        .then((res) => res.json())
        .then((data) => ({ error: false, info: data }))
        .catch((error) => ({ error: true, info: error }));
    } else {
      response = { error: true, info: 'Some parameters are missing, or are invalid' };
    }
    return response;
  }
}