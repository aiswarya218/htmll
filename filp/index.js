function ShowCategories(categoryId, categoryElementsId, heading) {
    const ClickedCategory = document.getElementById(categoryId);
    const DisplayElements = document.getElementById(categoryElementsId);

    if(!clickedCategory || !DisplayElements) {
        return false;
    }

    const ShowCategoryE1 = () => {
        DisplayElements.style.display = 'flex'
    }

    const HideCategoryE1 = () => { 
        DisplayElements.style.display = 'none'
    }

    ClickedCategory.addEventListener('mouseenter', ShowCategoryE1);
    DisplayElements.addEventListener('mouseenter', ShowCategoryE1);
    ClickedCategory.addEventListener('mouseleave', HideCategoryE1);
    DisplayElements.addEventListener('mouseleave', HideCategoryE1);
}

ShowCategories('electronics', 'show-electronics');
ShowCategories('tv-appliances', 'show-tvappliances');
ShowCategories('men', 'show-men');
ShowCategories('women', 'show-women');
ShowCategories('babyandkid', 'show-babykids');
ShowCategories('home','show-home');
ShowCategories('sports', 'show-sports');
ShowCategories('flights', 'show-flights');
ShowCategories('offerzone', 'show-offerzone');



function showOptions(id, id2 = '') {
    const element = document.getElementById(id);
    const element2 = document.getElementById(id2);
    element.style.display = (element.style.display === 'none' || element.style.display === "") ? 'block' : "none";
    element2.style.display = (element2.style.display === 'none' || element2.style.display === "") ? 'block' : "none";
}


const containerONE = document.getElementById('container-main');
const brandcheckBoxes = document.querySelectorAll(".brandname-checkbox");
const searchbar = document.getElementById('search-bar')

fetch("products.json")
  .then(response => response.json())
  .then(products => {
    allProducts = products;
    renderProducts(allProducts);
  })
  .catch(error => console.error('error loading products', error));

function renderProducts(products) {
    containerONE.innerHTML = "";
    const container = document.getElementById('product-list');
 products.forEach(p => { 
  container.innerHTML += `
    <div class="product-card">
      <a href="${p.link}"> 
        <div class="product box">
          <img src="${p.image}" class="pdtimg" alt="${p.name}">
        </div>
          <button class="wishlist-btn">
          <img src="${p.wishlistIcon}" alt="wishlist"></button>
        </div>
        <div class="product-info"> 
          <img src="${p.brandLogo}" class="brand-logo" alt="${p.brandLogo}">     
          <a class="product-name">${p.name}</a>
          <div class="packet">${p.packet}</div>
          <div class="rating">  
            <span class = "rate-part"> 
            <div class = "rating-sct">${p.rating}
            <img src="${p.ratingStarIcon}" alt="star"> 
            </div>               
            </span>
            <span class="reviews">(${p.reviews})</span>
            <div class = "assure-sct">
            <img  height = "21" src="${p.assuredBadge}" alt="assured" class="assured"> 
            </div>
          </div>
          <a class = "price-part" href = "#" target="_blank" rel="noopener noreferrer">  
          <div class = "cost-part">      
          <div class="price">
            ₹${p.price} </div>
            <div class="original">₹${p.originalPrice}</div>  
            <div class="discount">
              <span>${p.discountPercent}% off</span> 
                </div>
          </div>
        </div>
        <div class="offer-message">
          ${p.offerMessage}
        </div>
        <div class = "quantity-section">
          <span class = "quantity-label" >Quantity:</span>
          <button class="quantity-btn" onclick="toggleQuantityPopUp(this)">
             ${p.quantities[0]}
          </button>
          <div class = "quantity-popup">
             ${p.quantities.map(q =>  `<div onclick = "selectQuantity(this)">${q}</div>`).join("")}
          </div>
      </div>
    </div>
    </a>
  </div>
  `;
    containerONE.appendChild(pContainer);
});
 }

 brandcheckBoxes.forEach(cBox => {
    cBox.addEventListener('change', () => {
        const selectedBrands = Array.from(brandcheckBoxes)

        .filter(cb => cb.checked)
        .map(cb => cb.value)

        if (selectedBrands.length === 0) {
            renderProducts(allProducts);
        }
        else {
            const filtered = allProducts.filter(product => selectedBrands.includes(product.brand));
            renderProducts(filtered)
        }
    });
 });

 const displayCheckBoxes = document.querySelectorAll('.displayCB');
 displayCheckBoxes.forEach(cBox => {
    cBox.addEventListener('change', () => {
        const selectedItems = Array.from(displayCheckBoxes).filter(cb => cb.checked).map(cb => cb.value);

        if (selectedItems.length === 0) {
            renderProducts(allProducts);
        } else {
            const filtered = allProducts.filter(product => {
                return selectedItems.some(displayVal => product.display === (displayVal))
            });
            renderProducts(filtered);
        }
    })
 })

 const popularity = document.getElementById('pop');
 popularity.addEventListener('click', () => {
    const popularProducts = [...allProducts].sort((a, b) => b.popular - a.popular);
    renderProducts(popularProducts);
 })

 const lowToHigh = document.getElementById('low-high');

 lowToHigh.addEventListener('click', () => {
    const lowHighProducts = [...allProducts].sort((a, b) => a.price - b.price);
    renderProducts(lowHighProducts);

 })

 const HighLow = document.getElementById('high-low');
 HighLow.addEventListener('click', () => {
    const HighLowProducts = [...allProducts].sort((a, b) => {
        return new DataTransfer(b.releaseDate) - new Date(a.releaseDate);
    });
    renderProducts(HighLowProducts);
 })

 const newest = document.getElementById('newest');
 newest.addEventListener('click', () => {
    const newestProducts = [...allProducts].sort((a,b) => {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
    });
    renderProducts(newestProducts);
 })

