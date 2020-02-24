const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const UserService = require('../user.service');

const userTest = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'TestUser1',
  password: 'password',
  permission: 'User',
  permission2: 'Admin'
};

const userBadTest = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'BadTestUser1',
};

const userUpdated = {
  firstName: 'John2',
  lastName: 'Doe2',
  username: 'TestUser2',
  password: 'password'
};

describe('## User Service', () => {

  describe('# Create', () => {
    it('It should throw an error - ', async function() {
      const newBadUser = await UserService.Create(userBadTest);
      expect(newBadUser).to.be.instanceOf(Error);
    });
    it('It should create a new user', async function() {
      const newUser = await UserService.Create(userTest);
      userTest.id = newUser.id;
      expect(newUser.username).to.equal(userTest.username);
    });

  });

  describe('# List', () => {
    it('It should get a list of all users', async function() {
      const allUsers = await UserService.List();
      expect(allUsers).to.be.an('array');
      expect(allUsers[0]).to.be.an('object');
    });
  });

  describe('# GetItem', () => {
    it('It should return an Error - User not found. ', async function() {
      const gotNotAUser = await UserService.GetItem(696969);
      expect(gotNotAUser.message).to.equal("User not found.");
    });
    it('It should get a user by id', async function() {
      const gotUser = await UserService.GetItem(userTest.id);
      expect(gotUser.username).to.equal(userTest.username);
    });
  });

  describe('# User Permissions', () => {
    it('It should add a permission to a user ', async function() {
      const newUserPermission = await UserService.AddUserPermission(userTest.id, userTest.permission);
      const newUserPermission2 = await UserService.AddUserPermission(userTest.id, userTest.permission2);
      expect(newUserPermission.role).to.equal(userTest.permission);
      expect(newUserPermission2.role).to.equal(userTest.permission2);
    });
    it('It should get a users permissions', async function() {
      const permissions = await UserService.GetUserPermissions(userTest.id);
      expect(permissions).to.be.an('array');
      expect(permissions).to.include(userTest.permission);
      expect(permissions).to.include(userTest.permission2);
    });
    it('It should remove a permission from a user', async function() {
      const removedPermission = await UserService.RemoveUserPermission(userTest.id, userTest.permission2);
      expect(removedPermission).to.equal(1);
    });
  });

  describe('# Update', () => {
    it('It should update a user with new values', async function() {
      const updatedUser = await UserService.Update(userTest.id, userUpdated);
      expect(updatedUser.username).to.equal(userUpdated.username);
    });
    it('It should return an Error - User not found.', async function() {
      const updatedNonUser = await UserService.Update(69696969, userUpdated);
      expect(updatedNonUser.message).to.equal("User not found.");
    });
  });

  describe('# Remove', () => {
    it('It should delete a user', async function() {
      const removedUser = await UserService.Remove(userTest.id);
      expect(removedUser).to.equal(1);
    });
    it('It should return an Error - User not found.', async function() {
      const removedNonUser = await UserService.Remove(69696969);
      expect(removedNonUser.message).to.equal("User not found.");
    });
  });

});
