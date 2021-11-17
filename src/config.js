export default class Config {
  constructor() {
    this.involvementAppId = 'dwHwCqYFHfSrZFnmOxOx';
    this.involvementBaseUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${this.involvementAppId}/`;
    this.likesEndPoint = `${this.involvementBaseUrl}likes`;
    this.commentsEndPoint = `${this.involvementBaseUrl}comments`;
    this.productsBaseUrl = 'https://fakestoreapi.com/products';
  }
}