const mri = require('mri');
const { build } = require('esbuild');

const pkg = require('./package.json');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

const external = [...Object.keys(pkg.devDependencies), ...Object.keys(pkg.dependencies)];

build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  external,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  minify: prog.minify,
  watch: prog.watch,
  define: {
    'process.env.VERSION': `"${require('./package.json').version}"`,
  },
}).then(() =>
  build({
    entryPoints: ['client/index.ts'],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    outfile: 'public/index.js',
    minify: prog.minify,
    watch: prog.watch,
    jsx: 'transform',
    jsxFactory: 'React',
    jsxFragment: 'React.Fragment',
    define: {
      'process.env.VERSION': `"${require('./package.json').version}"`,
    },
  }),
);
