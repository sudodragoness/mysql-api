const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTcyMTUxfQ.VZRrhF8Yti7z7iGGwBwDLLcsZ4Bc-mekrUiTeWNtXqY';
describe('User API Service', () => {
    it("Should GET a logged in user's unique ID, username, and password", (done) => {
        const expected = [
        {
        
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
        },
    ];

    chai
        .request('http://localhost:3000')
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            expect(res.body).to.equal(expected);
            done();
        });
    });

    // run one time then skip once working
    it.skip('Should PUT updated credentials for a logged in user', (done) => {
        const updatedUser = {
            username: 'admin2',
            email: 'admin@example.com',
            password: 'newpassword',
        };
        const expected = {
            msg: 'User updated successfully',
        };

        chai
            .request('http://localhost:3000')
            .put('/api/users/me/update')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUser)
            .end((err, res) => {
                expect(res.body).to.equal(expected);
                done();
            });
    });
    it('should PUT updated credentials for a logged in user', (done) => {
        const updatedUser = {
          username: 'admin2',
          email: 'admin@example.com',
          password: 'newPassword',
        };
        const expected = { msg: 'Nothing to update...' };
    
        chai
          .request('http://localhost:3000')
          .put('/api/user/me/update')
          .set('Authorization', `Bearer ${token}`)
          .send(updatedUser)
          .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
          });
      });
    
});
