import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = await readFile(path.join(root, 'src/index.html'), 'utf8');
const contact = await readFile(path.join(root, 'src/contact.js'), 'utf8');
const privacy = await readFile(path.join(root, 'src/politica-de-privacidade/index.html'), 'utf8');
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
assert(!/mobile-sticky|Falar sobre o sítio/i.test(html + css), 'CTA fixo ainda presente');
assert((html.match(/data-contact/g) || []).length === 3, 'Esperados três CTAs contextuais');
assert((html.match(/<video muted playsinline/g) || []).length === 2, 'Vídeos sem atributos silenciosos');
assert(contact.includes('5533987380223'), 'WhatsApp confirmado ausente');
assert(html.includes('/politica-de-privacidade/'), 'Link da política ausente');
assert(privacy.includes('Janaína Alves') && privacy.includes('data-privacy-contact'), 'Contato da política ausente');
console.log('Verificações de estrutura concluídas.');
