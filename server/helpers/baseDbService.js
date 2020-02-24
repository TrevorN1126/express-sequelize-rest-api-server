/**
 * Creates a new ItemService.
 * @class
 */
class DbService {
  constructor(componentName, model) {
    this.componentName = componentName;
    this.model = model;
  }

  /**
   * Create a new item
   * @params {object} item - Object representing a new item
   * @return {object} item
   */
  async Create(item) {
    try {
      const itemRecord = await this.model.create(item);
      return  itemRecord;
    } catch (e) {
      return new Error(e.message);
    }
  }

  /**
   * Get a item
   * @params {string} itemId - The _id of the item
   * @return {object} item
   */
  async GetItem(itemId){
    try {
      let item = await this.model.findByPk(itemId);
      if (!item) throw new Error(this.componentName + ' not found.');
      return item;
    } catch (e) {
      return e;
    }
  }

  /**
   * Update a item
   * @params {string} itemId - The _id of the item
   * @params {object} item - TThe new values for the item
   * @return {object} item
   */
  async Update(itemId, newValues) {
    try {
      let item = await this.model.update(newValues, {
        where: {id: itemId}
      });
      if (item[0] === 0) throw new Error(this.componentName + ' not found.');
      let updatedItem = await this.model.findByPk(itemId);
      return updatedItem;
    } catch (e) {
      return e;
    }
  }

  /**
   * Get a list of all items
   * @return {object[]} item - An array of items
   */
  async List(){
    try {
      let items = await this.model.findAll({});
      return items;
    } catch (e) {
      return e;
    }
  }

  /**
   * Update a item
   * @params {string} itemId - The _id of the item
   * @return {number/error} 1 or error - "Item not found."
   */
  async Remove(itemId){
    try {
      let itemRemoved = await this.model.destroy({
        where: {id: itemId},
      });
      if (itemRemoved === 0) throw new Error(this.componentName + ' not found.');
      return itemRemoved;
    } catch (e) {
      return e;
    }
  }

}

module.exports = DbService;
