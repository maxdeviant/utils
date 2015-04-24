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
    } else if (argv.d) {
        var dir = path.resolve('./', typeof argv.d === 'string' ? argv.d : '.');

        fs.readdir(dir, function (err, list) {
            list.forEach(function (file) {
                var filename = file.replace(path.extname(file), '');
                var extension = path.extname(file);

                var slugified = slugify(filename) + extension;

                console.log(file === slugified);

                fs.rename(file, slugified, function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log(file + ' => ' + slugified);
                });
            });
        });

        return;
    } else {
        var string = argv._.splice(1, argv._.length).join(' ');

        console.log(slugify(string));
    }
};
