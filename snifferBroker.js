'use strict';
//libs
let mqtt = require('mqtt');

//globals
let mqttConAnderson = null;
let mqttConLocalhost = null;
let brokerRemote = {
  'brokerAddress': 'iot.awges.com',
  'portMQTT': 8080
};

// Brahime - This variable manipulates the info to connect to you local broker
let brokerLocal = {
  'brokerAddress': 'localhost',
  'portMQTT': 1883
};

mqttConAnderson = mqtt.connect('mqtt://' + brokerRemote.brokerAddress, {
  clientId: 'testBrahimeRemote',
  username: 'brahime',
  password: '12345',
  port: brokerRemote.portMQTT
});

mqttConLocalhost = mqtt.connect('mqtt://' + brokerLocal.brokerAddress, {
  clientId: 'testBrahimeLocal',
  username: '',
  password: '',
  port: brokerLocal.portMQTT
});

mqttConLocalhost.on('connect', function() {
  console.log('Connected to the local broker:' + brokerLocal.brokerAddress + ':' + brokerLocal.portMQTT);
});

mqttConAnderson.on('connect', function() {
  console.log('Connected to the remote broker:' + brokerRemote.brokerAddress + ':' + brokerRemote.portMQTT);
  mqttConAnderson.subscribe('#');
});

mqttConAnderson.on('message', function(topic, message) {
  console.log('| Cloud -> localhost |');
  console.log('Received new message from remote broker:' + brokerRemote.brokerAddress + ':' + brokerRemote.portMQTT);
  console.log(topic+' = '+message);
  mqttConLocalhost.publish(topic, message);
  console.log('Publishing into:' + brokerLocal.brokerAddress + ':' + brokerLocal.portMQTT);
});
