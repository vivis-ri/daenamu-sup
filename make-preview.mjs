import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto('file://' + resolve(__dirname, 'preview-template.html'));
await page.waitForNetworkIdle({ idleTime: 1000, timeout: 15000 }).catch(() => {});
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: resolve(__dirname, 'preview.png'), type: 'png' });
await browser.close();
console.log('preview.png saved');
