const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const UserService = require('../user.service');

const userTest = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'TestUser1',
  password: 'password'
};

const userUpdated = {
  firstName: 'John2',
  lastName: 'Doe2',
  username: 'TestUser2',
  password: 'password'
};

describe('## User Service', () => {

  describe('# Create', () => {
    it('It should create a new user', async function() {
      let UserServiceInstance = new UserService();
      const newUser = await UserServiceInstance.Create(userTest);
      userTest.id = newUser.id;
      expect(newUser.username).to.equal(userTest.username);
    });
  });

  describe('# List', () => {
    it('It should get a list of all users', async function() {
      let UserServiceInstance = new UserService();
      const allUsers = await UserServiceInstance.List();
      expect(allUsers).to.be.an('array');
      expect(allUsers[0]).to.be.an('object');
    });
  });

  describe('# GetUser', () => {
    it('It should get a user by id', async function() {
      let UserServiceInstance = new UserService();
      const gotUser = await UserServiceInstance.GetUser(userTest.id);
      expect(gotUser.username).to.equal(userTest.username);
    });
  });

  describe('# Update', () => {
    it('It should update a user with new values', async function() {
      let UserServiceInstance = new UserService();
      const updatedUser = await UserServiceInstance.Update(userTest.id, userUpdated);
      expect(updatedUser[0]).to.equal(1);
      const checkUpdatedUser = await UserServiceInstance.GetUser(userTest.id);
      expect(checkUpdatedUser.username).to.equal(userUpdated.username);
    });
  });

  describe('# Remove', () => {
    it('It should delete a user', async function() {
      let UserServiceInstance = new UserService();
      const removedUser = await UserServiceInstance.Remove(userTest.id);
      expect(removedUser).to.equal(1);

    });
  });

});
