/* eslint-disable */
module.exports = (data, interactions) => {
  let amountOfImmuneLabels = 3;
  let output = [];
  let fitness_sum = 0;
  data.forEach(e => {
    fitness_sum += e.fitness;
  });
  let avg_fitness = fitness_sum / data.length;

  //console.log('Average fitness:', avg_fitness);
  //console.log(data);
  data.forEach(e => {
		//console.log('Label instance %s.fitness= %s', e.label, e.fitness);
		if (e.fitness >= avg_fitness) output.push(data.splice(data.indexOf(e), 1)[0]);
	});

  interactions.forEach(record => { //update data per each interaction;
      if (record.decision < 2) data = prune(data, record.id, record.decision);
  });


  function prune(dataset, id, decision) {
      let cache = [];
      dataset.forEach(subject => {

          switch (decision) {
              case 1:
                  if (subject.features.indexOf(Number(id)) > -1) {

                      cache.push(subject);
                  }
                  break;
              case 0:
                  if (subject.features.indexOf(Number(id)) < 0) {

                      cache.push(subject);
                  }
                  break;
              default:
                  console.log('Exception @ pruning - feature ID: %s, decision: %s', id, decision);
          }

      });
      return cache;
  }
  output = output.concat(data);
  return output;
}