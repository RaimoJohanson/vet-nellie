const DataFormat = require('../format/data');

exports.fetchAll = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const data = await bookshelf.model('instance').fetchAll();
    const formatted = DataFormat.instances(data);
    return res.json(formatted);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.create = app => async (req, res) => {
  try {
    const accountId = 1;
    const data = req.body;
    const bookshelf = app.get('bookshelf');
    const Instance = bookshelf.model('instance');
    const Decision = bookshelf.model('decision');
    const Feature = bookshelf.model('feature');

    if (!data.decision) return res.json('decision missing');
    if (!data.features) return res.json('features missing');

    const { decision, features } = data;
    // upsert decision
    const Diagnosis = await Decision.upsert(decision, accountId);
    // upsert all the questions
    const Features = await Promise.all(features
      .map(async feature => Feature.upsert(feature, accountId)));
    // save instance
    const newInstance = await new Instance()
      .set({ created_by: accountId })
      .save({ decision_id: Diagnosis.get('id') });
    // attach features and instances
    await Promise.all(Features.map(async feature => feature.instances().attach(newInstance.get('id'))));

    return res.json('done?');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
/*
{
  decision: {},
  features: [],
}
*/
