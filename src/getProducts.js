import axios from 'axios';

const getProducts = async () => {
  const headers = { ' Access-Control-Allow-Origin': '*' };
  const data = await axios.get('https://fakestoreapi.com/products?limit=9', headers);
  localStorage.setItem('products', JSON.stringify(data.data));
  return data.data;
};

export default getProducts;