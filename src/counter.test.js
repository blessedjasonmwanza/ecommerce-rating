/**
 * @jest-environment jsdom
 */
import productCounter from './productCounter.js';

jest.setTimeout(10000);
describe('product counter', () => {
  test('Fetched documents equal to displayed document', () => {
    const card = document.createElement('div');
    card.className = 'card-product';
    const disCount = document.createElement('span');
    disCount.className = 'item-counter';
    const mockedRes = [{ item: 'text' }, { test: 'text' }, { test: 'text' }];
    const body = document.querySelector('body');
    body.appendChild(disCount);
    mockedRes.forEach((el) => {
      const card = document.createElement('div');
      card.className = 'card-product';
      card.textContent = el.item;
      body.appendChild(card);
    });
    expect(productCounter()).toEqual(3);
  });
});