const productCounter = () => {
  const prodTempl = document.querySelectorAll('.card-product');
  const counterDis = document.querySelector('.item-counter');
  counterDis.textContent = `(${prodTempl.length})`;

  console.log(prodTempl.length);
  return prodTempl.length;
};

export default productCounter;