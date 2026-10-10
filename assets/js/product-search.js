(()=>{
  const header=document.querySelector('.regional-header .header-actions');
  if(!header||document.querySelector('.product-search-dialog'))return;

  const searchButton=document.createElement('button');
  searchButton.type='button';
  searchButton.className='search-trigger';
  searchButton.setAttribute('aria-label','Search sarees');
  searchButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>';
  header.prepend(searchButton);

  const dialog=document.createElement('dialog');
  dialog.className='product-search-dialog';
  dialog.setAttribute('aria-labelledby','product-search-title');
  dialog.innerHTML='<div class="product-search-shell"><header class="product-search-heading"><div><p class="eyebrow">The Kiranlata collection</p><h2 id="product-search-title">Find a saree</h2></div><button type="button" class="product-search-close" aria-label="Close search">×</button></header><label class="product-search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" autocomplete="off" spellcheck="false" placeholder="Search by name, ID, weave, or color" aria-label="Search products"><button type="button" data-search-clear aria-label="Clear search" hidden>×</button></label><div class="product-search-results-heading"><p data-search-count aria-live="polite">Browse by weave</p><button type="button" data-search-view-all hidden>View all</button></div><div class="product-search-results" data-search-results></div></div>';
  document.body.append(dialog);

  const input=dialog.querySelector('input'),clear=dialog.querySelector('[data-search-clear]'),count=dialog.querySelector('[data-search-count]'),viewAll=dialog.querySelector('[data-search-view-all]'),results=dialog.querySelector('[data-search-results]');
  const categoryNames={dhaniakhali:'Dhaniakhali / Dhonekhali',gorod:'Gorod',phulia:'Phulia Tangail',dhalapathar:'Dhalapathar',banarasi:'Banarasi'};
  const routes={dhaniakhali:['/collections/bengal.html','dhaniakhali'],gorod:['/collections/bengal.html','gorod'],phulia:['/collections/bengal.html','phulia'],dhalapathar:['/collections/odisha.html','dhalapathar'],banarasi:['/collections/banarasi.html','banarasi']};
  let allProducts=[],showAll=false,cataloguePromise=null,returnFocus=null;

  const setMessage=(message)=>{results.replaceChildren();const empty=document.createElement('p');empty.className='product-search-empty';empty.textContent=message;results.append(empty)};
  const normalise=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const getCatalogue=()=>{
    if(globalThis.kiranlataProductCatalogues)return Promise.resolve(globalThis.kiranlataProductCatalogues);
    if(cataloguePromise)return cataloguePromise;
    cataloguePromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='/collections/region-page.js?v=20261010-4';
      script.onload=()=>globalThis.kiranlataProductCatalogues?resolve(globalThis.kiranlataProductCatalogues):reject(new Error('Catalogue data unavailable'));
      script.onerror=()=>reject(new Error('Catalogue data unavailable'));
      document.head.append(script);
    });
    return cataloguePromise;
  };
  const flattenCatalogue=catalogue=>Object.entries(catalogue).flatMap(([collection,items])=>items.map(item=>({ ...item,collection,category:categoryNames[collection]||collection })));
  const productHref=product=>{const [page,filter]=routes[product.collection]||['/index.html#collections',''];return `${page}?product=${encodeURIComponent(product.id)}${filter?`#${filter}`:''}`};
  const productSearchText=product=>normalise([product.id,product.name,product.category,product.type,product.design,(product.colors||[]).join(' '),product.details,product.fabric,product.availability,product.priceValue].join(' '));

  const renderPopular=()=>{
    results.replaceChildren();
    const links=[['Gorod','/collections/bengal.html#gorod'],['Dhaniakhali / Dhonekhali','/collections/bengal.html#dhaniakhali'],['Phulia Tangail','/collections/bengal.html#phulia'],['Dhalapathar','/collections/odisha.html#dhalapathar'],['Banarasi','/collections/banarasi.html#banarasi']];
    const group=document.createElement('div');group.className='product-search-popular';
    links.forEach(([label,href])=>{const link=document.createElement('a');link.href=href;link.textContent=label;group.append(link)});
    results.append(group);
  };

  const scoreProduct=(product,terms)=>{
    const id=normalise(product.id),name=normalise(product.name),category=normalise(product.category),haystack=productSearchText(product);
    if(!terms.every(term=>haystack.includes(term)))return -1;
    return terms.reduce((score,term)=>score+(id===term?100:id.startsWith(term)?80:name.startsWith(term)?60:name.includes(term)?45:category.includes(term)?30:haystack.includes(term)?10:0),0);
  };

  const renderResults=()=>{
    const terms=normalise(input.value).split(' ').filter(Boolean);
    clear.hidden=!input.value;
    if(!terms.length){count.textContent='Browse by weave';viewAll.hidden=true;renderPopular();return}
    const matches=allProducts.map(product=>({product,score:scoreProduct(product,terms)})).filter(result=>result.score>=0).sort((a,b)=>b.score-a.score||a.product.name.localeCompare(b.product.name));
    count.textContent=`${matches.length} ${matches.length===1?'saree':'sarees'} found`;
    viewAll.hidden=matches.length<=6;
    viewAll.textContent=showAll?'Show fewer':'View all';
    results.replaceChildren();
    if(!matches.length){setMessage('No sarees match that search. Try a product ID, weave name, color, or fabric.');return}
    const visible=showAll?matches:matches.slice(0,6);
    visible.forEach(({product})=>{
      const link=document.createElement('a');link.className='product-search-result';link.href=productHref(product);link.setAttribute('aria-label',`${product.name}, ${product.id}, ${product.priceValue==null?'Contact us for price':`$${Number(product.priceValue).toLocaleString('en-US')}`}, ${product.availability||'Available'}`);
      const image=document.createElement('img');image.src=product.images?.[0]?.card||'';image.alt='';image.loading='lazy';
      const copy=document.createElement('span');copy.className='product-search-result-copy';
      const eyebrow=document.createElement('small');eyebrow.textContent=`${product.id} · ${product.category}`;
      const name=document.createElement('strong');name.textContent=product.name;
      const details=document.createElement('span');details.className='product-search-result-details';details.textContent=product.details||[product.design,(product.colors||[]).join(', ')].filter(Boolean).join(' · ');
      copy.append(eyebrow,name,details);
      const meta=document.createElement('span');meta.className='product-search-result-meta';
      const price=document.createElement('strong');price.textContent=product.priceValue==null?'Contact us for price':`$${Number(product.priceValue).toLocaleString('en-US')}`;
      const availability=document.createElement('small');availability.className=product.availability==='Sold Out'?'is-sold-out':'';availability.textContent=product.availability||'Available';
      meta.append(price,availability);link.append(image,copy,meta);results.append(link);
    });
  };

  const openSearch=async()=>{
    returnFocus=searchButton;showAll=false;input.value='';count.textContent='Loading the collection…';setMessage('Loading sarees…');dialog.showModal();input.focus();
    try{const catalogue=await getCatalogue();allProducts=flattenCatalogue(catalogue);renderResults()}
    catch{count.textContent='Search is unavailable';setMessage('Please browse the collection while we reconnect search.');}
  };
  searchButton.addEventListener('click',openSearch);
  dialog.querySelector('.product-search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>returnFocus?.focus());
  input.addEventListener('input',()=>{showAll=false;renderResults()});
  clear.addEventListener('click',()=>{input.value='';showAll=false;renderResults();input.focus()});
  viewAll.addEventListener('click',()=>{showAll=!showAll;renderResults()});
})();
