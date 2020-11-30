const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API Service', function() {
    it('should POST a new person', function(done) {
        const testUser = {
            username: 'test_user',
            password: 'password',
            first_name: 'test',
            last_name: 'user'
        };
        const expectedUser = [
        {
            username: 'test_user',
            first_name: 'test',
            last_name: 'user'
        },
    ];  
    
    chai
        .request('http://localhost:3000')
        .post('/api/auth/createPerson')
        .send(testUser)
        .end(function (err, resp) {
            console.log(resp.body);
            expect(resp.body.username).to.eql(expectedUser.username);
            expect(resp.first_name).to.eql(expectedUser.first_name);
            expect(resp.last_name).to.eql(expectedUser.last_name);
            done();
        });
    });

    it('should POST a login', function(done) {
        const testLogin = {
            username: 'test_user9',
            password: 'password',
        };
        const expectedLogin = [
        {
            msg: 'Logged In!'
        },
    ];  
    
    chai
        .request('http://localhost:3000')
        .post('/api/auth/login')
        .send(testLogin)
        .end(function (err, resp) {
            console.log(resp.body);
            expect(resp.msg).to.eql(expectedLogin.msg);
            done();
        });
    });
})