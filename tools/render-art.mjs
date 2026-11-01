// Tegner grafikken i tools/art.html med en browser uden vindue og gemmer den som PNG i public/art/.
// Kør: node tools/render-art.mjs   (bruger Firefox, sæt BROWSER=/sti/til/firefox hvis den ligger et andet sted)
import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'art');
mkdirSync(outDir, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), 'gb-art-'));

const browser = await puppeteer.launch({ browser: 'firefox', executablePath: process.env.BROWSER || '/usr/bin/firefox', headless: true, userDataDir: profile });
try {
  const page = await browser.newPage();
  await page.goto('file://' + join(root, 'tools', 'art.html'));
  await page.waitForFunction(() => window.ART, { timeout: 20000 });
  const art = await page.evaluate(() => window.ART);
  for (const [name, url] of Object.entries(art)) {
    writeFileSync(join(outDir, name + '.png'), Buffer.from(url.split(',')[1], 'base64'));
  }
  console.log(Object.keys(art).length, 'billeder gemt i public/art/');
} finally {
  await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
