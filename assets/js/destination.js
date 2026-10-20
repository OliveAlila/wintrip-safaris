(() => {
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(window.location.search);
  const requestedName = (params.get('destination') || '').trim();
  const fallback = [
    {name:'Lamu',region:'Kenya',description:'Explore a historic Swahili island shaped by dhow sailing, narrow lanes, carved doors and a relaxed coastal rhythm.',image_url:'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1800&q=85',tag:'Swahili culture & island life'},
    {name:'Nairobi',region:'Kenya',description:'Kenya’s lively capital brings together restaurants, art, history, shopping and easy access to Nairobi National Park and wider safari routes.',image_url:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=85',tag:'Culture, dining & city energy'},
    {name:'Maasai Mara',region:'Kenya',description:'A celebrated wildlife landscape known for big cats, wide-open savannah and seasonal wildebeest migration. Safari sightings and migration timing depend on natural conditions.',image_url:'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85',tag:'Big cats & the Great Migration'},
    {name:'Diani & the South Coast',region:'Kenya',description:'A relaxed Indian Ocean escape with sandy beaches, warm water, coastal restaurants and opportunities for marine activities.',image_url:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=85',tag:'White sands & turquoise water'},
    {name:'Mombasa',region:'Kenya',description:'Discover a coastal city with Swahili heritage, historic Old Town streets, Fort Jesus, local food and nearby beaches.',image_url:'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1800&q=85',tag:'Old Town, culture & beaches'},
    {name:'Zanzibar',region:'Africa',description:'A Tanzanian archipelago known for Stone Town, spice heritage, dhow trips and Indian Ocean beaches.',image_url:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85',tag:'Spice islands & Indian Ocean shores'},
    {name:'Dubai',region:'Middle East',description:'A dynamic city combining a striking skyline, desert excursions, shopping, dining and cultural neighbourhoods.',image_url:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85',tag:'Desert adventures & iconic skyline'},
    {name:'Cape Town',region:'Africa',description:'A scenic city between mountain and ocean, with Table Mountain, coastal drives, museums, markets and nearby winelands.',image_url:'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1800&q=85',tag:'Mountain, city & coast'},
    {name:'Rwanda',region:'Africa',description:'Explore Kigali’s creative and culinary scene, learn about Rwanda’s history, and plan nature experiences such as guided gorilla trekking in Volcanoes National Park. Permits and conservation rules apply.',image_url:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=85',tag:'Gorilla trekking & Kigali'},
    {name:'Mauritius',region:'Africa',description:'An Indian Ocean island destination with lagoons, mountain scenery, botanical gardens, local markets and a blend of cultural influences.',image_url:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1800&q=85',tag:'Turquoise lagoons & island stays'},
    {name:'Seychelles',region:'Africa',description:'Explore granite-framed beaches, marine parks, forest trails and island communities across this Indian Ocean archipelago.',image_url:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1800&q=85',tag:'Granite beaches & island escapes'},
    {name:'Amboseli',region:'Kenya',description:'A wildlife destination known for elephant herds, open plains and views toward Mount Kilimanjaro when weather allows.',image_url:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=85',tag:'Elephants & Kilimanjaro views'},
    {name:'Tsavo',region:'Kenya',description:'A vast wilderness area with varied landscapes, red-earth scenery, wildlife and a sense of space across eastern and western parks.',image_url:'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85',tag:'Vast wilderness & red-dusted elephants'}
  ];
  const detailedDescriptions = {
    'Maasai Mara':'The Maasai Mara is one of Kenya’s best-known safari landscapes, with rolling grasslands, acacia-dotted plains and an extraordinary variety of wildlife. Guided drives offer opportunities to look for elephants, giraffes, buffalo, lions and other species, while the seasonal wildebeest migration can bring dramatic movement through the wider Mara ecosystem. The experience changes with the season, location and conditions, so a good itinerary balances wildlife viewing with time to enjoy the landscape and learn from local guides and communities. Migration sightings are never guaranteed.',
    'Lamu':'Lamu is a historic island destination where Swahili architecture, carved wooden doors, dhow sailing and a relaxed coastal rhythm shape the visit. Explore the old town with a knowledgeable guide, discover local crafts and food, and make time for the beaches and neighbouring islands. The island is best enjoyed at a slower pace, with respect for local customs and community life.',
    'Nairobi':'Nairobi combines a lively urban scene with unusual access to nature. Visitors can explore museums, galleries, restaurants and markets, learn about Kenya’s history, and arrange wildlife or conservation experiences around the city. It is also a practical starting point for many journeys into Kenya, making it easy to pair a city stay with a safari or coastal extension.',
    'Diani & the South Coast':'Diani and Kenya’s South Coast are known for long stretches of pale sand, warm Indian Ocean waters and a mix of relaxed beach stays and active days outdoors. Depending on the season and sea conditions, visitors can arrange snorkelling, diving, boat excursions, cultural visits and coastal nature experiences. A flexible itinerary leaves space for both exploring and unwinding.',
    'Mombasa':'Mombasa brings together centuries of coastal history, Swahili culture, busy markets and easy access to the Indian Ocean. Explore the Old Town and Fort Jesus with a guide, sample coastal cuisine, and add a beach stay or marine excursion. It works well as a short city break or as part of a longer coastal itinerary.',
    'Zanzibar':'Zanzibar offers a distinctive blend of Swahili heritage, spice traditions and Indian Ocean scenery. Stone Town’s historic streets, local food, spice farms, dhow trips and beach stays each provide a different way to experience the islands. Boat and marine activities should be chosen with reputable local operators and suitable sea conditions.',
    'Amboseli':'Amboseli is known for open landscapes, large elephant herds and views towards Mount Kilimanjaro when the weather is clear. Game drives, birdwatching and stays in nearby lodges or conservancies can be combined into a relaxed safari. Wildlife sightings and mountain views depend on natural conditions, so allow time and keep expectations flexible.',
    'Cape Town':'Cape Town sits between mountain and ocean, with scenic drives, beaches, neighbourhood food, museums and access to the Cape Winelands. Visitors can combine Table Mountain and the city’s cultural sites with coastal walks, markets and day trips. Weather can affect mountain access and outdoor activities, so a flexible plan helps.'
  };
  const extraDescriptions = {
    'Naivasha & the Rift':'Enjoy lakeside stays, boat outings, birdlife, cycling and dramatic Rift Valley scenery.',
    'Abu Dhabi':'Explore major cultural landmarks, grand architecture, waterfront promenades and Yas Island attractions.',
    'Doha, Qatar':'Discover a modern waterfront skyline, museums, markets and Qatari heritage.',
    'Bali, Indonesia':'A varied island of temple traditions, rice terraces, surf beaches, food and forest landscapes.',
    'Singapore':'A compact city destination known for gardens, architecture, neighbourhood food and museums.',
    'Malaysia / Kuala Lumpur':'Experience Kuala Lumpur’s skyline, food markets and cultural districts, with island extensions possible.',
    'Europe':'A broad region rather than one destination; the best itinerary depends on which countries and cities you want to visit.',
    'Malindi & Watamu':'Coastal towns offering marine parks, beaches, Swahili culture and ocean activities.',
    'Samburu':'Explore northern Kenya’s arid landscapes and distinctive wildlife with local guides.',
    'Lake Nakuru':'A Rift Valley lake and surrounding park known for birdlife, rhinos and scenic viewpoints.',
    'Lake Elementaita':'A quieter Rift Valley lake setting suited to birdwatching, scenery and relaxed lodge stays.',
    'Mount Kenya':'Highland scenery, hiking options and forested slopes; route choice should match fitness, season and guide advice.',
    'Uganda':'A diverse destination with forest primates, the Nile, lakes and wildlife parks.',
    'Johannesburg':'Explore South African history, galleries, restaurants, markets and day trips in Gauteng.',
    'Thailand':'A mix of temples, food culture, beaches and city life; experiences vary by region and season.',
    'Indonesia':'An extensive archipelago with volcanoes, cultural sites, rainforests and beaches beyond Bali.',
    'China':'A large and varied destination with historic landmarks, modern cities and regional cuisines.',
    'Japan':'Explore historic temples, contemporary cities, food culture and seasonal landscapes.',
    'India':'A diverse destination with regional cuisines, historic sites, pilgrimage routes and varied landscapes.',
    'Barbados':'A Caribbean island known for beaches, music, food, heritage and coastal experiences.'
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function discoveryLink(name) {
    return 'https://www.google.com/search?q=' + encodeURIComponent('official upcoming concerts festivals sporting events ' + name);
  }
  function eventsFor(destination) {
    const name = destination.name;
    const events = [{
      label:'Concerts, festivals & live events',
      type:'Live event finder',
      timing:'Listings change throughout the year',
      text:'Search current listings for concerts, cultural festivals, exhibitions and other public events in and around ' + name + '. Confirm the venue and ticket seller before making plans.',
      url:discoveryLink(name),
      action:'Explore current listings'
    }];
    if (/rwanda/i.test(name)) {
      events.unshift({
        label:'Formula 1 African Grand Prix',
        type:'International motorsport · Announced',
        timing:'Expected in the early 2030s — inaugural race date not yet announced',
        text:'Formula 1 and the FIA announced a 10-year agreement for an African Grand Prix in Rwanda. The first race is planned after a purpose-built circuit in Bugesera is completed. This is a future event, not a race with tickets or confirmed dates available yet.',
        url:'https://www.formula1.com/en/latest/article/formula-1-returns-to-africa-with-10-year-agreement-to-race-in-rwanda.13xs9VMK7cGFiBd2IplyES',
        action:'Read the official F1 announcement'
      });
      events.push({
        label:'Kigali’s cultural calendar',
        type:'Culture & city experiences',
        timing:'Dates vary',
        text:'Check official city, venue and tourism listings for exhibitions, cultural events, conferences and live performances announced for your travel dates.',
        url:discoveryLink('Kigali Rwanda'),
        action:'Find Kigali events'
      });
    }
    return events;
  }
  function renderEvents(destination) {
    $('#destination-events').innerHTML = eventsFor(destination).map(event => `<article class="event-card"><span class="event-type">${escapeHtml(event.type)}</span><h3>${escapeHtml(event.label)}</h3><p class="event-timing">◷ ${escapeHtml(event.timing)}</p><p>${escapeHtml(event.text)}</p><a class="text-link" href="${escapeHtml(event.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(event.action)} ↗</a></article>`).join('');
  }
  function renderActivities(destination) {
    const mara = /maasai mara/i.test(destination.name);
    const coast = /diani|mombasa|lamu|zanzibar|mauritius|seychelles|malindi|watamu/i.test(destination.name);
    const activities = mara ? [
      ['Big Five game drives','Explore the savannah with a guide and look for iconic wildlife.'],
      ['Great Migration viewing','Plan around seasonal wildebeest movement; timing varies each year.'],
      ['Hot-air balloon safari','See the plains at sunrise with a specialist operator.'],
      ['Maasai-led cultural visit','Learn about local traditions through a respectful community-led experience.'],
      ['Wildlife photography','Enjoy sunrise and sunset light from safe viewing areas.']
    ] : coast ? [
      ['Explore the coastline','Discover beaches, coves and coastal viewpoints.'],
      ['Boat or dhow excursion','See the coast from the water with a local operator.'],
      ['Taste local cuisine','Sample regional dishes and fresh local ingredients.'],
      ['Discover local heritage','Explore historic sites and cultural traditions with a guide.'],
      ['Water or nature activity','Choose snorkelling, diving or a nature walk where available.']
    ] : [
      ['Explore the main landmarks','Visit well-known sights and learn about local history.'],
      ['Discover local food','Try regional dishes and visit local markets.'],
      ['Enjoy a scenic excursion','Explore landscapes or nature areas suited to the season.'],
      ['Meet local culture and crafts','Discover local art, heritage and traditions respectfully.'],
      ['Take a guided day trip','Add a nearby attraction based on your interests.']
    ];
    $('#destination-activities').innerHTML = activities.map((item,i)=>'<article class="destination-activity-card"><span class="activity-number">0'+(i+1)+'</span><h3>'+escapeHtml(item[0])+'</h3><p>'+escapeHtml(item[1])+'</p><a class="text-link" href="index.html#contact">Add to my trip ↗</a></article>').join('');
  }
  function renderPricing(destination) {
    const mara = /maasai mara/i.test(destination.name);
    const coast = /diani|mombasa|lamu|zanzibar|mauritius|seychelles|malindi|watamu/i.test(destination.name);
    const hotels = mara ? [['Comfort camp','Simple camp or budget lodge','KES 8,000–18,000','per person / night'],['Classic safari lodge','Comfortable lodge or tented camp','KES 18,000–40,000','per person / night'],['Premium safari camp','Higher-end camp and enhanced service','KES 40,000–100,000+','per person / night']] : coast ? [['Comfort stay','Guesthouse or simple hotel','KES 5,000–12,000','per room / night'],['Boutique escape','Mid-range hotel or boutique stay','KES 12,000–30,000','per room / night'],['Premium resort','Upscale resort or private villa','KES 30,000–90,000+','per room / night']] : [['Comfort stay','Guesthouse or simple hotel','KES 5,000–12,000','per room / night'],['Boutique stay','Mid-range hotel or boutique property','KES 12,000–28,000','per room / night'],['Premium stay','Upscale hotel or luxury property','KES 28,000–80,000+','per room / night']];
    const tours = mara ? [['Half-day game drive','Guided wildlife drive; fees may be extra','KES 8,000–18,000','per person'],['Full-day safari','Guided day drive; inclusions vary','KES 15,000–35,000','per person'],['Hot-air balloon safari','Sunrise flight experience','KES 45,000–65,000','per person']] : [['Guided highlights tour','A guided introduction to key sights','KES 3,000–8,000','per person'],['Full-day excursion','Transport and guide; entry fees may be extra','KES 8,000–20,000','per person'],['Specialist experience','Boat trip, food tour or nature excursion','KES 5,000–18,000','per person']];
    const card = x=>'<article class="destination-price-card"><span class="price-demo-label">SAMPLE ESTIMATE</span><h4>'+escapeHtml(x[0])+'</h4><p>'+escapeHtml(x[1])+'</p><strong>'+escapeHtml(x[2])+'</strong><small>'+escapeHtml(x[3])+'</small><a class="button button-brown" href="index.html#contact">Request a quote →</a></article>';
    $('#destination-hotels').innerHTML=hotels.map(card).join('');
    $('#destination-tours').innerHTML=tours.map(card).join('');
  }
  function showDestination(destination, fromApi = false) {
    const description = detailedDescriptions[destination.name] || destination.description || extraDescriptions[destination.name] || destination.tag || 'Explore local highlights, landscapes, culture and experiences with a tailor-made itinerary.';
    const image = destination.image_url || destination.image || fallback.find(item => slug(item.name) === slug(destination.name))?.image_url || fallback[0].image_url;
    $('#destination-title').textContent = destination.name;
    document.title = destination.name + ' Travel Guide | Wintrip Safaris';
    $('#destination-region').textContent = destination.region || 'Destination guide';
    $('#destination-tagline').textContent = destination.tag || description;
    $('#about-heading').textContent = 'Discover ' + destination.name;
    $('#destination-description').textContent = description;
    $('#destination-hero').style.backgroundImage = 'url("' + image.replace(/["\\]/g,'') + '")';
    $('#destination-facts').innerHTML = [
      ['Destination', destination.name],
      ['Region', destination.region || 'Explore with us'],
      ['Travel style', 'Tailor-made experiences']
    ].map(([label,value]) => `<div class="destination-fact"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
    ['#plan-destination','#enquire-destination','#bottom-enquire'].forEach(selector => {
      const link = $(selector);
      link.href = 'index.html#contact';
      link.addEventListener('click', () => {
        try { sessionStorage.setItem('wintripSelectedDestination', destination.name); } catch (_) {}
      });
    });
    renderEvents(destination);
    renderActivities(destination);
    renderPricing(destination);
    $('#destination-loading').hidden = true;
    $('#destination-content').hidden = false;
  }
  if (!requestedName) {
    $('#destination-loading').hidden = true;
    $('#destination-not-found').hidden = false;
    return;
  }
  const knownPlaces = [
    ['Diani & the South Coast','Kenya'],['Naivasha & the Rift','Kenya'],['Abu Dhabi','Middle East'],['Doha, Qatar','Middle East'],
    ['Bali, Indonesia','Asia'],['Singapore','Asia'],['Malaysia / Kuala Lumpur','Asia'],['Europe','Europe'],['Malindi & Watamu','Kenya'],
    ['Samburu','Kenya'],['Lake Nakuru','Kenya'],['Lake Elementaita','Kenya'],['Mount Kenya','Kenya'],['Uganda','Africa'],
    ['Johannesburg','Africa'],['Thailand','Asia'],['Indonesia','Asia'],['China','Asia'],['Japan','Asia'],['India','Asia'],['Barbados','Caribbean']
  ];
  const local = fallback.find(item => slug(item.name) === slug(requestedName))
    || (() => { const known = knownPlaces.find(item => slug(item[0]) === slug(requestedName)); return known ? {name:known[0],region:known[1],description:extraDescriptions[known[0]] || 'Discover local highlights, culture, landscapes and experiences with a tailor-made itinerary.'} : {name:requestedName,region:'Destination'}; })();
  showDestination(local);
  fetch('api/destinations.php', {headers:{Accept:'application/json'}})
    .then(response => { if (!response.ok) throw new Error('Destination API unavailable'); return response.json(); })
    .then(data => {
      if (!Array.isArray(data.destinations)) return;
      const match = data.destinations.find(item => slug(item.name) === slug(requestedName));
      if (match) showDestination(match, true);
    })
    .catch(() => {});
  const toggle = $('.nav-toggle');
  const nav = $('.main-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });
})();