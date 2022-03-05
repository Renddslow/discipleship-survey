const mri = require('mri');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  minify: prog.minify,
  watch: prog.watch,
  jsx: "transform",
  jsxFactory: "React",
  jsxFragment: "React.Fragment",
  define: {
    'process.env.VERSION': `"${require('./package.json').version}"`,
  },
});
