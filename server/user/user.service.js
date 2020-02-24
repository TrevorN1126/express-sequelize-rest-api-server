/**
* @file user.service.js Service for the user component
*/
const DbService = require('../helpers/baseDbService');
const models = require('../db/models');
const User = models.User;

/**
* @classdesc Creates a new UserService.
*
*/
class UserService extends DbService {
  constructor(componentName, model) {
    super(componentName, model);
  }

  async GetUserPermissions(userId){
    try {
      const user = await this.model.findByPk(userId, {include: models.Permission});
      if (!user) throw new Error('User not found.');
      const permissions = [];
      user.Permissions.forEach((item) => {
        permissions.push(item.role);
      });

      return permissions;
    } catch (e) {
      return e;
    }
  }

  async AddUserPermission(userId, permission){
    try {
      const user = await this.model.findByPk(userId, {include: models.Permission});
      if (!user) throw new Error('User not found.');
      const newPermission = await user.createPermission({ role: permission });

      return newPermission;
    } catch (e) {
      return e;
    }
  }

  async RemoveUserPermission(userId, permission){
    try {
      const removedPermission = await models.Permission.destroy({
        where:
          {
            UserId: userId,
            role: permission
          }
      });

      return removedPermission;
    } catch (e) {
      return e;
    }
  }

}

module.exports = new UserService('User', User);
