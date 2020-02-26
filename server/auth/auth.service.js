const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const models  = require('../db/models');

/**
* Creates a new AuthService.
* @class
*/
class AuthService {
  constructor(model) {
    this.model = model;
  }

  async Login(username, password) {
    try {
      // Find the User
      const user = await this.model.findOne({
        where: {username: username},
        include: models.Permission
      });
      if (!user) throw Error('User not found.');

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) throw Error("Invalid password.");

      const permissions = [];
      user.Permissions.forEach((item) => {
        permissions.push(item.role);
      });
      user.dataValues.permissions = permissions;

      const token = jwt.sign(
        {user},
        config.jwtSecret,
        {expiresIn: '2 days'}
      );

      return {
        success: true,
        message: 'Authentication successfull',
        user: user,
        token: token
      };
    } catch (e) {
      // return a Error message describing the reason
      return e;
    }
  }

}

module.exports = new AuthService(models.User);
