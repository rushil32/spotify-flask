import mockAxios from 'axios';
import * as room from '../util/room';

it('fetches the room', async () => {
  const data = await room.getRoom(1);

  expect(data.name.length).toBeTruthy();
  expect(mockAxios.get.mock.calls.length).toBe(1);
});
