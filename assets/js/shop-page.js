(()=>{
  const main=document.querySelector('.all-sarees-content'),catalogues=globalThis.kiranlataProductCatalogues;
  if(!main||!catalogues)return;

  const categoryNames={dhaniakhali:'Dhaniakhali / Dhonekhali',gorod:'Gorod',phulia:'Phulia Tangail',baluchari:'Baluchari',narayanpet:'Narayanpet',dhalapathar:'Dhalapathar',banarasi:'Banarasi'};
  const routes={dhaniakhali:['/collections/bengal.html','dhaniakhali'],gorod:['/collections/bengal.html','gorod'],phulia:['/collections/bengal.html','phulia'],baluchari:['/collections/bengal.html','baluchari'],narayanpet:['/collections/south-india.html','narayanpet'],dhalapathar:['/collections/odisha.html','dhalapathar'],banarasi:['/collections/banarasi.html','banarasi']};
  const products=Object.entries(catalogues).flatMap(([collection,items])=>items.map((item,index)=>({...item,collection,category:categoryNames[collection]||collection,order:index})));
  main.innerHTML=`<section class="shop-catalogue-intro"><p class="eyebrow">The complete collection · ${products.length} sarees</p><h1>Find your <em>saree.</em></h1><p>Explore Kiranlata’s handloom sarees by weave, design, color, and price. Open any piece to see its details and ask us about it.</p></section>
    <section class="shop-search-band" aria-label="Search the saree collection"><label class="shop-search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" data-shop-search autocomplete="off" placeholder="Search by saree name, ID, weave, or color" aria-label="Search all sarees"><button type="button" data-shop-clear-search aria-label="Clear search" hidden>×</button></label></section>
    <div class="shop-results-toolbar"><p data-shop-count aria-live="polite"></p><button type="button" class="shop-filter-toggle" data-shop-filter-toggle aria-expanded="false">Filter sarees <span aria-hidden="true">＋</span></button><label class="shop-sort-label">Sort by<select data-shop-sort aria-label="Sort sarees"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></label></div>
    <div class="shop-workspace"><aside class="shop-filter-panel is-collapsed" data-shop-filter-panel aria-label="Filter sarees"><div class="shop-filter-heading"><h2>Refine your search</h2><button type="button" data-shop-clear-filters>Clear all</button></div><label>Weave<select data-shop-filter="weave"><option value="">All weaves</option></select></label><label>Design<select data-shop-filter="design"><option value="">All designs</option></select></label><label>Color<select data-shop-filter="color"><option value="">All colors</option></select></label><label>Price<select data-shop-filter="price"><option value="">All prices</option></select></label><label>Availability<select data-shop-filter="availability"><option value="">All availability</option></select></label></aside><section class="shop-results" aria-label="Saree results"><div class="shop-filter-summary" data-shop-active-filters></div><div class="shop-product-grid" data-shop-grid></div><p class="shop-no-results" data-shop-empty hidden>No sarees match these choices. Try clearing a filter or changing your search.</p></section></div>`;

  const search=main.querySelector('[data-shop-search]'),clearSearch=main.querySelector('[data-shop-clear-search]'),count=main.querySelector('[data-shop-count]'),sort=main.querySelector('[data-shop-sort]'),filterToggle=main.querySelector('[data-shop-filter-toggle]'),filterPanel=main.querySelector('[data-shop-filter-panel]'),filterControls=[...main.querySelectorAll('[data-shop-filter]')],clearFilters=main.querySelector('[data-shop-clear-filters]'),activeFilters=main.querySelector('[data-shop-active-filters]'),grid=main.querySelector('[data-shop-grid]'),empty=main.querySelector('[data-shop-empty]');
  const normalise=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const distinct=values=>[...new Set(values.filter(value=>value!==undefined&&value!==null&&value!==''))];
  const addOptions=(control,values,format=value=>value)=>values.forEach(value=>{const option=document.createElement('option');option.value=String(value);option.textContent=format(value);control.append(option)});
  const prices=distinct(products.map(product=>product.priceValue==null?'contact':Number(product.priceValue))).sort((a,b)=>a==='contact'?1:b==='contact'?-1:Number(a)-Number(b));
  filterControls.forEach(control=>{
    const key=control.dataset.shopFilter;
    if(key==='weave')addOptions(control,distinct(products.map(product=>product.category)).sort((a,b)=>a.localeCompare(b)));
    if(key==='design')addOptions(control,distinct(products.map(product=>product.design)).sort((a,b)=>a.localeCompare(b)));
    if(key==='color')addOptions(control,distinct(products.flatMap(product=>product.colors||[])).sort((a,b)=>a.localeCompare(b)));
    if(key==='price')addOptions(control,prices,value=>value==='contact'?'Contact us for price':`$${Number(value).toLocaleString('en-US')}`);
    if(key==='availability')addOptions(control,distinct(products.map(product=>product.availability||'Available')).sort((a,b)=>a.localeCompare(b)));
  });
  const filters=()=>Object.fromEntries(filterControls.map(control=>[control.dataset.shopFilter,control.value]));
  const selectedCount=()=>filterControls.filter(control=>control.value).length;
  const passesFilters=(product,selection)=>Object.entries(selection).every(([key,value])=>{
    if(!value)return true;
    if(key==='weave')return product.category===value;
    if(key==='design')return product.design===value;
    if(key==='color')return (product.colors||[]).includes(value);
    if(key==='price')return value==='contact'?product.priceValue==null:Number(product.priceValue)===Number(value);
    if(key==='availability')return (product.availability||'Available')===value;
    return true;
  });
  const productHref=product=>{const [page,anchor]=routes[product.collection]||['/collections/bengal.html','collection'];return `${page}?product=${encodeURIComponent(product.id)}#${anchor}`};
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
    const terms=normalise(search.value).split(' ').filter(Boolean),selection=filters();clearSearch.hidden=!search.value;
    const matches=products.filter(product=>{
      if(!passesFilters(product,selection))return false;
      const haystack=normalise([product.id,product.name,product.category,product.type,product.design,(product.colors||[]).join(' '),product.details,product.availability,product.priceValue].join(' '));
      return terms.every(term=>haystack.includes(term));
    });
    if(sort.value==='price-low')matches.sort((a,b)=>(a.priceValue??Infinity)-(b.priceValue??Infinity));
    if(sort.value==='price-high')matches.sort((a,b)=>(b.priceValue??-Infinity)-(a.priceValue??-Infinity));
    if(sort.value==='name')matches.sort((a,b)=>a.name.localeCompare(b.name));
    count.textContent=`${matches.length} ${matches.length===1?'saree':'sarees'}`;
    grid.replaceChildren(...matches.map(makeCard));empty.hidden=matches.length>0;
    const selected=selectedCount();filterToggle.innerHTML=`${selected?'Filters ('+selected+')':'Filter sarees'} <span aria-hidden="true">${filterPanel.classList.contains('is-collapsed')?'＋':'−'}</span>`;
    filterToggle.setAttribute('aria-expanded',String(!filterPanel.classList.contains('is-collapsed')));
    activeFilters.replaceChildren();
    if(selected){const label=document.createElement('span');label.textContent=`${selected} ${selected===1?'filter':'filters'} applied`;const reset=document.createElement('button');reset.type='button';reset.textContent='Clear all';reset.addEventListener('click',resetFilters);activeFilters.append(label,reset)}
  };
  function resetFilters(){filterControls.forEach(control=>control.value='');render()}
  filterToggle.addEventListener('click',()=>{filterPanel.classList.toggle('is-collapsed');render()});
  filterControls.forEach(control=>control.addEventListener('change',render));
  clearFilters.addEventListener('click',resetFilters);
  search.addEventListener('input',render);
  clearSearch.addEventListener('click',()=>{search.value='';render();search.focus()});
  sort.addEventListener('change',render);
  render();
})();
