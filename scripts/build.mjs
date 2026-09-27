import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');
const publicDir = path.join(root, 'public');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });
await cp(publicDir, dist, { recursive: true });

const required = ['index.html', 'main.js', 'contact.js', 'styles.css', 'politica-de-privacidade/index.html', 'media/crest.webp', 'media/drone.mp4', 'media/lake-night.mp4'];
for (const file of required) await stat(path.join(dist, file));
console.log(`Build estático pronto: ${dist}`);
