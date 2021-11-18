/**
 * @jest-environment jsdom
 */
import CommentsPopUp from './comments.js';

jest.setTimeout(10000);
const comments = new CommentsPopUp();
describe('Count comments', () => {
  test('Add new comment and expect total comments to exceed initial comments count', async () => {
    const resulta = await comments.totalComments(2);
    await comments.add('2', 'testuser', 'jest');
    const resultb = await comments.totalComments(2);
    expect(resultb).toBeGreaterThan(resulta);
  });
  test('Expect total comments not to change when no new item is added', async () => {
    const resulta = await comments.totalComments(2);
    const resultb = await comments.totalComments(2);
    expect(resultb).toEqual(resulta);
  });
});
