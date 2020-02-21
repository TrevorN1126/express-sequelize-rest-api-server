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
      return e;
    }

  }

  /**
   * Get a user
   * @params {string} userId - The _id of the user
   * @return {object} user
   */
  async GetUser(userId){
    let user = await User.findByPk(userId, {include: models.Permission});
    if (!user) throw new Error('User not found');
    return user;

  }

  /**
   * Update a user
   * @params {string} userId - The _id of the user
   * @params {object} user - TThe new values for the user
   * @return {object} user
   */
  async Update(userId, newValues) {

    // let user = await User.findByPk(userId);
    // if (!user) return res.json({ message: 'User not found' });
    // Object.assign(user, newValues);
    // await user.save();
    let user = await User.update(newValues, {
      where: {id: userId}
    });
    return user;

  }

  /**
   * Get a list of all users
   * @return {object[]} user - An array of users
   */
  async List(){
    let users = await User.findAll({});
    return users;
  }

  async Remove(userId){
    let userRemoved = await User.destroy({
      where: {id: userId},
    });
    return userRemoved;
  }

}

module.exports = UserService;
