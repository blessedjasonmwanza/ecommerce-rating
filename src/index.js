import './style.css';
import getProducts from './getProducts';
import display from './disProd';
import productCounter from './productCounter';

getProducts();
const dis = async () => {
  await display();
  const docDisplayed = productCounter();
  return docDisplayed;
};

dis();

export default dis;