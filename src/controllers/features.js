exports.fetchAll = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const records = await new Model().fetchAll();
    return res.json(records);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.fetchPage = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const withRelated = ['instances'];
    const { page = 1, pageSize = 10 } = req.query;
    const list = await new Model().fetchPage({ pageSize, page, withRelated });

    const formatted = list.toJSON().map(item => ({ ...item, instances: item.instances.length }));
    return res.json({
      list: formatted,
      pagination: list.pagination,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.autocomplete = app => async (req, res) => {
  try {
    if (!req.query.phrase) return res.json([]);
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const record = await Model.autocomplete(req.query.phrase);
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.create = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const record = await new Model().fetchAll();
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.fetchOne = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const record = await new Model({ id: req.params.id }).fetch();
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.update = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const { value } = req.body;
    const record = await new Model({ id: req.params.id }).fetch();
    if (!record) return res.status(404).json('Feature not found');

    const result = await record.save({ value }, { method: 'update' });
    return res.json(result);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.delete = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const record = await new Model({ id: req.params.id }).fetch();
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
