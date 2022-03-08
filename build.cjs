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
  // watch: prog.watch,
  define: {
    'process.env.VERSION': `"${require('./package.json').version}"`,
  },
});

build({
  entryPoints: ['client/index.tsx'],
  bundle: true,
  platform: 'browser',
  outfile: 'public/index.js',
  minify: prog.minify,
  watch: prog.watch,
  define: {
    'process.env.VERSION': `"${require('./package.json').version}"`,
  },
});
