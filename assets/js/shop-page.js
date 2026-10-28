(()=>{
  const main=document.querySelector('.all-sarees-content'),catalogues=globalThis.kiranlataProductCatalogues;
  if(!main||!catalogues)return;

  const categoryNames={dhaniakhali:'Dhaniakhali',gorod:'Gorod',phulia:'Phulia Tangail',baluchari:'Baluchari',ilkal:'Ilkal','patteda-anchu':'Patteda Anchu',narayanpet:'Narayanpet',dhalapathar:'Dhalapathar',banarasi:'Banarasi',maheshwari:'Maheshwari'};
  const categoryLabel=key=>categoryNames[key]||String(key).replace(/[-_]+/g,' ').replace(/\b\w/g,letter=>letter.toUpperCase());
  const routes=globalThis.kiranlataProductRoutes||{};
  const products=Object.entries(catalogues).flatMap(([collection,items])=>items.map((item,index)=>({...item,collection,category:categoryLabel(collection),order:index})));
  main.innerHTML=`<section class="shop-catalogue-intro"><p class="eyebrow">The complete collection · ${products.length} sarees</p><h1>Find your <em>saree.</em></h1><p>Explore Kiranlata’s handloom sarees by weave, design, color, and price. Open any piece to see its details and ask us about it.</p></section>
    <section class="shop-search-band" aria-label="Search the saree collection"><label class="shop-search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" data-shop-search autocomplete="off" placeholder="Search by name, ID, weave, main or border color" aria-label="Search all sarees by name, ID, weave, main or border color"><button type="button" data-shop-clear-search aria-label="Clear search" hidden>×</button></label></section>
    <div class="shop-results-toolbar"><p data-shop-count aria-live="polite"></p><button type="button" class="shop-filter-toggle" data-shop-filter-toggle aria-expanded="false">Filters <span data-shop-filter-count></span></button><label class="shop-sort-label">Sort by<select data-shop-sort aria-label="Sort sarees"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option><option value="id">Product ID: low to high</option></select></label></div>
    <div class="shop-workspace"><button class="shop-filter-backdrop" type="button" data-shop-filter-backdrop aria-label="Close filters" hidden></button><aside class="shop-filter-panel is-collapsed" data-shop-filter-panel aria-label="Filter sarees"><div class="shop-filter-heading"><h2>Refine your search</h2><button type="button" data-shop-clear-filters>Clear all</button><button type="button" class="shop-filter-close" data-shop-filter-close aria-label="Close filters">×</button></div><div class="shop-filter-groups" data-shop-filter-groups></div><div class="shop-filter-footer"><span data-shop-filter-result-count></span><button type="button" data-shop-filter-apply>Show sarees</button></div></aside><section class="shop-results" aria-label="Saree results"><div class="shop-filter-summary" data-shop-active-filters></div><div class="shop-product-grid" data-shop-grid></div><p class="shop-no-results" data-shop-empty hidden>No sarees match these choices. Try clearing a filter or changing your search.</p></section></div>`;

  const search=main.querySelector('[data-shop-search]'),clearSearch=main.querySelector('[data-shop-clear-search]'),count=main.querySelector('[data-shop-count]'),sort=main.querySelector('[data-shop-sort]'),filterToggle=main.querySelector('[data-shop-filter-toggle]'),filterPanel=main.querySelector('[data-shop-filter-panel]'),filterGroups=main.querySelector('[data-shop-filter-groups]'),clearFilters=main.querySelector('[data-shop-clear-filters]'),activeFilters=main.querySelector('[data-shop-active-filters]'),grid=main.querySelector('[data-shop-grid]'),empty=main.querySelector('[data-shop-empty]'),filterBackdrop=main.querySelector('[data-shop-filter-backdrop]'),filterClose=main.querySelector('[data-shop-filter-close]'),filterApply=main.querySelector('[data-shop-filter-apply]'),filterBadge=main.querySelector('[data-shop-filter-count]'),filterResultCount=main.querySelector('[data-shop-filter-result-count]');
  const normalise=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const distinct=values=>[...new Set(values.filter(value=>value!==undefined&&value!==null&&value!==''))];
  const facetKeys=['weave','design','color','accentColor','price','availability'],facetLabels={weave:'Weave',design:'Design',color:'Main color',accentColor:'Border / accent color',price:'Price',availability:'Availability'};
  // Legacy records list the main shade first; use it until explicit role metadata is present.
  const mainColors=product=>Array.isArray(product.primaryColors)&&product.primaryColors.length?product.primaryColors:(product.colors||[]).slice(0,1);
  const filters=()=>Object.fromEntries(facetKeys.map(key=>[key,[...filterGroups.querySelectorAll(`[data-shop-filter="${key}"]:checked`)].map(control=>control.value)]));
  const facetValue=(product,key)=>{
    if(key==='weave')return product.category;
    if(key==='design')return product.design;
    if(key==='color')return mainColors(product);
    if(key==='accentColor')return product.accentColors||[];
    if(key==='price')return product.priceValue==null?'contact':String(Number(product.priceValue));
    if(key==='availability')return product.availability||'Available';
    return [];
  };
  const matchesOtherFilters=(product,selection,excludedKey)=>Object.entries(selection).every(([key,values])=>!values.length||key===excludedKey||values.some(value=>passesOneFilter(product,key,value)));
  const passesOneFilter=(product,key,value)=>{
    if(key==='weave')return product.category===value;
    if(key==='design')return product.design===value;
    if(key==='color')return mainColors(product).includes(value);
    if(key==='accentColor')return (product.accentColors||[]).includes(value);
    if(key==='price')return value==='contact'?product.priceValue==null:Number(product.priceValue)===Number(value);
    if(key==='availability')return (product.availability||'Available')===value;
    return true;
  };
  const facetValues=(key,selection)=>{
    const values=distinct(products.filter(product=>matchesOtherFilters(product,selection,key)).flatMap(product=>facetValue(product,key)));
    return values.sort((a,b)=>key==='price'?(a==='contact'?1:b==='contact'?-1:Number(a)-Number(b)):String(a).localeCompare(String(b)));
  };
  const formatFacetValue=(key,value)=>key==='price'?value==='contact'?'Contact us for price':`$${Number(value).toLocaleString('en-US')}`:String(value);
  const productFacetValues=(product,key)=>[].concat(facetValue(product,key)).map(String);
  const selectedCount=selection=>Object.values(selection).reduce((total,values)=>total+values.length,0);
  const passesFilters=(product,selection)=>Object.entries(selection).every(([key,values])=>!values.length||values.some(value=>passesOneFilter(product,key,value)));
  const searchableProductText=product=>{
    let details=product.details||'';
    (product.colors||[]).slice().sort((a,b)=>String(b).length-String(a).length).forEach(color=>{
      const escaped=String(color).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      details=details.replace(new RegExp(escaped,'ig'),' ');
    });
    return [product.id,product.name,product.category,product.type,product.design,mainColors(product).join(' '),(product.accentColors||[]).join(' '),details,product.availability,product.priceValue].join(' ');
  };
  const facetMatches=product=>{
    const terms=normalise(search.value).split(' ').filter(Boolean);
    const haystack=normalise(searchableProductText(product));
    return terms.every(term=>haystack.includes(term));
  };
  const colorSwatch=value=>{
    const name=normalise(value);
    if(name.includes('multi'))return 'conic-gradient(#9a2b32 0 25%, #d7ad46 0 50%, #28583b 0 75%, #456b99 0)';
    if(name.includes('black'))return '#292827';
    if(name.includes('navy'))return '#202b50';
    if(name.includes('blue'))return name.includes('muted')?'#71859b':'#416e9c';
    if(name.includes('violet')||name.includes('plum')||name.includes('mauve')||name.includes('lavender'))return '#82718b';
    if(name.includes('green')||name.includes('teal'))return name.includes('dark')||name.includes('forest')?'#234c36':'#438348';
    if(name.includes('red')||name.includes('maroon')||name.includes('burgundy')||name.includes('wine'))return name.includes('deep')||name.includes('dark')?'#511d32':'#a42b3a';
    if(name.includes('pink')||name.includes('rose')||name.includes('peach'))return '#ce8294';
    if(name.includes('orange')||name.includes('copper')||name.includes('rust'))return '#b96732';
    if(name.includes('gold')||name.includes('mustard')||name.includes('yellow')||name.includes('basanti'))return '#c49a3a';
    if(name.includes('grey')||name.includes('gray')||name.includes('charcoal'))return '#85837d';
    if(name.includes('white')||name.includes('ivory')||name.includes('beige')||name.includes('cream'))return '#eee3c8';
    return '#b9aa90';
  };
  const currentProducts=(selection,except='')=>products.filter(product=>matchesOtherFilters(product,selection,except));
  const renderFacetOptions=()=>{
    const openGroups=new Map([...filterGroups.querySelectorAll('.shop-filter-group')].map(group=>[group.className.replace('shop-filter-group shop-filter-group-',''),group.open]));
    const focused=filterGroups.contains(document.activeElement)?{key:document.activeElement.dataset.shopFilter,value:document.activeElement.value}:null;
    let selection=filters(),changed=true;
    while(changed){changed=false;for(const key of facetKeys){const valid=new Set(facetValues(key,selection).map(String)),next=selection[key].filter(value=>valid.has(value));if(next.length!==selection[key].length){selection[key]=next;changed=true}}}
    filterGroups.replaceChildren();
    facetKeys.forEach(key=>{
      const values=facetValues(key,selection),base=currentProducts(selection,key),group=document.createElement('details');group.className=`shop-filter-group shop-filter-group-${key}`;group.open=openGroups.has(key)?openGroups.get(key):key==='weave'||key==='design';
      const summary=document.createElement('summary');summary.textContent=facetLabels[key];if(selection[key].length){const badge=document.createElement('span');badge.className='shop-filter-group-count';badge.textContent=String(selection[key].length);summary.append(badge)}
      const isColorFacet=key==='color'||key==='accentColor';
      const options=document.createElement('div');options.className=isColorFacet?'shop-filter-options shop-color-options':'shop-filter-options';
      values.forEach(value=>{
        const stringValue=String(value),label=document.createElement('label');label.className=`shop-filter-option${isColorFacet?' is-color-option':''}`;
        const input=document.createElement('input');input.type='checkbox';input.dataset.shopFilter=key;input.value=stringValue;input.checked=selection[key].includes(stringValue);
        const name=document.createElement('span');name.className='shop-filter-option-name';name.textContent=formatFacetValue(key,stringValue);
        const total=base.filter(product=>productFacetValues(product,key).includes(stringValue)).length;
        const quantity=document.createElement('small');quantity.textContent=String(total);quantity.setAttribute('aria-label',`${total} ${total===1?'saree':'sarees'}`);
        if(isColorFacet){const swatch=document.createElement('span');swatch.className='shop-color-swatch';swatch.style.setProperty('--swatch-color',colorSwatch(stringValue));swatch.setAttribute('aria-hidden','true');label.append(input,swatch,name,quantity)}else label.append(input,name,quantity);
        options.append(label);
      });
      group.append(summary,options);filterGroups.append(group);
    });
    if(focused){const input=[...filterGroups.querySelectorAll(`[data-shop-filter="${focused.key}"]`)].find(option=>option.value===focused.value);if(input)input.focus();else filterGroups.querySelector(`.shop-filter-group-${focused.key} summary`)?.focus()}
    const total=selectedCount(selection);filterBadge.textContent=total?String(total):'';filterToggle.setAttribute('aria-label',total?`Filters, ${total} selected`:'Filters');
  };
  const productHref=product=>{const route=routes[product.collection];const page=route?.page||'/shop.html',anchor=route?.anchor||'';return `${page}?product=${encodeURIComponent(product.id)}${anchor?`#${encodeURIComponent(anchor)}`:''}`};
  const priceLabel=product=>product.priceValue==null?'Contact us for price':`$${Number(product.priceValue).toLocaleString('en-US')}`;
  const makeCard=product=>{
    const card=document.createElement('a');card.className=`shop-product-card${product.availability==='Sold Out'?' is-sold-out':''}`;card.href=productHref(product);card.setAttribute('aria-label',`${product.name}, ${product.id}, ${priceLabel(product)}, ${product.availability||'Available'}`);
    const media=document.createElement('span');media.className='shop-product-media';
    const image=document.createElement('img');image.src=product.images?.[0]?.card||'';image.alt=`${product.name} · ${product.id}`;image.loading='lazy';media.append(image);
    const id=document.createElement('span');id.className='shop-product-id';id.textContent=product.id;media.append(id);
    if(product.availability==='Sold Out'){const sold=document.createElement('span');sold.className='shop-product-status is-sold-out';sold.textContent='Sold out';media.append(sold)}
    const copy=document.createElement('span');copy.className='shop-product-copy';
    const category=document.createElement('small');category.className='shop-product-category';category.textContent=product.category;
    const name=document.createElement('strong');name.className='shop-product-name';name.textContent=product.name;
    const details=document.createElement('span');details.className='shop-product-details';details.textContent=product.details||[product.design,(product.colors||[]).join(', ')].filter(Boolean).join(' · ');
    const meta=document.createElement('span');meta.className='shop-product-meta';
    const price=document.createElement('strong');price.className='shop-product-price';price.textContent=priceLabel(product);
    const status=document.createElement('small');status.className=product.availability==='Sold Out'?'is-sold-out':'';status.textContent=product.availability||'Available';
    const action=document.createElement('span');action.className='shop-product-action';action.textContent='View saree details ↗';
    copy.append(category,name,details,meta);meta.append(price,status);card.append(media,copy,action);return card;
  };
  const render=()=>{
    const selection=filters();clearSearch.hidden=!search.value;
    const matches=products.filter(product=>passesFilters(product,selection)&&facetMatches(product));
    if(sort.value==='price-low')matches.sort((a,b)=>(a.priceValue??Infinity)-(b.priceValue??Infinity));
    if(sort.value==='price-high')matches.sort((a,b)=>(b.priceValue??-Infinity)-(a.priceValue??-Infinity));
    if(sort.value==='id')matches.sort((a,b)=>String(a.id||'').localeCompare(String(b.id||''),undefined,{numeric:true,sensitivity:'base'}));
    if(sort.value==='name')matches.sort((a,b)=>a.name.localeCompare(b.name));
    count.textContent=`${matches.length} ${matches.length===1?'saree':'sarees'}`;
    grid.replaceChildren(...matches.map(makeCard));empty.hidden=matches.length>0;
    const selected=selectedCount(selection);filterResultCount.textContent=`${matches.length} ${matches.length===1?'saree':'sarees'}`;
    filterToggle.setAttribute('aria-expanded',String(!filterPanel.classList.contains('is-collapsed')));
    activeFilters.replaceChildren();
    if(selected){
      const chips=document.createElement('div');chips.className='shop-filter-chips';
      Object.entries(selection).forEach(([key,values])=>values.forEach(value=>{
        const chip=document.createElement('button');chip.type='button';chip.className='shop-filter-chip';chip.textContent=`${facetLabels[key]}: ${formatFacetValue(key,value)} ×`;chip.setAttribute('aria-label',`Remove ${facetLabels[key]} filter ${formatFacetValue(key,value)}`);
        chip.addEventListener('click',()=>{const input=[...filterGroups.querySelectorAll(`[data-shop-filter="${key}"]`)].find(option=>option.value===value);if(input)input.checked=false;updateFilters()});chips.append(chip);
      }));
      const reset=document.createElement('button');reset.type='button';reset.className='shop-filter-clear-link';reset.textContent='Clear all';reset.addEventListener('click',resetFilters);activeFilters.append(chips,reset);
    }
  };
  function updateFilters(){renderFacetOptions();render()}
  function resetFilters(){filterGroups.querySelectorAll('[data-shop-filter]:checked').forEach(input=>input.checked=false);updateFilters()}
  const setPanelOpen=open=>{
    filterPanel.classList.toggle('is-collapsed',!open);filterPanel.classList.toggle('is-open',open);filterBackdrop.hidden=!open;
    filterToggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('shop-filter-open',open&&matchMedia('(max-width: 900px)').matches);
    if(matchMedia('(max-width: 900px)').matches){
      if(open){filterPanel.setAttribute('role','dialog');filterPanel.setAttribute('aria-modal','true');requestAnimationFrame(()=>filterPanel.querySelector('.shop-filter-group summary')?.focus())}
      else{filterPanel.removeAttribute('role');filterPanel.removeAttribute('aria-modal');filterToggle.focus()}
    }
  };
  filterToggle.addEventListener('click',()=>setPanelOpen(filterPanel.classList.contains('is-collapsed')));
  filterClose.addEventListener('click',()=>setPanelOpen(false));filterBackdrop.addEventListener('click',()=>setPanelOpen(false));filterApply.addEventListener('click',()=>setPanelOpen(false));
  document.addEventListener('keydown',event=>{
    if(!filterPanel.classList.contains('is-open'))return;
    if(event.key==='Escape'){setPanelOpen(false);return}
    if(event.key!=='Tab')return;
    const focusable=[...filterPanel.querySelectorAll('button:not([disabled]),input:not([disabled]),summary')].filter(element=>element.getClientRects().length);
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
  });
  filterGroups.addEventListener('change',event=>{if(event.target.matches('[data-shop-filter]'))updateFilters()});
  clearFilters.addEventListener('click',resetFilters);
  search.addEventListener('input',render);
  clearSearch.addEventListener('click',()=>{search.value='';render();search.focus()});
  sort.addEventListener('change',render);
  renderFacetOptions();render();
})();
