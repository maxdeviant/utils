'use strict';

module.exports = function (argv) {
    var string = argv._.splice(1, argv._.length).join(' ');

    return string.replace(/[^a-z0-9]/gi, '-').replace(/\-+/g, '-').toLowerCase();
};
