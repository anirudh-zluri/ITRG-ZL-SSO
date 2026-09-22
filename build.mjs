import fs from 'node:fs';
import path from 'node:path';

const SRC = 'src';
const OUT = 'public';

// slug -> page metadata. `nav` is the sidenav anchor id to mark as the active page.
const PAGES = {
  index: { title: 'CIO Analytics', nav: 'subnav-link-programs-service-desk-analyses-metrics' },
  zluri: { title: "Zluri's SaaS Management Platform", nav: 'subnav-link-zluri-saas-management' },
};

const layout = fs.readFileSync(path.join(SRC, 'layout.html'), 'utf8');

function render(slug, { title, nav }) {
  const content = fs.readFileSync(path.join(SRC, 'pages', `${slug}.html`), 'utf8');
  let html = layout
    .replace('<!--CONTENT-->', content)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  if (nav) {
    const marked = html.replace(`<a id="${nav}"`, `<a id="${nav}" aria-current="page"`);
    if (marked === html) throw new Error(`nav id "${nav}" not found in layout`);
    html = marked;
  }
  return html;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });

for (const [slug, meta] of Object.entries(PAGES)) {
  fs.writeFileSync(path.join(OUT, `${slug}.html`), render(slug, meta));
  console.log(`built ${slug}.html`);
}
