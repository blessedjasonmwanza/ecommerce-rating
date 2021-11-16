import axios from 'axios';

const getProducts = async () => {
  try {
    const headers = { ' Access-Control-Allow-Origin': '*' };
    const data = await axios.get('https://fakestoreapi.com/products?limit=9', headers);
    localStorage.setItem('products', JSON.stringify(data.data));
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export default getProducts;