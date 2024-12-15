const array = [
  {
    name: "1 Unit",
    subName: "Standard Price",
    price: 10.0,
    originalPrice: 24.0,
    percentageOff: 10,
  },
  {
    name: "2 Unit",
    price: 18.0,
    originalPrice: 24.0,
    percentageOff: 20,
  },
  {
    name: "3 Unit",
    price: 24.0,
    originalPrice: 24.0,
    percentageOff: 30,
  },
];

const container = document.getElementById("cards-container");
let footer = document.querySelector(".footer");

let selectedIndex = null;
let total = 0;

function updateCardClasses() {
    let docs = document.querySelectorAll(".option").forEach((card, i) => {
       card.className = `option ${i === selectedIndex ? "popular" : ""}`;
     });
   }
array.forEach((item, index) => {
  const numRows = index + 1;
  let sizeColorContent = "";

  for (let i = 0; i < numRows; i++) {
    sizeColorContent += `
        <div class="size-color">
          <div>
            <label for="size${index + 1}_${i + 1}">#${i + 1} Size</label>
            <select id="size${index + 1}_${i + 1}">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div>
            <label for="color${index + 1}_${i + 1}">#${i + 1} Color</label>
            <select id="color${index + 1}_${i + 1}">
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
          </div>
        </div>
      `;
  }

  const card = document.createElement("article");
  card.className = `option`;
  card.innerHTML = `
      <input type="radio" id="unit${index + 1}" name="unit" value="${
    index + 1
  }" />
      <label for="unit${index + 1}">
        <div>
          <div class="unit-details">
         ${(index + 1) == 2 ? (`<div  class="most-popular">MOST POPULAR</div>`) : ''}
            <div class="unit">
              <div class="radio-button">
                <input type="radio" id="option${index + 1}" />
              </div>
              <div class="product-info">
                <p>
                  <strong>${item.name}</strong>
                  <span class="discount">${item.percentageOff}% Off</span>
                </p>
                <p class="subtext">${item.subName || ""}</p>
              </div>
            </div>
            <div class="pricing">
              <p class="price">$${item.price.toFixed(2)} USD</p>
              <span class="old-price">$${item.originalPrice.toFixed(
                2
              )} USD</span>
            </div>
          </div>
          <!-- Size and color content container -->
          <div class="dynamic-content" style="display: none;">
            ${sizeColorContent}
          </div>
        </div>
      </label>
    `;

  card.addEventListener("click", () => {

    selectedIndex = index;
    total = array[selectedIndex].price;
    if (footer) {
        footer.querySelector(".total").textContent = `Total: $${total.toFixed(2)} USD`;
      }
    const allDynamicContents = document.querySelectorAll(".dynamic-content");
    allDynamicContents.forEach((content) => (content.style.display = "none"));

    const dynamicContent = card.querySelector(".dynamic-content");
    dynamicContent.style.display = "block";
    updateCardClasses()

  });


  container.appendChild(card);
});






if (footer) {
  footer.innerHTML = `
  <div class='total-container'>
    <div class="free-delivery">Free Delivery</div>
    <div class="total">Total: $${total} USD</div>
    </div>
    <button type="submit" class="add-to-cart">+ Add to Cart</button>
  `;
}

