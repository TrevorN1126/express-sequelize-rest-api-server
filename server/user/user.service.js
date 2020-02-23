/**
 * @file user.service.js Service for the user component
 */
const models = require('../db/models');
const User = models.User;

/**
 * @classdesc Creates a new UserService.
 *
 */
class UserService {

  /**
   * Create a new user
   * @params {object} user - Object representing a new user
   * @return {object} user
   */
  async Create(user) {
    try {

      const userRecord = await User.create(user);
      return  userRecord;

    } catch (e) {
      return new Error(e.message);
    }

  }

  /**
   * Get a user
   * @params {string} userId - The _id of the user
   * @return {object} user
   */
  async GetUser(userId){
    try {
      let user = await User.findByPk(userId, {include: models.Permission});
      if (!user) throw new Error('User not found.');
      return user;
    } catch (e) {
      return e;
    }

  }

  /**
   * Update a user
   * @params {string} userId - The _id of the user
   * @params {object} user - TThe new values for the user
   * @return {object} user
   */
  async Update(userId, newValues) {
    try {
      let user = await User.update(newValues, {
        where: {id: userId}
      });
      if (user[0] === 0) throw new Error('User not found.');
      return user;
    } catch (e) {
      return e;
    }
  }

  /**
   * Get a list of all users
   * @return {object[]} user - An array of users
   */
  async List(){
    try {
      let users = await User.findAll({});
      return users;
    } catch (e) {
      return e;
    }
  }

  /**
   * Update a user
   * @params {string} userId - The _id of the user
   * @return {number/error} 1 or error - "User not found."
   */
  async Remove(userId){
    try {
      let userRemoved = await User.destroy({
        where: {id: userId},
      });
      if (userRemoved === 0) throw new Error('User not found.');
      return userRemoved;
    } catch (e) {
      return e;
    }
  }

}

module.exports = UserService;
