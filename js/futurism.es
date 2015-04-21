(($, argMap) => {
$(() => {

const nodeData = {
  naive: {
    label: ['Naive prediction'],
    type: 'method',
    x: w => 10,
    y: h => h / 2
  }, mediocre: {
    label: ['Mediocre accuracy'],
    type: 'outcome',
    x: w => -w / 4,
    y: h => -20,
  }, overconfident: {
    label: ['Overconfident'],
    type: 'outcome',
    x: w => -w / 4,
    y: h => 0
  }, optimistic: {
    label: ['Highly', 'optimistic'],
    type: 'outcome',
    x: w => -w / 4,
    y: h => 20
  }, single: {
    label: ['Envisioning a', 'single scenario'],
    type: 'method',
    x: w => -10,
    y: h => h / 2
  }, moreLikely: {
    label: ['Believing the', 'scenario more likely'],
    type: 'outcome',
    x: w => w / 4,
    y: h => h / 2
  }, multiple: {
    label: ['Envisioning', 'multiple scenarios'],
    type: 'method',
    x: w => 0,
    y: h => -h / 4
  }, outcomes: {
    label: ['Better outcomes for', 'scenario-planning', 'companies'],
    type: 'outcome',
    x: w => w / 4,
    y: h => -30
  }, widened: {
    label: ['Widened', 'confidence intervals'],
    type: 'outcome',
    x: w => w / 4,
    y: h => -20
  }, narrowed: {
    label: ['Narrowed', 'confidence intervals'],
    type: 'outcome',
    x: w => w / 4,
    y: h => -10
  }, framing: {
    label: ['Reduced', 'framing bias'],
    type: 'outcome',
    x: w => w / 4,
    y: h => -40
  }, other: {
    label: ['Other', 'planning techniques'],
    type: 'method',
    x: w => -20,
    y: h => -h / 4
  }, pessimistic: {
    label: ['Pessimistic', 'scenarios don\'t',  'affect predictions'],
    type: 'conclusion',
    x: w => w / 4,
    y: h => 20
  }, rational: {
    label: ['Decreased rational', 'decision-making style'],
    type: 'outcome',
    x: w => w / 4,
    y: h => 10
  }
};

const linkData = [
  {source: 'mediocre', target: 'other', type: 'motivates'},
  {source: 'mediocre', target: 'multiple', type: 'motivates'},
  {source: 'optimistic', target: 'other', type: 'motivates'},
  {source: 'optimistic', target: 'multiple', type: 'motivates'},
  {source: 'overconfident', target: 'other', type: 'motivates'},
  {source: 'overconfident', target: 'multiple', type: 'motivates'},
  {source: 'single', target: 'moreLikely', type: 'causes'},
  {source: 'naive', target: 'single', type: 'subtype'},
  {source: 'naive', target: 'overconfident', type: 'causes'},
  {source: 'naive', target: 'mediocre', type: 'causes'},
  {source: 'naive', target: 'optimistic', type: 'causes'},
  {source: 'multiple', target: 'outcomes', type: 'causes'},
  {source: 'multiple', target: 'widened', type: 'causes'},
  {source: 'multiple', target: 'narrowed', type: 'causes'},
  {source: 'multiple', target: 'framing', type: 'causes'},
  {source: 'other', target: 'framing', type: 'causes'},
  {source: 'pessimistic', target: 'multiple', type: 'contradicts'},
  {source: 'multiple', target: 'rational', type: 'causes'}
];

const nodeTypeData = [
  {type: 'outcome', label: ['Outcome'], shape: argMap.shapes.circle},
  {type: 'method', label: ['Prediction method'], shape: argMap.shapes.square},
  {type: 'conclusion', label: ['Conclusion'], shape: argMap.shapes.diamond}
];

const linkTypeData = [
  {type: 'causes', label: ['Possible causation']},
  {type: 'subtype', label: ['Subtype']},
  {type: 'contradicts', label: ['Contradict']},
  {type: 'motivates', label: ['Motivate']}
];

argMap.handler(argMap.mkMap('#arg-map',
                            nodeData,
                            linkData,
                            nodeTypeData,
                            linkTypeData));

});
})($, argMap);