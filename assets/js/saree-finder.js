(()=>{
  const main=document.querySelector('.all-sarees-content');
  const catalogues=globalThis.kiranlataProductCatalogues;
  if(!main||!catalogues)return;

  const categoryNames={dhaniakhali:'Dhaniakhali / Dhonekhali',gorod:'Gorod',phulia:'Phulia Tangail',baluchari:'Baluchari',narayanpet:'Narayanpet',dhalapathar:'Dhalapathar',banarasi:'Banarasi',kalakshetra:'Bengal Kalakshetra'};
  const parentNames={bengal:'Bengal Handloom',odisha:'Odisha Handloom','south-india':'South Indian Handloom',banarasi:'Individual Traditions',maheshwari:'Individual Traditions'};
  const categoryLabel=key=>categoryNames[key]||String(key).replace(/[-_]+/g,' ').replace(/\b\w/g,letter=>letter.toUpperCase());
  const products=Object.entries(catalogues).flatMap(([collection,items])=>items.filter(item=>item.id&&item.images?.[0]?.card).map((item,index)=>({...item,collection,parent:parentNames[globalThis.kiranlataProductRoutes?.[collection]?.page?.split('/').pop()?.replace('.html','')]||'Individual Traditions',category:categoryLabel(collection),order:index}))).filter(item=>item.availability!=='Sold Out');
  const distinct=values=>[...new Set(values.filter(Boolean))];
  const numericPrice=product=>product.priceValue!==undefined&&product.priceValue!==null&&Number.isFinite(Number(product.priceValue))?Number(product.priceValue):null;
  const sortText=(a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'});
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const familyFor=color=>{
    const value=normalize(color);
    if(/red|rose|pink|burgundy|maroon|crimson|vermil|wine|magenta/.test(value))return 'Reds & roses';
    if(/green|olive|sage|pistachio|lime/.test(value))return 'Greens';
    if(/blue|teal|turquoise|navy|indigo/.test(value))return 'Blues & teals';
    if(/purple|violet|lavender|lilac/.test(value))return 'Purples';
    if(/gold|yellow|mustard|basanti|ochre/.test(value))return 'Golds & yellows';
    if(/ivory|white|cream|beige|peach|chandan|tan/.test(value))return 'Ivories & warm neutrals';
    if(/grey|gray|black|charcoal|silver/.test(value))return 'Greys & black';
    return 'Other shades';
  };
  let activeCut1=0,activeCut2=0,activePriceCount=0;
  const budgetOptionsFor=scope=>{
    const inScope=distinct(scope.map(numericPrice).filter(value=>value!==null)).sort((a,b)=>a-b);
    activePriceCount=inScope.length;
    activeCut1=inScope.length>2?inScope[Math.floor((inScope.length-1)/3)]:inScope[0]||0;
    activeCut2=inScope.length>2?inScope[Math.floor(2*(inScope.length-1)/3)]:inScope.at(-1)||activeCut1;
    const options=[{value:'all',label:'Show all listed prices'}];
    if(inScope.length===2)options.push({value:'lower',label:`$${inScope[0].toLocaleString('en-US')} or less`},{value:'upper',label:`Over $${inScope[0].toLocaleString('en-US')}`});
    else if(inScope.length>2)options.push({value:'lower',label:`Up to $${activeCut1.toLocaleString('en-US')}`},{value:'middle',label:`$${(activeCut1+1).toLocaleString('en-US')}–$${activeCut2.toLocaleString('en-US')}`},{value:'upper',label:`Over $${activeCut2.toLocaleString('en-US')}`});
    return options;
  };

  const promo=document.createElement('section');
  promo.className='saree-finder-promo';
  promo.setAttribute('aria-labelledby','saree-finder-promo-title');
  promo.innerHTML='<div><p class="eyebrow">A little help, beautifully woven</p><h2 id="saree-finder-promo-title">Find your saree match.</h2><p>Five quick picks. No wrong answers. No fashion degree required.</p></div><button type="button" class="saree-finder-start">Find my match <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 16 4M6 4h10v10"/></svg></button>';
  main.querySelector('.shop-catalogue-intro')?.after(promo);

  const dialog=document.createElement('dialog');
  dialog.className='saree-finder-dialog';
  dialog.setAttribute('aria-labelledby','saree-finder-title');
  dialog.innerHTML=`<div class="saree-finder-shell">
    <header class="saree-finder-header"><div><p class="eyebrow">The Kiranlata saree finder</p><h2 id="saree-finder-title">Your saree shortlist.</h2><p>Five quick picks. No wrong answers, no personality diagnosis. Just sarees you might love.</p></div><button type="button" class="saree-finder-close" aria-label="Close saree finder">×</button></header>
    <div class="saree-finder-progress" data-finder-progress-wrap><span data-finder-step-label>01 / 05</span><div role="progressbar" aria-label="Quiz progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1" data-finder-progress><span></span></div></div>
    <section class="saree-finder-wizard" data-finder-wizard>
      <fieldset class="saree-finder-question"><legend data-finder-question tabindex="-1"></legend><p data-finder-hint></p><div class="saree-finder-options" data-finder-options></div><label class="saree-finder-inquiry-toggle" data-finder-inquiry-wrap hidden><input type="checkbox" data-finder-inquiry><span>Also show pieces whose price is available by inquiry. They’ll be listed separately, not treated as within this budget.</span></label></fieldset>
      <footer class="saree-finder-controls"><button type="button" class="saree-finder-back" data-finder-back>Back</button><button type="button" class="saree-finder-next" data-finder-next>Next question <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5"/></svg></button></footer>
    </section>
    <section class="saree-finder-results" data-finder-results hidden aria-live="polite"></section>
  </div>`;
  document.body.append(dialog);

  const parentOrder=['Bengal Handloom','Odisha Handloom','South Indian Handloom','Individual Traditions'];
  const parents=distinct(products.map(product=>product.parent)).sort((a,b)=>parentOrder.indexOf(a)-parentOrder.indexOf(b));
  const questions=[
    {key:'parent',title:'Where should we take your drape?',hint:'Pick a broad handloom region, or be gloriously indecisive and explore them all.',options:[{value:'',label:'Surprise me across all regions'},...parents.map(value=>({value,label:value}))]},
    {key:'weave',title:'Any weave catching your eye?',hint:'Gorod girl? Phulia fan? These choices follow the region you picked.',optionsFor:scope=>[{value:'',label:'Keep every weave in this collection'},...distinct(scope.map(product=>product.category)).sort(sortText).map(value=>({value,label:value}))]},
    {key:'color',title:'Pick your colour mood.',hint:'Choose a palette, not a lifetime commitment. These shades are in the sarees you narrowed down.',optionsFor:scope=>[{value:'',label:'I’m open to every shade'},...distinct(scope.flatMap(product=>product.colors||[]).map(familyFor)).sort(sortText).map(value=>({value,label:value}))]},
    {key:'design',title:'What details make you look twice?',hint:'No imaginary options: every style below appears in the sarees you shortlisted so far.',optionsFor:scope=>[{value:'',label:'Show me a little of everything'},...distinct(scope.map(product=>product.design)).sort(sortText).map(value=>({value,label:value}))]},
    {key:'budget',title:'Where should we keep the price?',hint:'Choose a listed-price range for your current selection. Contact-for-price pieces stay separate.',optionsFor:budgetOptionsFor}
  ];
  const answers={parent:'',weave:'',color:'',design:'',budget:'all',includeInquiry:false};
  const questionEl=dialog.querySelector('[data-finder-question]'),hintEl=dialog.querySelector('[data-finder-hint]'),optionsEl=dialog.querySelector('[data-finder-options]'),stepLabel=dialog.querySelector('[data-finder-step-label]'),progress=dialog.querySelector('[data-finder-progress]'),progressFill=progress.querySelector('span'),back=dialog.querySelector('[data-finder-back]'),next=dialog.querySelector('[data-finder-next]'),wizard=dialog.querySelector('[data-finder-wizard]'),results=dialog.querySelector('[data-finder-results]'),inquiryWrap=dialog.querySelector('[data-finder-inquiry-wrap]'),inquiryCheckbox=dialog.querySelector('[data-finder-inquiry]');
  let step=0;

  const productsInScope=()=>products.filter(product=>(!answers.parent||product.parent===answers.parent)&&(!answers.weave||product.category===answers.weave));
  const productsMatchingPreferences=(includeDesign=false)=>productsInScope().filter(product=>(!answers.color||(product.colors||[]).some(color=>familyFor(color)===answers.color))&&(!includeDesign||!answers.design||product.design===answers.design));

  const renderQuestion=(restoreOptionFocus=false)=>{
    const question=questions[step],scope=step===3?productsMatchingPreferences():step>3?productsMatchingPreferences(true):productsInScope(),options=question.optionsFor?question.optionsFor(scope):question.options;
    stepLabel.textContent=`${String(step+1).padStart(2,'0')} / ${String(questions.length).padStart(2,'0')}`;
    progress.setAttribute('aria-valuenow',String(step+1));
    progressFill.style.width=`${((step+1)/questions.length)*100}%`;
    questionEl.textContent=question.title;
    hintEl.textContent=question.hint;
    if(answers[question.key]&&!options.some(option=>option.value===answers[question.key]))answers[question.key]='';
    optionsEl.replaceChildren();
    options.forEach(option=>{
      const button=document.createElement('button');
      button.type='button';button.className='saree-finder-option';button.textContent=option.label;
      button.dataset.question=question.key;
      const swatches={'':'conic-gradient(#8f1d29 0 25%,#315b3d 25% 50%,#23456d 50% 75%,#d8b43b 75%)','Reds & roses':'linear-gradient(135deg,#8f1d29 0 38%,#cd6272 38% 68%,#f1c2ac 68%)','Greens':'linear-gradient(135deg,#315b3d 0 38%,#8ca77b 38% 68%,#d8d9a4 68%)','Blues & teals':'linear-gradient(135deg,#23456d 0 38%,#168c8e 38% 68%,#a8d5d0 68%)','Purples':'linear-gradient(135deg,#58366e 0 38%,#a275b4 38% 68%,#ddc9df 68%)','Golds & yellows':'linear-gradient(135deg,#ab6a16 0 38%,#d8b43b 38% 68%,#f3e29e 68%)','Ivories & warm neutrals':'linear-gradient(135deg,#9d6b48 0 38%,#d5b99a 38% 68%,#f5e8d1 68%)','Greys & black':'linear-gradient(135deg,#252628 0 38%,#72777b 38% 68%,#d6d4cc 68%)','Other shades':'linear-gradient(135deg,#8f1d29 0 25%,#315b3d 25% 50%,#23456d 50% 75%,#d8b43b 75%)'};
      if(question.key==='color')button.style.setProperty('--finder-swatch',swatches[option.value]||'linear-gradient(135deg,#eee 0 50%,#aaa 50%)');
      button.setAttribute('aria-pressed',String(answers[question.key]===option.value));
      if(answers[question.key]===option.value)button.classList.add('is-selected');
      button.addEventListener('click',()=>{answers[question.key]=option.value;if(question.key==='parent'){answers.weave='';answers.color='';answers.design='';answers.budget='all'}if(question.key==='weave'){answers.color='';answers.design='';answers.budget='all'}if(question.key==='color'){answers.design='';answers.budget='all'}if(question.key==='design')answers.budget='all';renderQuestion(true)});
      optionsEl.append(button);
    });
    if(restoreOptionFocus)optionsEl.querySelector('.is-selected')?.focus();
    back.disabled=step===0;
    next.innerHTML=step===questions.length-1?'Show my shortlist <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 16 4M6 4h10v10"/></svg>':'Next question <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5"/></svg>';
    inquiryWrap.hidden=question.key!=='budget';
    inquiryCheckbox.checked=answers.includeInquiry;
  };

  const budgetMatches=product=>{
    const value=numericPrice(product);
    if(value===null)return false;
    if(answers.budget==='lower')return value<=activeCut1;
    if(answers.budget==='middle')return value>activeCut1&&value<=activeCut2;
    if(answers.budget==='upper')return value>(activePriceCount===2?activeCut1:activeCut2);
    return true;
  };
  const colorMatches=product=>!answers.color||(product.colors||[]).some(color=>familyFor(color)===answers.color);
  const score=product=>{
    let earned=0,total=0;
    const criteria=[['color',50,colorMatches(product)],['design',50,product.design]];
    criteria.forEach(([key,weight,match])=>{
      if(!answers[key])return;
      total+=weight;
      if(key==='color'?match:match===answers[key])earned+=weight;
    });
    return total?earned/total:0;
  };
  const productHref=product=>{const route=globalThis.kiranlataProductRoutes?.[product.collection];const page=route?.page||'/shop.html',anchor=route?.anchor||'';return `${page}?product=${encodeURIComponent(product.id)}${anchor?`#${encodeURIComponent(anchor)}`:''}`};
  const reasons=product=>{
    const labels=[];
    if(answers.parent&&product.parent===answers.parent)labels.push(product.parent);
    if(answers.weave&&product.category===answers.weave)labels.push(product.category);
    if(answers.color&&colorMatches(product))labels.push(answers.color);
    if(answers.design&&product.design===answers.design)labels.push(product.design);
    return labels.length?labels.join(' · '):'A considered pick from the current collection';
  };
  const cardFor=product=>{
    const link=document.createElement('a');link.className='saree-finder-result-card';link.href=productHref(product);link.setAttribute('aria-label',`${product.name}, ${product.id}, ${product.priceValue==null?'Contact us for price':`$${Number(product.priceValue).toLocaleString('en-US')}`}`);
    const image=document.createElement('img');image.src=product.images[0].card;image.alt=`${product.name} · ${product.id}`;image.loading='lazy';
    const copy=document.createElement('span');copy.className='saree-finder-result-copy';
    const id=document.createElement('small');id.textContent=product.id;
    const title=document.createElement('strong');title.textContent=product.name;
    const meta=document.createElement('span');meta.textContent=[product.category,product.design,(product.colors||[]).join(', ')].filter(Boolean).join(' · ');
    const reason=document.createElement('em');reason.textContent=reasons(product);
    const price=document.createElement('b');price.textContent=product.priceValue==null?'Contact us for price':`$${Number(product.priceValue).toLocaleString('en-US')}`;
    copy.append(id,title,meta,reason,price);link.append(image,copy);return link;
  };
  const renderResults=()=>{
  const eligible=productsInScope().filter(product=>budgetMatches(product));
    eligible.sort((a,b)=>score(b)-score(a)||a.order-b.order);
    const priced=eligible.filter(product=>numericPrice(product)!==null).slice(0,5);
    const inquiry=answers.includeInquiry?productsInScope().filter(product=>product.priceValue==null).sort((a,b)=>score(b)-score(a)||a.order-b.order):[];
    results.replaceChildren();
    const heading=document.createElement('div');heading.className='saree-finder-results-heading';
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='Your edit';
    const title=document.createElement('h3');title.tabIndex=-1;title.textContent=priced.length?'Your shortlist is ready.':'No listed-price matches in that range.';
    const summary=document.createElement('p');const scope=[answers.weave,answers.parent].filter(Boolean).join(' · ')||'the current collection';const priceScope=answers.budget==='all'?'with listed prices':'within your selected price range';summary.textContent=priced.length?`${eligible.length} available sarees from ${scope} are ${priceScope}. Your colour and design preferences shape the order.`:inquiry.length?'The inquiry-priced pieces below have no confirmed price, so they are not budget matches.':'Try another price range, or include pieces priced by inquiry.';
    heading.append(eyebrow,title,summary);results.append(heading);
    if(priced.length){const grid=document.createElement('div');grid.className='saree-finder-result-grid';priced.forEach(product=>grid.append(cardFor(product)));results.append(grid)}
    if(answers.includeInquiry){
      const inquiryHeading=document.createElement('p');inquiryHeading.className='saree-finder-inquiry-note';inquiryHeading.textContent=`Price by inquiry · ${inquiry.length} ${inquiry.length===1?'piece':'pieces'} shown separately; these are not budget matches.`;results.append(inquiryHeading);
      if(inquiry.length){const grid=document.createElement('div');grid.className='saree-finder-result-grid is-inquiry';inquiry.forEach(product=>grid.append(cardFor(product)));results.append(grid)}
    }
    const footer=document.createElement('footer');footer.className='saree-finder-results-controls';
    const edit=document.createElement('button');edit.type='button';edit.className='saree-finder-back';edit.textContent='Adjust my answers';edit.addEventListener('click',()=>{results.hidden=true;wizard.hidden=false;dialog.querySelector('[data-finder-progress-wrap]').hidden=false;step=0;renderQuestion();dialog.scrollTop=0;questionEl.focus()});
    const browse=document.createElement('button');browse.type='button';browse.className='saree-finder-next';browse.textContent='Browse all sarees';browse.addEventListener('click',()=>dialog.close());
    footer.append(edit,browse);results.append(footer);
  };

  promo.querySelector('.saree-finder-start').addEventListener('click',()=>{step=0;renderQuestion();wizard.hidden=false;results.hidden=true;dialog.querySelector('[data-finder-progress-wrap]').hidden=false;dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.saree-finder-close').focus()});
  dialog.querySelector('.saree-finder-close').addEventListener('click',()=>dialog.close());
  back.addEventListener('click',()=>{if(step>0){step-=1;renderQuestion();dialog.scrollTop=0;questionEl.focus()}});
  next.addEventListener('click',()=>{if(step<questions.length-1){step+=1;renderQuestion();dialog.scrollTop=0;questionEl.focus()}else{answers.includeInquiry=inquiryCheckbox.checked;wizard.hidden=true;dialog.querySelector('[data-finder-progress-wrap]').hidden=true;results.hidden=false;dialog.scrollTop=0;renderResults();results.querySelector('.saree-finder-results-heading h3')?.focus()}});
})();
