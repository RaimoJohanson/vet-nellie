exports.instances = collection => collection.map(instance => ({
  label: instance.get('decision_id'),
  features: instance.related('features').map(feature => feature.get('id')),
}));
