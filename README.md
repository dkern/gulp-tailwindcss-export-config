# Export Tailwind config options with Gulp

This is just a simple wrapper for [tailwindcss-export-config](https://github.com/dobromir-hristov/tailwindcss-export-config) what can easily integrated within Gulp tasks.


## Options
All options, which are available on `tailwindcss-export-config@2.3.0`, are supported. More inforamtion about config uptions can be found in the [documentation](https://github.com/dobromir-hristov/tailwindcss-export-config#config-options).

The only option not supported is `destination`, because working with `gulp`. Therefore `gulp.dest` can ber used.


## Example Task 

```js
let tailwindExportConfig = require('gulp-tailwindcss-config-export');

gulp.task('export-to-scss', () => {
    return gulp
        .src('path/to/tailwind.config.js')
        .pipe(tailwindExportConfig({
            output: '_export.scss',
            format: 'scss',
            flat: true,
            quotedKeys: true,
        }))
        .pipe(gulp.dest('./scss/imports'));
});
```


## Passing the Tailwind Config

Pass as `string` via `gulp.src`:
```js
gulp.src('path/to/tailwind.config.js')
    .pipe(tailwindExportConfig({
        output: '_export.scss',
        format: 'scss',
    }))
    .pipe(gulp.dest('./scss/imports'));
```

Pass as `string` via configuration:
```js
    // ...
    .pipe(tailwindExportConfig({
        config: 'path/to/tailwind.config.js',
        output: '_export.scss',
        format: 'scss',
    }))
    .pipe(gulp.dest('./scss/imports'));
```

Pass as `object` via configuration:
```js
let tailwindConfig = require('./tailwind.config.js');

    // ...
    .pipe(tailwindExportConfig({
        config: tailwindConfig,
        output: '_export.scss',
        format: 'scss',
    }))
    .pipe(gulp.dest('./scss/imports'));
```