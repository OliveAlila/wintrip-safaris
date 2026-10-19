let destinations = [
 {name:'Lamu',region:'Kenya',tag:'Swahili culture & island life',image:'photo-1518509562904-e7ef99cdcc86'},
 {name:'Nairobi',region:'Kenya',tag:'Culture, dining & city energy',image:'photo-1516026672322-bc52d61a55d5'},
 {name:'Maasai Mara',region:'Kenya',tag:'Big cats & the Great Migration',image:'photo-1516426122078-c23e76319801'},
 {name:'Diani & the South Coast',region:'Kenya',tag:'White sands & turquoise water',image:'photo-1500375592092-40eb2168fd21'},
 {name:'Mombasa',region:'Kenya',tag:'Old Town, culture & beaches',image:'photo-1509233725247-49e657c54213'},
 {name:'Zanzibar',region:'Africa',tag:'Spice islands & Indian Ocean shores',image:'photo-1544551763-46a013bb70d5'},
 {name:'Naivasha & the Rift',region:'Kenya',tag:'Lake escapes & Rift Valley views',image:'photo-1472396961693-142e6e269027'},
 {name:'Dubai',region:'Middle East',tag:'Desert adventures & iconic skyline',image:'photo-1512453979798-5ea266f8880c'},
 {name:'Cape Town',region:'Africa',tag:'Mountain, city & coast',image:'photo-1580060839134-75a5edca2e99'},
 {name:'Rwanda',region:'Africa',tag:'Gorilla trekking & Kigali',image:'photo-1516026672322-bc52d61a55d5'},
 {name:'Mauritius',region:'Africa',tag:'Turquoise lagoons & island stays',image:'photo-1514282401047-d79a71a590e8'},
 {name:'Seychelles',region:'Africa',tag:'Granite beaches & island escapes',image:'photo-1510414842594-a61c69b5ae57'},
 {name:'Abu Dhabi',region:'Middle East',tag:'Culture, grand architecture & Yas Island',image:'photo-1512632578888-169bbbc64f33'},
 {name:'Doha, Qatar',region:'Middle East',tag:'Modern skyline & rich heritage',image:'photo-1533105079780-92b9be482077'},
 {name:'Bali, Indonesia',region:'Asia',tag:'Rice terraces, temples & beaches',image:'photo-1537996194471-e657df975ab4'},
 {name:'Singapore',region:'Asia',tag:'Gardens, skyline & world-class food',image:'photo-1525625293386-3f8f99389edd'},
 {name:'Malaysia / Kuala Lumpur',region:'Asia',tag:'City skyline, culture & island escapes',image:'photo-1596422846543-75c6fc197f07'},
 {name:'Europe',region:'Europe',tag:'A curated journey across iconic cities',image:'photo-1499856871958-5b9627545d1a'},
 {name:'Malindi & Watamu',region:'Kenya',tag:'Marine parks & coastal charm',image:'photo-1500375592092-40eb2168fd21'},
 {name:'Amboseli',region:'Kenya',tag:'Elephants & Kilimanjaro views',image:'photo-1516026672322-bc52d61a55d5'},
 {name:'Tsavo',region:'Kenya',tag:'Vast wilderness & red-dusted elephants',image:'photo-1516426122078-c23e76319801'},
 {name:'Samburu',region:'Kenya',tag:'Remote landscapes & rare wildlife',image:'photo-1511497584788-876760111969'},
 {name:'Lake Nakuru',region:'Kenya',tag:'Flamingos, rhinos & Rift Valley scenery',image:'photo-1472396961693-142e6e269027'},
 {name:'Lake Elementaita',region:'Kenya',tag:'Quiet lakeside stays & birdlife',image:'photo-1470770841072-f978cf4d019e'},
 {name:'Mount Kenya',region:'Kenya',tag:'Mountain trails & highland retreats',image:'photo-1464822759023-fed622ff2c3b'},
 {name:'Uganda',region:'Africa',tag:'Gorilla trekking & the source of the Nile',image:'photo-1516026672322-bc52d61a55d5'},
 {name:'Johannesburg',region:'Africa',tag:'Urban energy, history & culture',image:'photo-1518005020951-eccb494ad742'},
 {name:'Thailand',region:'Asia',tag:'Temples, beaches & street food',image:'photo-1528181304800-259b08848526'},
 {name:'Indonesia',region:'Asia',tag:'Volcanoes, temples & island adventures',image:'photo-1537996194471-e657df975ab4'},
 {name:'China',region:'Asia',tag:'Ancient landmarks & modern skylines',image:'photo-1508804185872-d7badad00f7d'},
 {name:'Japan',region:'Asia',tag:'Cherry blossoms, tradition & innovation',image:'photo-1493976040374-85c8e12f0c0e'},
 {name:'India',region:'Asia',tag:'Heritage, cuisine & diverse landscapes',image:'photo-1524492412937-b28074a5d7da'},
 {name:'Barbados',region:'Caribbean',tag:'Caribbean beaches, rum & island life',image:'photo-1580541631950-7282082b03fe'}
];
const photo=(id,w=720)=>/^https?:\/\//i.test(id||'')?id:`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
const grid=document.querySelector('#destination-grid');
const destinationOptions=destinations.map(d=>`<option value="${d.name}">${d.name}</option>`).join('');
['#search-destination','#enquiry-destination'].forEach(sel=>{const el=document.querySelector(sel);if(el)el.insertAdjacentHTML('beforeend',destinationOptions)});
try{
 const selectedDestination=sessionStorage.getItem('wintripSelectedDestination');
 if(selectedDestination){
  ['#search-destination','#enquiry-destination'].forEach(sel=>{const el=document.querySelector(sel);if(el)el.value=selectedDestination});
  const message=document.querySelector('#enquiry-form [name="message"]');
  if(message&&!message.value)message.value=`I'd like help planning a trip to ${selectedDestination}. Please share suggestions and a quote.`;
  sessionStorage.removeItem('wintripSelectedDestination');
 }
}catch(_){}
function renderDestinations(region='All'){
 const filtered=destinations.filter(d=>region==='All'||d.region===region||(region==='Visa-free'&&d.visa==='Visa-free'));
 grid.innerHTML=filtered.map(d=>`<article class="destination-card" role="link" tabindex="0" aria-label="Explore ${d.name}" data-destination="${encodeURIComponent(d.name)}"><img class="destination-photo" src="${photo(d.image_url||d.image)}" alt="${d.name}" loading="lazy"><span class="destination-arrow" aria-hidden="true">↗</span><div class="destination-meta"><span class="destination-region">${d.region}${(d.visa||d.visa_note)?` · ${d.visa||d.visa_note}`:''}</span><h3>${d.name}</h3><p>${d.tag||d.description||''}</p><span class="destination-explore-hint">Explore destination →</span></div></article>`).join('');
 document.querySelector('#destination-count').textContent=`Showing ${filtered.length} destination${filtered.length===1?'':'s'}`;
}
renderDestinations();
function openDestinationCard(card){
 if(!card)return;
 const name=card.dataset.destination;
 if(name)window.location.href='destination.html?destination='+name;
}
grid.addEventListener('click',e=>openDestinationCard(e.target.closest('.destination-card')));
grid.addEventListener('keydown',e=>{
 const card=e.target.closest('.destination-card');
 if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openDestinationCard(card);}
});
fetch('api/destinations.php',{headers:{Accept:'application/json'}}).then(r=>{if(!r.ok)throw Error('API unavailable');return r.json()}).then(data=>{if(!Array.isArray(data.destinations))return;destinations=data.destinations;['#search-destination','#enquiry-destination'].forEach(sel=>{const el=document.querySelector(sel);if(!el)return;const selected=el.value;el.innerHTML='<option value="">Choose a destination</option>'+destinations.map(d=>`<option value="${d.name.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}">${d.name}</option>`).join('');el.value=selected});renderDestinations(document.querySelector('.region-tab.active')?.dataset.region||'All')}).catch(err=>console.info('Using local destination fallback until database is configured.',err.message));
document.querySelectorAll('.region-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.region-tab.active')?.classList.remove('active');btn.classList.add('active');renderDestinations(btn.dataset.region)}));
const packages=[
 {name:'Maasai Mara Safari Escape',kind:'Safari',duration:'3 days / 2 nights',text:'Wildlife viewing across one of Africa’s most celebrated reserves.',image:'photo-1516426122078-c23e76319801'},
 {name:'Kenya Coast Retreat',kind:'Beach',duration:'5 days / 4 nights',text:'Rest, explore and enjoy the rhythm of the Indian Ocean.',image:'photo-1500375592092-40eb2168fd21'},
 {name:'Kenya Highlights',kind:'Tailor-made',duration:'7 days / 6 nights',text:'A considered introduction to Kenya’s wild places and welcoming coast.',image:'photo-1516026672322-bc52d61a55d5'}
];
document.querySelector('#package-grid').innerHTML=packages.map(p=>`<article class="package-card"><img class="package-image" src="${photo(p.image)}" alt="${p.name}" loading="lazy"><div class="package-body"><span class="package-type">${p.kind}</span><h3>${p.name}</h3><p>${p.text}</p><div class="package-bottom"><span>◷ ${p.duration}</span><a href="#contact" data-package="${p.name}">Request a quote ↗</a></div></div></article>`).join('');
document.querySelectorAll('[data-package]').forEach(a=>a.addEventListener('click',()=>{const message=document.querySelector('#enquiry-form [name="message"]');message.value=`I'm interested in the ${a.dataset.package} package. Please share details and a quote.`}));
document.querySelector('#trip-search').addEventListener('submit',e=>{e.preventDefault();const dest=document.querySelector('#search-destination').value;document.querySelector('#enquiry-destination').value=dest;document.querySelector('#enquiry-form').scrollIntoView({behavior:'smooth'});if(dest)document.querySelector('#enquiry-form [name="message"]').value=`I'd like help planning a trip to ${dest}. Please share suggestions and a quote.`});
const toggle=document.querySelector('.nav-toggle');toggle.addEventListener('click',()=>{const nav=document.querySelector('.main-nav');const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.main-nav').classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
document.querySelector('#enquiry-form').addEventListener('submit',async e=>{e.preventDefault();const status=document.querySelector('#form-status');status.textContent='Sending enquiry…';const payload=Object.fromEntries(new FormData(e.currentTarget).entries());try{const res=await fetch('api/enquiries.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await res.json();if(!res.ok)throw new Error(data.error||'The enquiry could not be sent.');status.textContent='Thank you — your enquiry has been received. We’ll be in touch.';e.currentTarget.reset()}catch(err){status.textContent='The form is ready, but the server endpoint needs MySQL configuration before submissions can be saved. Please contact us by email for now.';console.info('Enquiry endpoint response:',err.message)}});
document.querySelector('#newsletter-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,status=document.querySelector('#newsletter-status'),button=form.querySelector('button');status.textContent='Subscribing…';button.disabled=true;try{const email=form.querySelector('input[type="email"]').value;const res=await fetch('api/newsletter.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Subscription failed');status.textContent=data.message||'Thanks for subscribing!';form.reset()}catch(err){status.textContent='We could not complete your subscription. Please try again later.';console.error(err)}finally{button.disabled=false}});
