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
    return new Model().fetchAll({
      withRelated: ['features', 'decision'],
    });
  },
});
