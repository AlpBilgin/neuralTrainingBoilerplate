var synaptic = require('../node_modules/synaptic/dist/synaptic.min.js');

var Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// train the network - learn XOR

var learningRate = .3;

for (var i = 0; i < 20000; i++) {
  // 0,0 => 0
  myNetwork.activate([0, 0]);
  myNetwork.propagate(learningRate, [0]);

  // 0,1 => 1
  myNetwork.activate([0, 1]);
  myNetwork.propagate(learningRate, [1]);

  // 1,0 => 1
  myNetwork.activate([1, 0]);
  myNetwork.propagate(learningRate, [1]);

  // 1,1 => 0
  myNetwork.activate([1, 1]);
  myNetwork.propagate(learningRate, [0]);

  // output results every 2000 iterations

  if (i % 2000 === 0) {
    console.log(myNetwork.activate([0, 0]));
    //-> [0.015020775950893527]

    console.log(myNetwork.activate([0, 1]));
    //->[0.9815816381088985]

    console.log(myNetwork.activate([1, 0]));
    //-> [0.9871822457132193]

    console.log(myNetwork.activate([1, 1]));
    //-> [0.012950087641929467]
    console.log('---------------------------')
  }
}
