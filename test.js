// test.js
const request = require('supertest');
const server = require('./index.js');

const launch = async (ctx) => {
  const port = Math.round(Math.random() * 10000 + 1000);
  // const port = 3000;
  console.log("Port:", port);
  ctx = await ctx;
  await new Promise((resolve) => ctx.server.close(resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
  await new Promise((resolve) => {
    ctx.server.listen(port, resolve)
  });
  return ctx;
};

describe('Website', () => {
  describe('Homepage', () => {;
    it('renders the homepage', async () => {
      const ctx = await launch(server);
      return request(ctx.app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .then(response => {
          expect(response.text).toMatch(/\<h1\>TODO list<\/h1>/i);
        });
    });
  });

  describe('API', () => {
    it('retrieves a list of todos', async () => {
      const ctx = await launch(server);
      return request(ctx.app)
        .get('/todo')
        .expect(200)
        .then(response => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });
  });
});