const AllcheckBoxes = document.querySelectorAll('.common-input');

const selectedFilters = document.getElementById('selectedFilters');
const clearButtonTop = document.getElementById('topClearBox');

AllcheckBoxes.forEach(cb=>{
    cb.addEventListener('change', () => {
        updateSelectedFilters();
    });
});

function updateSelectedFilters() {
    const selected = Array.from(AllcheckBoxes).filter(cb=>cb.checked).map(cb=>cb);
        selectedFilters.innerHTML = "";
        clearButtonTop.style.display = selected.length > 0 ? 'inline' :'none';

    selected.forEach(item => {
        selectedFilters.innerHTML+= `
    <div class="selcted-filter-container">
        <div class = "intoMark">X</div>
    <div class = "selected-item" id = "selectedItem">${item}</div>
    </div>
        `;
    });

    const intoMarks = selectedFilters.querySelectorAll('.intoMark');
    intoMarks.forEach(into => {
        into.addEventListener('click',()=>{
            const value = into.getAttribute('data-value');
            const checkbox = Array.from(brandcheckBoxes).find(cb=>cb.value === value);
            updateSelectedFilters()
            filterProductByBrand()
        })
    })
}

clearButtonTop.innerHTML = `
<span id = "clearBtnTop">Clear All</span>`;

clearButtonTop.addEventListener('click',() => {
    const AllcheckBoxes=document.querySelectorAll('input[type="checkbox"]');
    AllcheckBoxes.forEach(cb=>cb.checked = false);
    selectedFilters.innerHTML = ""
    renderProducts(allProducts);
});

const minSelect = document.getElementById('min-select');
const maxSelect = document.getElementById('max-select');

const priceLine = document.getElementById("priceline");
const leftPointer = document.getElementById('left-pointer');
const rightPointer = document.getElementById('right-pointer');
const blueline = document.getElementById('blueLine');
const PriceSteps = [0,10000,5000,1000,500,200];

