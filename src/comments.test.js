/**
 * @jest-environment jsdom
 */
import CommentsPopUp from './comments.js';

jest.setTimeout(10000);
const comments = new CommentsPopUp();
describe('Count comments', () => {
  test('Add new comment and expect total to exceed initial comments', async () => {
    const resulta = await comments.totalComments(2);
    await comments.add('2', 'testuser', 'jest');
    const resultb = await comments.totalComments(2);
    expect(resultb).toBeGreaterThan(resulta);
  });
});
