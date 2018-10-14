import mockAxios from 'axios';
import * as feed from '../util/feed';

it('gets the room list', async () => {
  const data = await feed.getRooms();

  expect(data.length).toBeTruthy();
  expect(mockAxios.get.mock.calls.length).toBe(1);
  expect(mockAxios.get.mock.calls[0][0]).toBe('/rooms/all');
});
