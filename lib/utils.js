'use strict';

var argv = require('yargs').argv;

var VALID = [
    'slugify'
];

var command = argv._[0];

if (VALID.indexOf(command) === -1) {
    console.log('Unrecognized command: ' + command);
    return;
}

var module = require('./modules/' + command)(argv);
