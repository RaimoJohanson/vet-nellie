exports.fetchAll = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const Model = bookshelf.model('feature');
    const record = await new Model().fetchAll();
    return res.json(record);
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
    const record = await new Model({ id: req.params.id }).fetch();
    return res.json(record);
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
