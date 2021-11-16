import Config from './config';

const config = new Config();
export default class CommentsPopUp {
  constructor() {
    // for testing purposes
    this.popUp = document.createElement('section');
    console.log(this.popUp);
    this.popUp.setAttribute('id', 'commentsPopUp');
    document.querySelector('body').innerHTML += '<span class="btn-comments" data="123">comments</span>';
  }

  display(id) {
    if (id) {
      this.getProductInfo(id).then((productInfo) => {
        if (productInfo.error === false) {
          const { title, image } = productInfo.data;
          const closeIcon = `<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
          width='50' height='50' viewBox='0 0 172 172' style=' fill:#000000;'><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray=' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,172v-172h172v172z' fill='none'></path><g fill='#000000'><path d='M107.33488,86l46.8872,-70.3308c0.70176,-1.05608 0.77056,-2.41144 0.172,-3.52944c-0.59856,-1.118 -1.76472,-1.81976 -3.03408,-1.81976h-25.2496c-1.12488,0 -2.18096,0.5504 -2.82424,1.47576l-37.28616,53.56424l-37.2896,-53.56424c-0.64328,-0.92536 -1.69592,-1.47576 -2.8208,-1.47576h-25.2496c-1.26936,0 -2.43552,0.69832 -3.03408,1.81632c-0.59856,1.118 -0.52976,2.4768 0.172,3.52944l46.8872,70.33424l-46.8872,70.3308c-0.70176,1.05608 -0.77056,2.41144 -0.172,3.52944c0.59856,1.118 1.76472,1.81976 3.03408,1.81976h25.2496c1.12488,0 2.18096,-0.5504 2.82424,-1.47576l37.28616,-53.56424l37.2896,53.56424c0.64328,0.92536 1.69592,1.47576 2.8208,1.47576h25.2496c1.26936,0 2.43552,-0.69832 3.03408,-1.81632c0.59856,-1.118 0.52976,-2.4768 -0.172,-3.52944z'></path></g></g></svg>`;
          this.popUp.style.display = 'flex';
          this.popUp.innerHTML = `
            <img src="${closeIcon}" class="close-comment-popup">
            <img src="${image}" class="comment-cover">
            <h2>${title}</h2>
            <p>
              <ul>
                <li>
                Price: 
                </li>
              </ul>
              
            </p>
          `;
          console.log(this.popUp);
          document.querySelector('body').innerHTML += this.popUp;
        } else {
          console.log(productInfo);
        }
      });
    } else {
      console.log('id is missing');
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