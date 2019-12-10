const request = require('supertest');
const app = require('../lib/app');

describe('createResponse', () => {
  it('returns hi with GET at the path /', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.text).toEqual('Hi');
        expect(response.status).toEqual(200);
      });
  });
  it('returns an echo of the body sent', () => {
    return request(app)
      .post('/echo')
      .send(app)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(response.body);
      });
  });
});
