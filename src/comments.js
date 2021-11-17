import closeIcon from './img/close_icon.png';
import Config from './config';

const config = new Config();
export default class CommentsPopUp {
  constructor() {
    this.popUp = document.createElement('section');
    this.popUp.setAttribute('id', 'commentsPopUp');
  }

  display(id) {
    if (id) {
      document.querySelector('body').style.overflow = 'hidden';
      this.popUp.style.display = 'flex';
      this.popUp.innerHTML = 'Loading info...';
      this.getProductInfo(id).then((productInfo) => {
        if (productInfo.error === false) {
          const {
            title, image, category, price, description,
          } = productInfo.data;
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
            <br>
            <h3>Add comment</h3>
            <form class="d-flex comments-form" method="post">
              <input name="item_id" type="hidden" value="${id}">
              <input name="name" type="text" placeholder="Your name">
              <textarea name="comment" placeholder="Your insights" rows="10" cols="20"></textarea>
              <button type="submit">Comment</button>
            </form>
          `;
          const commentsForm = this.popUp.querySelector('.comments-form');
          commentsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const itemId = commentsForm.elements.item_id.value;
            const name = commentsForm.elements.name.value;
            const comment = commentsForm.elements.comment.value;
            this.add(itemId, name, comment).then((res) => {
              console.log(res);
              if (res.error === false) {
                commentsForm.reset();
              }
            });
          });
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
    document.querySelector('body').style.overflow = 'auto';
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
      const url = config.commentsEndPoint;
      console.log(url);
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          username,
          comment,
        }),
      })
        .then((res) => res.text())
        .then((data) => (data.error
          ? { error: true, info: data }
          : { error: false, info: data }))
        .catch((error) => ({ error: true, info: error }));
    } else {
      response = { error: true, info: 'Some parameters are missing, or are invalid' };
    }
    return response;
  }

  enable() {
    const commentsBtns = document.querySelectorAll('.btn-comment');
    if (commentsBtns) {
      commentsBtns.forEach((comment) => {
        comment.addEventListener('click', () => {
          const id = comment.getAttribute('data');
          this.display(id);
        });
      });
    }
  }
}