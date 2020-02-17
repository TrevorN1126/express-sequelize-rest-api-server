/**
 * Creates a new ItemService.
 * @class
 */
class DbService {
  constructor(componentName, model) {
    this.componentName = componentName;
    this.model = model;
  }

  async Create(item) {
    try {
      const itemRecord = await this.model.create(item);
      // console.log(itemRecord.name);
      // console.log(itemRecord.message);
      // if (itemRecord.message) throw new Error(itemRecord.message);
      return  itemRecord;
    } catch (e) {
      return e;
    }
  }

  async GetById(itemId){
    try {
      let item = await this.model.findById(itemId);
      if (!item) throw new Error(this.componentName + ' not found.');
      return item;
    } catch (e) {
      return e;
    }

  }

  async Update(itemId, newValues) {
    try {
      let item = await this.model.findById(itemId);
      if (!item) throw new Error('Item not found');
      Object.assign(item, newValues);
      await item.save();
      return item;
    } catch (e) {
      return e;
    }

  }

  async List(){
    try {
      let items = await this.model.find({});
      return items;
    } catch (e) {
      return e;
    }
  }

  async Remove(itemId){
    try {
      let itemRemoved = await this.model.remove({ _id: itemId });
      return itemRemoved;
    } catch (e) {
      return e;
    }
  }

}

module.exports = DbService;