function priceToPosition(price) {
    const index = PriceSteps.indexOf(price);
    return (index / (PriceSteps.length - 1))* priceLine.offsetWidth;
}

function positionToClosestPrice(position) {
    const ratio = position / priceLine.offsetWidth;
    const index = Math.round(ratio* (PriceSteps.length - 1));
    return PriceSteps[index];
}   

  
function enableDragging(pointer,isLeft) {
    pointer.addEventListener("mousedown", ()=>{
        document.onmousemove = (e) => {
            let rect = priceLine.getBoundingClientRect();
            let position = Math.min(0, Math.min(e.clientX -rect.left,priceLine.offsetWidth));

            let price = positionToClosestPrice(position);
            let snapPosition = priceToPosition(price);   
            
            pointer.style.left = snapPosition + "px";
            if(isLeft) {
                minSelect.value =price;
            }
            else {
                maxSelect.value =price;
            }

            updateBlueLine();
            filterbyPrice();
        };

        document.onmouseup = () => (document.onmousemove= null);
    }) ;
} 
function updateBlueLine() {
    const leftPosition = parseInt(leftPointer.style.left) || 0;
    const rightPosition = parseInt(rightPointer.style.left) || priceLine.offsetWidth;

    blueline.style.left = leftPosition + "px";
    blueline.style.width=(rightPosition - leftPosition)+"px";
}

enableDragging(leftPointer,true);
enableDragging(rightPointer,false);

function filterbyPrice() {
    let min =parseInt(minSelect.value);
    let max =parseInt(maxSelect.value);

    if (isNaN(min))min=0;
    if(isNaN(max))max=Infinity;

    const filtered = allProducts.filter (
        product=>product.price >= min && product.price <= max
    );
    renderProducts(filtered);
}

 
minSelect.addEventListener('change',() => {        
    const minVal = parseInt(minSelect.value)|| PriceSteps [PriceSteps.length - 1];
    rightPointer.style.left= priceToPosition(maxVal)+"px";
    updateBlueLine();
    filterbyPrice();
})       


const allBrandCheckBoxes = document.querySelectorAll('.brandCheck');
const BrandClear = document.getElementById('brandClear');

allBrandCheckBoxes.forEach(cBox=>{
    cBox.addEventListener('change',()=>{
        const anyChecked = Array.from(brandcheckBoxes).some(cb=>cb.checked);
        BrandClear.style.display = anyChecked? 'inline-block':'none';
    });
});

BrandClear.addEventListener('click',()=>{
    allBrandCheckBoxes.forEach(cb=>cb.checked= false);
    BrandClear.style.display='none';
});

const allRatingCheckboxes = document.querySelectorAll('.ratingboxes');
const clearRatings=document.getElementById('ratingClear');

  allRatingCheckboxes.forEach(cBox=>{
    cBox.addEventListener('change',()=>{
        const anyChecked=Array.from(allRatingsCheckboxes).some(cb=>cb.checked);
        clearRatings.style.display = anyChecked ? 'inline-block':"none";
    });
  });
   products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.product_name}">
        <div class="product-name">${product.product_name}</div>
        <div>
          <span class="price">${product.price.current_price}</span>
          <span class="original-price">${product.price.original_price}</span>
          <span class="discount">${product.price.discount_percentage}</span>
        </div>
        <div class="rating">⭐ ${product.rating.score} | ${product.rating.total_ratings} | ${product.rating.total_reviews}</div>
        <div class="specs">
          <div><b>RAM:</b> ${product.specifications.ram}</div>
          <div><b>ROM:</b> ${product.specifications.rom}</div>
          <div><b>Display:</b> ${product.specifications.display}</div>
          <div><b>Battery:</b> ${product.specifications.battery}</div>
        </div>
        <div class="offer">✅ ${product.offers.bank_offer || ""} ${product.offers.exchange_offer ? "| " + product.offers.exchange_offer : ""} ${product.offers.phones_left || ""}</div>
      `;

      productList.appendChild(card);
    });