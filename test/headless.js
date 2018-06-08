global.window = global;
global.assert = require('chai').assert;
global.assert = require('chai').expect;
global.assert = require('chai').should;
global.fixtures = {
  cohorts: require('../data/cohorts.json'),
  progress: require('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  users: require('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
};
require('../src/data');
require('./data.spec.js');
