// Bygger den installérbare app (PWA) i app/ ud fra game.html.
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('..', import.meta.url);
// Google Fonts-linkene byttes ud med de lokale skrifttyper, så appen virker offline.
const game = readFileSync(new URL('game.html', root), 'utf8')
  .replace(/<link rel="preconnect"[^>]*>\n/g, '')
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts.css">');
const out = new URL('app/', root);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(new URL('public/', root), out, { recursive: true });

const index = `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#04070a">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Grid Breach">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>html{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>
</head>
<body>
${game}
<script>if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));</script>
</body>
</html>
`;
writeFileSync(new URL('index.html', out), index);

const version = createHash('sha256').update(index).digest('hex').slice(0, 10);
const fonts = ['fonts', 'art'].flatMap(d => readdirSync(new URL(`public/${d}/`, root)).map(f => `${d}/${f}`));
const sw = readFileSync(new URL('tools/sw.template.js', root), 'utf8')
  .replace('__VERSION__', version)
  .replace("'apple-touch-icon.png']", `'apple-touch-icon.png', 'fonts.css', ${fonts.map(f => `'${f}'`).join(', ')}]`);
writeFileSync(new URL('sw.js', out), sw);

writeFileSync(new URL('manifest.webmanifest', out), JSON.stringify({
  name: 'Grid Breach',
  short_name: 'Grid Breach',
  description: 'Fair blokpuslespil uden reklamer.',
  lang: 'da',
  start_url: './',
  scope: './',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#04070a',
  theme_color: '#04070a',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));
console.log('app/ bygget, cache-version', version);
