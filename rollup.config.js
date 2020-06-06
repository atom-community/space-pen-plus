import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import coffeescript from 'rollup-plugin-coffee-script';
import {terser} from 'rollup-plugin-terser';

let plugins = [
    coffeescript(),

    // so Rollup can find externals
    resolve({extensions: ['.js', '.coffee'], preferBuiltins: true}),

    // so Rollup can convert externals to an ES module
    commonjs(),
];

// minify only in production mode
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        // minify
        terser({
            ecma: 2018,
            warnings: true,
            compress: {
                drop_console: false,
            },
        })
    );
}

export default [
    // main
    {
        input: 'src/space-pen.coffee',
        output: [
            {
                dir: "lib",
                format: 'cjs',
                sourcemap: true,
            },
        ],
        plugins: plugins,
    },
    // es
    {
        input: 'src/space-pen.coffee',
        output: [
            {
                file: "lib/space-pen.es.js",
                format: 'es',
                sourcemap: true,
            },
        ],
        plugins: plugins,
    },
    // browser spec
    {
        input: 'spec/spec-rollup.coffee',
        output: [
            {
                file: "spec/browser_spec.js",
                format: 'cjs',
                sourcemap: true,
            },
        ],
        plugins: plugins
    },
];
