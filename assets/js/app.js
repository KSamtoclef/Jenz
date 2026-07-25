const products = [
  {id:1,name:'Wireless Headphones',category:'Electronics',price:18500,oldPrice:22000,emoji:'🎧',seller:'ByteTech Hub',rating:4.8,reviews:42,discount:'16% OFF',location:'Main Campus'},
  {id:2,name:'Classic Canvas Tote Bag',category:'Fashion',price:5500,oldPrice:7000,emoji:'👜',seller:"Kemi's Closet",rating:4.9,reviews:31,discount:'21% OFF',location:'Female Hostel'},
  {id:3,name:'Jollof Rice & Chicken',category:'Food',price:2800,oldPrice:null,emoji:'🍛',seller:'Campus Bites',rating:4.7,reviews:68,discount:null,location:'Student Centre'},
  {id:4,name:'Scientific Calculator',category:'Books',price:12500,oldPrice:15000,emoji:'🧮',seller:'Scholar Store',rating:4.8,reviews:25,discount:'17% OFF',location:'Faculty Area'},
  {id:5,name:'Skincare Starter Set',category:'Beauty',price:9700,oldPrice:12000,emoji:'🧴',seller:'Glow by Teni',rating:4.6,reviews:19,discount:'19% OFF',location:'South Gate'},
  {id:6,name:'Graphic Design Package',category:'Services',price:8000,oldPrice:null,emoji:'🎨',seller:'Pixel Lab',rating:5.0,reviews:37,discount:null,location:'Online service'},
  {id:7,name:'Mini Rechargeable Fan',category:'Hostel',price:14500,oldPrice:17000,emoji:'🌀',seller:'Room Essentials',rating:4.7,reviews:54,discount:'15% OFF',location:'North Hostel'},
  {id:8,name:'Unisex Campus Sneakers',category:'Fashion',price:23500,oldPrice:28000,emoji:'👟',seller:'StreetMode NG',rating:4.8,reviews:46,discount:'16% OFF',location:'Main Gate'},
  {id:9,name:'Power Bank 20,000mAh',category:'Electronics',price:21000,oldPrice:25000,emoji:'🔋',seller:'ByteTech Hub',rating:4.9,reviews:73,discount:'16% OFF',location:'Main Campus'},
  {id:10,name:'Lecture Note Printing',category:'Services',price:1500,oldPrice:null,emoji:'🖨️',seller:'QuickPrint Hub',rating:4.7,reviews:58,discount:null,location:'Library Complex'},
  {id:11,name:'Brownies Box of Six',category:'Food',price:4000,oldPrice:null,emoji:'🍫',seller:'Sweet Spot',rating:4.9,reviews:34,discount:null,location:'Student Centre'},
  {id:12,name:'Bedside Reading Lamp',category:'Hostel',price:6800,oldPrice:8500,emoji:'💡',seller:'Room Essentials',rating:4.6,reviews:22,discount:'20% OFF',location:'North Hostel'}
];

const sellers = [
  {name:"Kemi's Closet",initials:'KC',category:'Fashion & accessories',rating:'4.9',orders:'210 orders'},
  {name:'ByteTech Hub',initials:'BT',category:'Phones & electronics',rating:'4.8',orders:'184 orders'},
  {name:'Campus Bites',initials:'CB',category:'Meals & snacks',rating:'4.7',orders:'320 orders'}
];

let visibleCount = 8;
let selectedCategory = 'All';
let cart = JSON.parse(localStorage.getItem('jenz-demo-cart') || '[]');

const productGrid = document.getElementById('productGrid');
const sellerGrid = document.getElementById('sellerGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

function money(value){return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(value)}

function renderProducts(){
  const query = searchInput.value.trim().toLowerCase();
  let filtered = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = !query || [product.name,product.category,product.seller,product.location].join(' ').toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
  const sort = sortSelect.value;
  if(sort === 'low') filtered.sort((a,b)=>a.price-b.price);
  if(sort === 'high') filtered.sort((a,b)=>b.price-a.price);
  if(sort === 'rating') filtered.sort((a,b)=>b.rating-a.rating);
  productGrid.innerHTML = filtered.slice(0,visibleCount).map(productCard).join('');
  if(!filtered.length) productGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:50px;color:#6b6675"><div style="font-size:48px">🔎</div><h3>No matching products yet</h3><p>Try another search or category.</p></div>';
  document.getElementById('loadMoreButton').style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';
}

function productCard(p){
  return `<article class="product-card">
    ${p.discount?`<span class="discount">${p.discount}</span>`:''}
    <button class="heart" onclick="toggleWish(this)" aria-label="Save ${p.name}">♡</button>
    <div class="product-image">${p.emoji}</div>
    <div class="product-info">
      <span class="product-tag">${p.category}</span>
      <h3>${p.name}</h3>
      <div class="seller-line"><b>✓</b> ${p.seller} · ${p.location}</div>
      <div class="rating-line"><span>★ ${p.rating}</span><span>${p.reviews} reviews</span></div>
      <div class="price-row"><div><strong>${money(p.price)}</strong>${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:''}</div><button onclick="addToCart(${p.id})" aria-label="Add ${p.name} to cart">+</button></div>
    </div>
  </article>`;
}

function renderSellers(){
  sellerGrid.innerHTML = sellers.map(s=>`<article class="seller-card"><span class="avatar">${s.initials}</span><div><strong>${s.name}</strong><small>${s.category}</small><span class="verified">✓ Verified seller</span></div><div style="text-align:right"><strong>★ ${s.rating}</strong><small>${s.orders}</small></div></article>`).join('');
}

function setCategory(category){
  selectedCategory = category;
  visibleCount = 8;
  document.querySelectorAll('[data-category]').forEach(btn=>btn.classList.toggle('active',btn.dataset.category===category));
  renderProducts();
  document.getElementById('marketplace').scrollIntoView({behavior:'smooth'});
}

document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>setCategory(button.dataset.category)));
document.getElementById('searchForm').addEventListener('submit',event=>{event.preventDefault();renderProducts();document.getElementById('marketplace').scrollIntoView({behavior:'smooth'})});
searchInput.addEventListener('input',renderProducts);
sortSelect.addEventListener('change',renderProducts);
document.getElementById('loadMoreButton').addEventListener('click',()=>{visibleCount+=4;renderProducts()});

