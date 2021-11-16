import getProducts from './getProducts';
import CommentsPopUp from './comments';
import './style.css';
import display from './disProd';

getProducts();
display();

const comments = new CommentsPopUp();
comments.enable();