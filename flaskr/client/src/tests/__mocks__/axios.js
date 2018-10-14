import data from '../mock-data';

export default {
  test: 'This is the test',

  get: jest.fn((url) => {
    if (url === '/rooms/all') {
      return Promise.resolve({ data: data.roomList });
    }
    if (url === '/rooms/get/1') {
      return Promise.resolve({ data: data.room });
    }
    return Promise.resolve({ data: null });
  }),
};
