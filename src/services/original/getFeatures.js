function getFeatures(data) {

  function countData(dataset) {
      let output = {
          total: 0,
          labels: {},
          features: {}
      };
      dataset.forEach(subject => {
          output.total++;
          if (output.labels[subject.label]) output.labels[subject.label]++;
          else output.labels[subject.label] = 1;

          for (var featureId of subject.features) {
              if (output.features[featureId]) output.features[featureId]++;
              else output.features[featureId] = 1;
          }
      });
      return output;
  }

  function countFeature(dataset, id) {

      let sides = {
          leftCount: {
              total: 0,
              labels: {},
              features: {}
          },
          rightCount: {
              total: 0,
              labels: {},
              features: {}
          }
      };
      dataset.forEach(subject => {
          let side;
          subject.features.indexOf(Number(id)) > -1 ? side = 'leftCount' : side = 'rightCount';

          sides[side].total++;
          if (sides[side].labels[subject.label]) sides[side].labels[subject.label]++;
          else sides[side].labels[subject.label] = 1;
          for (let featureId of subject.features) {
              if (sides[side].features[featureId]) sides[side].features[featureId]++;
              else sides[side].features[featureId] = 1;
          }
      });
      return sides;
  }

  function calculateEntropy(count) {
      //EQUATION: -(x / (x+y)) * log2(x / (x+y)) - (y / (x+y)) * log2(y / (x+y));
      let result = -1;
      for (let id in count.labels) {
          let i = Number(count.labels[id]);

          if (result === -1) result *= (i / count.total) * Math.log2(i / count.total);
          else result -= (i / count.total) * Math.log2(i / count.total);
      }
      return parseFloat(result).toFixed(4);
  }

  let count = countData(data);

  //console.log('Count before:');
  //console.log(count);

  let entropyBefore = calculateEntropy(count);
  //console.log('Entropy before: %s', entropyBefore);
  let informationGain = {};

  for (let id in count.features) {

      let featureCount = countFeature(data, id);

      let entropyLeft = calculateEntropy(featureCount.leftCount);

      let entropyRight = calculateEntropy(featureCount.rightCount);

      let entropyAfter = parseFloat(featureCount.leftCount.total / count.total * entropyLeft + featureCount.rightCount.total / count.total * entropyRight).toFixed(4);
      //console.log('Entropy after: %s', entropyAfter);

      let iGain = entropyBefore - entropyAfter;
      informationGain[id] = parseFloat(iGain).toFixed(4) / 1;

  }
  //console.log('Infromation Gain:', informationGain);

  let gains = [];
  for (let id in informationGain) {
      gains[gains.length] = { id: Number(id), gain: informationGain[id] };

  }
  //console.log('Sorted order of features based on info gain:');
  return gains.sort(function(a, b) { return b.gain - a.gain });
}