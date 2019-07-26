module.exports = (bookshelf, tableName) => bookshelf.Model.extend({
  tableName,
  hasTimestamps: true,
  instances() {
    return this.hasMany('instance');
  },
}, {
  async autocomplete(phrase) {
    const Model = bookshelf.model(tableName);
    const keywords = phrase.split(' ');
    const word = keywords[keywords.length - 1];
    return new Model().query((qb) => {
      qb.select('id', 'value');
      qb.where('value', 'ilike', `%${word}%`);
    }).fetchAll();
  },
  async upsert(data, accountId) {
    const { value } = data;
    const Model = bookshelf.model(tableName);
    const existing = await new Model({ value }).fetch();
    if (!existing) return new Model({ value }).set({ created_by: accountId }).save();
    return existing.set({ updated_by: accountId }).save();
  },
});
