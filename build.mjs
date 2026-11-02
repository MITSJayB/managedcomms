// Builds the static site into public/. Run: node build.mjs
import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = 'https://managedcomms.uk';
const PHONE = '01204 954050';
const TEL = 'tel:+441204954050';
const YEAR = 2026;

// Buttons stay unlinked until their destinations are agreed. To link one, add href to btn().
const btn = (label, style = 'primary') => `<a class="btn btn-${style}">${label}</a>`;
const cta = (title, text, label) => `<section class="cta"><div class="wrap narrow">
<h2>${title}</h2><p>${text}</p>
<p class="actions">${btn(label)} <span class="or">or call <a href="${TEL}">${PHONE}</a></span></p>
</div></section>`;
const faq = (items) => `<section class="band"><div class="wrap narrow"><h2>Questions we often get</h2>
${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
</div></section>`;
const hero = (eyebrow, title, text, label) => `<section class="hero"><div class="wrap narrow">
<p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${text}</p>
<p class="actions">${btn(label)}</p></div></section>`;

const nav = [['/mobiles/', 'Mobiles'], ['/connectivity/', 'Connectivity'], ['/voip/', 'VoIP']];

const page = ({ path, title, description, body }) => `<!doctype html>
<html lang="en-GB"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Managed Comms">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE}${path}"><meta property="og:image" content="${SITE}/assets/og-image.png">
<meta name="theme-color" content="#4539C9">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/site.css">
</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap bar">
<a class="logo" href="/" aria-label="Managed Comms home"><img src="/assets/managed-comms-logo.png" width="1326" height="204" alt="Managed Comms, a Managed Technology Group company"></a>
<nav aria-label="Main"><ul>${nav.map(([h, l]) => `<li><a href="${h}"${h === path ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>
<a class="header-phone" href="${TEL}">${PHONE}</a>
</div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="wrap foot">
<div><img src="/assets/managed-comms-icon.png" width="84" height="56" alt=""><p><strong>Managed Comms</strong><br>Business mobiles, connectivity and VoIP.</p></div>
<div><h2>Services</h2><ul>${nav.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
<div><h2>Contact</h2><ul><li><a href="${TEL}">${PHONE}</a></li><li>WhatsApp: <a href="https://wa.me/447414218787">07414 218787</a></li><li><a href="mailto:hello@managedtechnologygroup.com">hello@managedtechnologygroup.com</a></li></ul></div>
</div><div class="wrap legal"><p>&copy; ${YEAR} Managed Technology Group Limited. Registered address: St. Peter&rsquo;s House, Silverwell Street, Bolton, BL1 1PP.</p></div></footer>
</body></html>
`;

const pages = [
  {
    path: '/',
    title: 'Business Mobiles, Connectivity and VoIP | Managed Comms',
    description: 'Business mobiles, connectivity and VoIP from one team. Compare your options and get ready for the PSTN switch-off with Managed Comms.',
    body: `${hero('Business communications', 'Your calls, mobiles and connections, looked after by one team', 'Choose the right mobile network, internet connection and phone system for your business, without chasing different suppliers.', 'Talk to our team')}
<section class="notice"><div class="wrap"><p><strong>The UK&rsquo;s analogue phone network is due to close on 31 January 2027.</strong> <a href="/voip/#pstn">See what it means for your business</a></p></div></section>
<section class="band"><div class="wrap"><h2>What we do</h2><div class="cards">
<a class="card" href="/mobiles/"><h3>Business mobiles</h3><p>Compare O2, EE and Vodafone, with one bill and one team to call.</p><span>Explore mobiles</span></a>
<a class="card" href="/connectivity/"><h3>Connectivity</h3><p>From business broadband to dedicated leased lines, matched to your premises.</p><span>Explore connectivity</span></a>
<a class="card" href="/voip/"><h3>VoIP</h3><p>Take business calls anywhere with 8x8, CallSwitch One or Gamma.</p><span>Explore VoIP</span></a>
</div></div></section>
${cta('Not sure where to start?', 'Tell us what you have now and what isn&rsquo;t working. We&rsquo;ll explain your options in plain English.', 'Talk to our team')}`,
  },
  {
    path: '/mobiles/',
    title: 'Business Mobile Plans on O2, EE and Vodafone | Managed Comms',
    description: 'Business mobile plans built around how your team works. Choose from O2, EE and Vodafone, with one bill and one point of contact.',
    body: `${hero('Business mobiles', 'Business mobiles that fit your team, not a price list', 'Compare O2, EE and Vodafone without calling three networks. We&rsquo;ll match your people to the right coverage and allowances, then look after everything from one place.', 'Get a mobile quote')}
<section class="band"><div class="wrap"><h2>Why buy through us?</h2><p class="intro">Going direct ties you to one network and its standard plans. We start with where your team works and how they use their phones, then build the deal around that.</p>
<div class="grid"><div><h3>Three networks to choose from</h3><p>Pick the network that performs best where your people work, not just the one you&rsquo;ve always used.</p></div>
<div><h3>Plans built to fit</h3><p>We can shape allowances and contract terms around your business, rather than squeezing you into a fixed bundle.</p></div>
<div><h3>One bill</h3><p>Keep your mobile costs in one place, with less admin for your finance team.</p></div>
<div><h3>One team to call</h3><p>Speak to people who know your account, whether it&rsquo;s a new SIM, a change or a problem.</p></div></div></div></section>
<section class="band tint"><div class="wrap narrow"><h2>Choose the right network</h2><div class="scroll"><table><thead><tr><th scope="col">Network</th><th scope="col">Worth considering if</th></tr></thead><tbody>
<tr><th scope="row">O2</th><td>You want a cost-effective plan for everyday business use</td></tr>
<tr><th scope="row">EE</th><td>You want a business plan on the EE network</td></tr>
<tr><th scope="row">Vodafone</th><td>Your team travels or calls abroad and could benefit from international bolt-ons</td></tr>
</tbody></table></div><p>Not sure which suits you? Tell us where your team works and we&rsquo;ll help you compare.</p></div></section>
<section class="band"><div class="wrap narrow"><h2>Stay in control of your costs</h2><p>Surprise bills usually come from usage nobody saw coming. Our online tools help you spot it early and make routine changes quickly.</p>
<ul class="ticks"><li>Set usage alerts</li><li>Add or remove bars on a line</li><li>Manage bolt-ons and top-ups</li><li>Request SIM changes</li><li>View invoices and raise support tickets</li></ul></div></section>
${faq([
      ['Can I keep my existing numbers?', 'In most cases, yes. We&rsquo;ll guide you through moving your numbers when you switch.'],
      ['Can I have different plans for different people?', 'Yes. A field engineer and an office manager rarely need the same allowance, so we&rsquo;ll build your plan around how each role works.'],
      ['What if a phone is lost or stolen?', 'Call us as soon as you can. We&rsquo;ll help you bar the line and arrange a replacement SIM.'],
    ])}
${cta('Find the right plan for your team', 'Tell us how many lines you have and where your people work. We&rsquo;ll come back with a clear recommendation.', 'Talk to our team')}`,
  },
  {
    path: '/connectivity/',
    title: 'Business Broadband and Leased Lines | Managed Comms',
    description: 'Reliable business connectivity, from full fibre broadband to dedicated leased lines. Find the right connection for your premises and your team.',
    body: `${hero('Connectivity', 'Internet your business can rely on', 'Calls, cloud apps and card payments all depend on your connection. We&rsquo;ll help you choose one that suits your premises, your team and how much downtime you can afford.', 'Check what&rsquo;s available')}
<section class="band"><div class="wrap narrow"><h2>Which connection do you need?</h2><div class="scroll"><table><thead><tr><td></td><th scope="col">Business broadband</th><th scope="col">Leased line</th></tr></thead><tbody>
<tr><th scope="row">Best for</th><td>Smaller offices and everyday cloud use</td><td>Busy sites and businesses where downtime is costly</td></tr>
<tr><th scope="row">Bandwidth</th><td>Shared with other users on the network</td><td>Dedicated to your business</td></tr>
<tr><th scope="row">Upload speed</th><td>Usually slower than download</td><td>Matches download</td></tr>
<tr><th scope="row">Installation</th><td>Usually quicker</td><td>Longer, and may involve survey and civils work</td></tr>
<tr><th scope="row">Cost</th><td>Lower monthly cost</td><td>Higher monthly cost</td></tr>
</tbody></table></div></div></section>
<section class="band tint"><div class="wrap narrow"><h2>Leased lines: a connection that&rsquo;s yours alone</h2><p>A leased line is a private, dedicated fibre connection between your premises and the network. You don&rsquo;t share it with neighbouring businesses, so your speeds stay more consistent when the area gets busy.</p><p>It&rsquo;s often worth considering if you:</p>
<ul class="ticks"><li>Have a large team working in cloud apps all day</li><li>Run lots of VoIP calls or video meetings at once</li><li>Regularly upload large files or back up offsite</li><li>Connect several sites or host your own systems</li><li>Lose real money whenever the internet goes down</li></ul></div></section>
<section class="band"><div class="wrap narrow"><h2>Plan for when things go wrong</h2><p>Even the best connection can fail. We&rsquo;ll look at what would stop your business working and suggest the right backup, such as a second line or a 4G or 5G failover that takes over if your main connection drops.</p>
<h2>What we need from you</h2><p>Availability and pricing depend on your exact address, so a postcode is the best place to start. It also helps to know how many people are on site and which systems they rely on.</p></div></section>
${faq([
      ['How long does a leased line take to install?', 'It varies by location and the work required, and it usually takes longer than broadband. We&rsquo;ll give you an estimated timescale with your quote.'],
      ['Do I need a leased line, or will full fibre do?', 'Full fibre suits many smaller businesses very well. A leased line makes more sense when consistent speed and fast fault response matter more than the lower monthly cost.'],
      ['Will the PSTN switch-off affect my broadband?', 'It can. Older broadband services that rely on the copper phone network may need to move, so we&rsquo;ll check your current lines as part of your review.'],
    ])}
${cta('Find the right connection for your premises', 'Send us your postcode and tell us what your team needs. We&rsquo;ll explain your options in plain English.', 'Check my options')}`,
  },
  {
    path: '/voip/',
    title: 'VoIP and Cloud Phone Systems for Business | Managed Comms',
    description: 'Move your business phones to the cloud before the PSTN switch-off. Take calls in the office, at home or on the move, on one flexible system.',
    body: `${hero('VoIP', 'A phone system that goes where your team goes', 'VoIP runs your business calls over the internet instead of old phone lines. Your team can answer on a desk phone, computer or mobile, and customers still reach the same business number.', 'Book a VoIP review')}
<section class="band tint" id="pstn"><div class="wrap narrow"><h2>The PSTN switch-off: act before 31 January 2027</h2>
<p><strong>The UK&rsquo;s analogue phone network is <a href="https://ispreview.co.uk/index.php/2026/09/openreach-confirm-post-january-2027-measures-for-uk-analogue-phone-switch-off.html" rel="noopener">due to close on 31 January 2027</a>, and ISDN lines are closing with it.</strong> If your business still relies on either, you need a plan now. In September 2026, Openreach counted about 1.2 million lines still to move, including about 350,000 business premises.</p>
<h3>What happens if you don&rsquo;t move?</h3>
<p><a href="https://cxtoday.com/pstn-switch-off-2027-15-weeks-left-to-find-the-analogue-line" rel="noopener">Openreach says there won&rsquo;t be a &ldquo;big bang&rdquo; on 1 February</a>, but that isn&rsquo;t a reason to wait. Lines that haven&rsquo;t moved may go onto Emergency Voice Access, a temporary, last-resort service for essential calls. It costs more than a modern digital line, and Openreach&rsquo;s wholesale charge for a basic line becomes &pound;35 a month, before any supplier adds its own margin. Other lines may be disconnected, and some suppliers have already set earlier cut-offs.</p>
<h3>It&rsquo;s not only your phones</h3><p>The equipment most easily missed is often the most important. Check anything that uses a phone line, including:</p>
<ul class="ticks"><li>Lift emergency phones and alarm signalling</li><li>Door entry and building management systems</li><li>Card terminals and cash machines</li><li>CCTV links, lone-worker call points and telemetry</li><li>Older phone systems, ISDN lines, overflow routes and rarely used numbers</li><li>Older broadband that depends on the phone line</li></ul>
<h3>What to do now</h3><ol><li><strong>List every line and number.</strong> Include inbound numbers, backup routes and connected equipment.</li><li><strong>Find out who owns each one.</strong> Confirm the supplier, any cut-off date and who is responsible internally.</li><li><strong>Don&rsquo;t cancel lines that look unused.</strong> Check first that nothing depends on them.</li><li><strong>Move your numbers first.</strong> Transfer them before the old service is ceased.</li><li><strong>Test before you switch over.</strong> Check call routing, card payments, alarms and emergency calling, including during a power cut.</li></ol></div></section>
<section class="band"><div class="wrap narrow"><h2>What your team gets</h2><p>Your team can take business calls in the office, at home or on the move, on a desk phone, computer or mobile. Menus, queues and time-of-day rules get callers to the right person, and call recording supports training and quality checks. Depending on your platform, you can also connect your calls to Microsoft Teams and your CRM, and you can add users as you grow.</p>
<h2>Your call data, on our own platform</h2><p>We run our own telephone CDR platform, which holds the call detail records for your service. That means your call data sits with us, so we can answer questions about your calls, usage and costs directly.</p>
<h2>Three platforms to choose from</h2><p>We work with 8x8, CallSwitch One and Gamma, so we can recommend what suits your business rather than pushing one system. Tell us how your team works and we&rsquo;ll help you compare.</p></div></section>
<section class="band tint"><div class="wrap narrow"><h2>Moving is simpler than you think</h2><ol><li><strong>Review.</strong> We look at your lines, numbers, equipment and internet connection.</li><li><strong>Recommend.</strong> We suggest 8x8, CallSwitch One or Gamma, based on your size and the way you work.</li><li><strong>Set up.</strong> We configure your users, call routes and handsets.</li><li><strong>Switch.</strong> We move your numbers and help your team get started.</li></ol></div></section>
${faq([
      ['Can I keep my phone numbers?', 'In most cases, yes. We&rsquo;ll check your numbers and manage the transfer as part of your move.'],
      ['Do I need new handsets?', 'Not necessarily. Your team can use an app on a computer or mobile, and we&rsquo;ll check whether your current handsets are compatible.'],
      ['Will my internet connection cope?', 'We&rsquo;ll check before you switch. If your connection isn&rsquo;t up to it, we&rsquo;ll recommend an upgrade so call quality isn&rsquo;t left to chance.'],
      ['What happens if our internet goes down?', 'Calls can be diverted to mobiles or another location, and a backup connection can keep you running. We&rsquo;ll build the right plan into your setup.'],
    ])}
${cta('Get ready before the switch-off', 'Book a review and we&rsquo;ll tell you what needs to move, what it will involve and which option fits your business.', 'Book my VoIP review')}`,
  },
];

const write = (file, text) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, text); };
for (const p of pages) write(`public${p.path}index.html`, page(p));
write('public/404.html', page({ path: '/404', title: 'Page not found | Managed Comms', description: 'This page could not be found.', body: `<section class="hero"><div class="wrap narrow"><h1>Page not found</h1><p class="lead">That page has moved or doesn&rsquo;t exist. <a href="/">Go to the home page</a> or call <a href="${TEL}">${PHONE}</a>.</p></div></section>` }).replace(/<link rel="canonical"[^>]*>\n/, '<meta name="robots" content="noindex">\n'));
write('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${SITE}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
write('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
write('public/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; img-src 'self'; style-src 'self'; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'\n/assets/*\n  Cache-Control: public, max-age=86400\n`);
mkdirSync('public/assets', { recursive: true });
copyFileSync('src/site.css', 'public/assets/site.css');
for (const f of readdirSync('src/assets')) copyFileSync(`src/assets/${f}`, `public/assets/${f}`);