window.toggleWish = button => {button.textContent = button.textContent === '♡' ? '♥' : '♡';button.style.color = button.textContent === '♥' ? '#dc2626' : '';showToast(button.textContent === '♥' ? 'Saved to wishlist' : 'Removed from wishlist')};
window.addToCart = id => {
  const item = cart.find(x=>x.id===id);
  if(item) item.quantity += 1; else cart.push({...products.find(x=>x.id===id),quantity:1});
  saveCart();showToast('Added to cart');
};
function removeFromCart(id){cart=cart.filter(item=>item.id!==id);saveCart()}
function saveCart(){localStorage.setItem('jenz-demo-cart',JSON.stringify(cart));renderCart()}
function renderCart(){
  const count = cart.reduce((sum,item)=>sum+item.quantity,0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItems').innerHTML = cart.map(item=>`<div class="cart-item"><div class="cart-item-emoji">${item.emoji}</div><div><strong>${item.name}</strong><small>${item.quantity} × ${money(item.price)}</small></div><button onclick="removeCartItem(${item.id})">Remove</button></div>`).join('');
  document.getElementById('cartEmpty').style.display = cart.length ? 'none' : 'block';
  document.querySelector('.cart-summary').style.display = cart.length ? 'block' : 'none';
  const total = cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);
  document.getElementById('cartSubtotal').textContent = money(total);
  document.getElementById('checkoutTotal').textContent = money(total);
  document.getElementById('checkoutItems').innerHTML = cart.map(item=>`<div class="checkout-line"><span>${item.name} × ${item.quantity}</span><strong>${money(item.price*item.quantity)}</strong></div>`).join('');
}
window.removeCartItem = removeFromCart;

function openLayer(id){const el=document.getElementById(id);if(!el)return;el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeLayer(id){const el=document.getElementById(id);if(!el)return;el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>openLayer(btn.dataset.open)));
document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeLayer(btn.dataset.close)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.open').forEach(el=>closeLayer(el.id))});

document.getElementById('checkoutButton').addEventListener('click',()=>{if(!cart.length)return showToast('Your cart is empty');closeLayer('cartDrawer');openLayer('checkoutModal')});

function demoSubmit(formId,message,closeId){
  document.getElementById(formId).addEventListener('submit',event=>{event.preventDefault();showToast(message);if(closeId)setTimeout(()=>closeLayer(closeId),350);event.target.reset()});
}
demoSubmit('newsletterForm','You joined the JENZ preview list');
demoSubmit('authForm','Account preview completed','authModal');
demoSubmit('sellerForm','Seller profile preview created','sellerModal');
demoSubmit('checkoutForm','Demo order placed successfully','checkoutModal');

document.getElementById('messageForm').addEventListener('submit',event=>{event.preventDefault();const input=event.target.querySelector('input');if(!input.value.trim())return;const p=document.createElement('p');p.className='sent';p.textContent=input.value.trim();document.querySelector('.chat-body').appendChild(p);input.value='';showToast('Demo message sent')});

document.querySelectorAll('[data-auth-tab]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.remove('active'));button.classList.add('active');
  const signup=button.dataset.authTab==='signup';document.getElementById('signupFields').style.display=signup?'block':'none';
}));

document.getElementById('menuButton').addEventListener('click',()=>document.querySelector('.search').classList.toggle('open'));

let toastTimer;
function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300)}

function startCountdown(){
  let remaining=5*60*60+24*60+18;
  setInterval(()=>{remaining=remaining>0?remaining-1:6*60*60;const h=String(Math.floor(remaining/3600)).padStart(2,'0');const m=String(Math.floor((remaining%3600)/60)).padStart(2,'0');const s=String(remaining%60).padStart(2,'0');document.getElementById('countdown').innerHTML=`<span>${h}<small>HRS</small></span><b>:</b><span>${m}<small>MIN</small></span><b>:</b><span>${s}<small>SEC</small></span>`},1000);
}

renderProducts();renderSellers();renderCart();startCountdown();
