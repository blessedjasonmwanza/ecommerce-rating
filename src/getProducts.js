import axios from 'axios';

const getProducts = async () => {
  let dataFetched;

  try {
    const headers = { ' Access-Control-Allow-Origin': '*' };
    const data = await axios.get('https://fakestoreapi.com/products?limit=9', headers);
    localStorage.setItem('products', JSON.stringify(data.data));
    dataFetched = data.data;
  } catch (err) {
    console.log(err);
  }

  return dataFetched;
};

export default getProducts;