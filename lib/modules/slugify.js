'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (argv) {
    var slugify = function (string) {
        return string.replace(/[^a-z0-9]/gi, '-').replace(/\-+/g, '-').toLowerCase();
    };

    if (argv.f) {
        var file = path.resolve('./', argv.f);

        fs.readFile(file, 'utf8', function (err, data) {
            var lines = data.split('\r\n');
            var slugs = [];

            for (var i in lines) {
                slugs.push(slugify(lines[i]));
            }

            fs.writeFile(file, slugs.join('\r\n'), function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('Finished slugifying ' + file);
            });
        });
    } else {
        var string = argv._.splice(1, argv._.length).join(' ');

        console.log(slugify(string));
    }
};
