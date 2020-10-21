let Transform = require('stream').Transform;
let TailwindExportConfig = require('tailwindcss-export-config');

module.exports = options => {
    let transformStream = new Transform({objectMode: true});

    let convertOptions = {
        config: options.config ? options.config : null,
        prefix: options.prefix ? options.prefix : '',
        format: options.format ? options.format : 'scss',
        flat: options.flat ? options.flat : false,
        quotedKeys: options.quotedKeys ? options.quotedKeys : false,
        preserveKeys: options.preserveKeys ? options.preserveKeys : [],
        flattenMapsAfter: options.flattenMapsAfter ? options.flattenMapsAfter : -1,
    }

    if (typeof convertOptions.config === 'string' && convertOptions.config !== '') {
        convertOptions.config = process.cwd() + '/' + convertOptions.config;
    }

    transformStream._transform = (file, encoding, callback) => {
        if (file.isNull() || file.isDirectory()) {
            return callback(null, file)
        }

        if (file.isStream()) {
            return handleError('Streams are not supported!')
        }

        if (!convertOptions.config) {
            convertOptions.config = file.path;
        }

        let converter = new TailwindExportConfig(convertOptions);
        let output = converter.convert();

        file.contents = Buffer.from(output);

        if (options.output) {
            file.path = process.cwd() + '/' + options.output;
        }

        callback(null, file);
    };

    return transformStream;
};