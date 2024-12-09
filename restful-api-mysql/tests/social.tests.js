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
