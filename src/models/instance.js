module.exports = (bookshelf, tableName) => bookshelf.Model.extend({
  tableName,
  hasTimestamps: true,
  features() {
    return this.belongsToMany('feature');
  },
  decision() {
    return this.belongsTo('decision');
  },
}, {
  async fetchAll() {
    const Model = bookshelf.model(tableName);
    const relations = ['features', 'decision'];
    return new Model().fetchAll({ withRelated: relations });
  },
});
