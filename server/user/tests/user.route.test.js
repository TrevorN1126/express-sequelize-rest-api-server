const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../../app');

chai.config.includeStack = true;

const admin = {
  username: 'TestAdmin',
  password: 'password',
  id: '',
  token: 'Bearer '
};

const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'newTestUser',
  password: 'password',
  id: null
};

const updateUser = {
  firstName: 'Jane',
  username: 'newTestUser1',
  password: 'newpassword',
};

const userPermission = {permission: 'User'};
const adminPermission= {permission: 'Admin'};

describe('## User APIs', () => {

  before(async () => {
    await request(app)
    .post('/api/auth/login')
    .send(admin)
    .expect(httpStatus.OK)
    .then((res) => {
      expect(res.body).to.have.property('token');
      admin.token += res.body.token;
      expect(res.body).to.have.property('user');
      admin.id += res.body.user._id;
    });

  });

  describe('# GET /api/users', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .get('/api/users')
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('should get all users', (done) => {
      request(app)
      .get('/api/users')
      .set('Authorization', admin.token)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        done();
      })
      .catch(done);
    });
  });


  describe('# POST /api/users', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .post('/api/users')
      .send(newUser)
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('should create a new user', (done) => {
      request(app)
      .post('/api/users')
      .set('Authorization', admin.token)
      .send(newUser)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.username).to.equal(newUser.username);
        expect(res.body.firstName).to.equal(newUser.firstName);
        newUser.id = res.body.id;
        done();
      })
      .catch(done);
    });
  });

  describe('# GET /api/users/:userId', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .get(`/api/users/${newUser._id}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('should get user details', (done) => {
      request(app)
      .get(`/api/users/${newUser.id}`)
      .set('Authorization', admin.token)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.username).to.equal(newUser.username);
        done();
      })
      .catch(done);
    });

    it('should report error with message - User Not Found, when user does not exists', (done) => {
      request(app)
      .get('/api/users/969669696969696')
      .set('Authorization', admin.token)
      .expect(httpStatus.NOT_FOUND)
      .then((res) => {
        expect(res.body.message).to.equal('User not found.');
        done();
      })
      .catch(done);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .put(`/api/users/${newUser._id}`)
      .send(updateUser)
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('It should report an error - User not found.', (done) => {
      request(app)
      .put(`/api/users/696969696969`)
      .set('Authorization', admin.token)
      .send(updateUser)
      .expect(httpStatus.NOT_FOUND)
      .then((res) => {
        expect(res.body.message).to.equal('User not found.');
        done();
      })
      .catch(done);
    });

    it('should update user details', (done) => {
      request(app)
      .put(`/api/users/${newUser.id}`)
      .set('Authorization', admin.token)
      .send(updateUser)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.username).to.equal(updateUser.username);
        expect(res.body.firstName).to.equal(updateUser.firstName);
        done();
      })
      .catch(done);
    });
  });

  describe('# POST /api/users/:userId/permissions', () => {
    it('It should add a permission to an existing user', (done) => {
      request(app)
      .post(`/api/users/${newUser.id}/permissions`)
      .set('Authorization', admin.token)
      .send(userPermission)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.role).to.equal(userPermission.permission);
        done();
      })
      .catch(done);
    });
    it('It should report an error - User not found.', (done) => {
      request(app)
      .post(`/api/users/969669696969696/permissions`)
      .set('Authorization', admin.token)
      .send(userPermission)
      .expect(httpStatus.NOT_FOUND)
      .then((res) => {
        expect(res.body.message).to.equal('User not found.');
        done();
      })
      .catch(done);
    });
  });

  describe('# GET /api/users/:userId/permissions', () => {
    it('It should get the permissions on an existing user', (done) => {
      request(app)
      .get(`/api/users/${newUser.id}/permissions`)
      .set('Authorization', admin.token)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body[0]).to.equal(userPermission.permission);
        done();
      })
      .catch(done);
    });
    it('It should report an error - User not found.', (done) => {
      request(app)
      .get(`/api/users/969669696969696/permissions`)
      .set('Authorization', admin.token)
      .expect(httpStatus.NOT_FOUND)
      .then((res) => {
        expect(res.body.message).to.equal('User not found.');
        done();
      })
      .catch(done);
    });
  });

  describe('# DELETE /api/users/:userId/permissions', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .delete(`/api/users/${newUser.id}/permissions`)
      .send(userPermission)
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('should delete a permission from a user', (done) => {
      request(app)
      .delete(`/api/users/${newUser.id}/permissions`)
      .set('Authorization', admin.token)
      .send(userPermission)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.equal(1);
        done();
      })
      .catch(done);
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
      .delete(`/api/users/${newUser.id}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then((res) => {
        expect(res.body.message).to.equal('Unauthorized');
        done();
      })
      .catch(done);
    });

    it('should delete a user', (done) => {
      request(app)
      .delete(`/api/users/${newUser.id}`)
      .set('Authorization', admin.token)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.equal(1);
        done();
      })
      .catch(done);
    });
  });
});
