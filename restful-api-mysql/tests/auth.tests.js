//require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API Service', function() {
    // run one time then skip once working
    it.skip('should post a new user', (done) => {
        const testUser = {
            username: 'admin2',
            email: 'admin@example.com',
            password: 'password',
        };
        const expected = { msg: 'New user created successfully' };

    chai
        .request('http://localhost:3000')
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
            console.log(res.body);
            expect(res.body).to.equal(expected);
            done();
        });
    });
    it ('Should not POST a new user if they already exist', (done) => {
        const testUser = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'password',
        };
        const expected = {
            error: { message: 'User already exists' },
        };
        chai
        .request('http://localhost:3000')
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
            expect(res.body).to.equal(expected);
            done();
        });
    });
    it('Should not POST a new user if no username, email, or password is provided', function(done) {
        const expected = {
            error: { message: 'Illegal arguments: undefined, string'},
        };
        chai
        .request('http://localhost:3000')
        .post('/api/auth/register')
        .end(function(err, res) {
            expect(res.body).to.equal(expected);
            done();
        });
    });
});
