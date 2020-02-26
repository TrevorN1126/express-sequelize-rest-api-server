const DbService = require('../helpers/baseDbService');
const models = require('../db/models');

/**
* Creates a new UserService.
* @extends DbService
*/
class UserService extends DbService {
  /**
   * Get the users permissions
   * @params {int} userId - the id of the user
   * @return {Array|Error} returns an array of strings representing the users
   * permissions or an Error
   */
  async GetUserPermissions(userId) {
    try {
      const user = await this.model.findByPk(userId, { include: models.Permission });
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

  /**
   * Add a permissions to a user
   * @params {int} userId - the id of the user
   * @params {string} - The name of the permission to add
   * @return {object|Error} returns the new permission
   */
  async AddUserPermission(userId, permission) {
    try {
      const user = await this.model.findByPk(userId, { include: models.Permission });
      if (!user) throw new Error('User not found.');
      const newPermission = await user.createPermission({ role: permission });
      return newPermission;
    } catch (e) {
      return e;
    }
  }

  /**
   * remove a permissions from a user
   * @params {int} userId - the id of the user
   * @params {string} - The name of the permission to add
   * @return {int|Error} returns 1 or error
   */
  async RemoveUserPermission(userId, permission) {
    try {
      const removedPermission = await this.models.Permission.destroy({
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

module.exports = new UserService('User', models);
