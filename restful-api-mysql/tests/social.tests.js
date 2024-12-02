// require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Social Media Accounts API Service Suite', function() {
    describe('GET methods', function() {
        
    
    it('should get all social media accounts', function(done) {
        chai
            .request('http://localhost:3000')
            .get('/api/accounts')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThan(0);
                done();
            });
        });
    });



    it('should GET a single social media account', (done) => {
        const expected = [
          {
            id: 1,
            platform: "twitter",
            username: "sudodragoness",
            url: "https://twitter.com/sudodragoness",
          },
        ];
        chai
        .request('http://localhost:3000')
        .get('/api/accounts/1')
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          done(err);
          });
      });
});
// const request = require('supertest');
// const app = require('../app');
// const fileQueries = require('./file.queries');
// const db = require('../db');

// describe('File API', () => {
//   beforeEach(async () => {
//     await db.query('DELETE FROM files');
//     await db.query('DELETE FROM users');
//     await db.query('INSERT INTO users SET ?', {
//       username: 'testuser',
//       email: 'test@example.com',
//     });
//   });

//   it('should get all files for a user', async () => {
//     const response = await request(app).get('/files');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([]);
//   });

//   it('should get a file by id', async () => {
//     const fileId = await fileQueries.createFile({
//       filename: 'test.txt',
//       filetype: 'text/plain',
//       filesize: 100,
//       user_id: 1,
//     });
//     const response = await request(app).get(`/files/${fileId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       id: fileId,
//       filename: 'test.txt',
//       filetype: 'text/plain',
//       filesize: 100,
//       upload_date: expect.any(String),
//       user_id: 1,
//     });
//   });

//   it('should create a new file', async () => {
//     const response = await request(app)
//       .post('/files')
//       .attach('file', 'test.txt');
//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       id: expect.any(Number),
//     });
//   });

//   it('should update a file', async () => {
//     const fileId = await fileQueries.createFile({
//       filename: 'test.txt',
//       filetype: 'text/plain',
//       filesize: 100,
//       user_id: 1,
//     });
//     const response = await request(app)
//       .put(`/files/${fileId}`)
//       .send({ filename: 'updated.txt' });
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       id: fileId,
//       filename: 'updated.txt',
//       filetype: 'text/plain',
//       filesize: 100,
//       upload_date: expect.any(String),
//       user_id: 1,
//     });
//   });

//   it('should delete a file', async () => {
//     const fileId = await fileQueries.createFile({
//       filename: 'test.txt',
//       filetype: 'text/plain',
//       filesize: 100,
//       user_id: 1,
//     });
//     const response = await request(app).delete(`/files/${fileId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       message: 'File deleted successfully',
//     });
//   });
// });