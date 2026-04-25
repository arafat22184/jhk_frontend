const productContainer = document.getElementById("productContainer");
const select = document.getElementById("select");
const total = document.getElementById("total");
const noProduct = document.getElementById("noProduct");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
let isLoading = true;

const fetchProducts = (selectedValue) => {
  isLoading = true;
  loading.style.display = "flex";

  fetch("https://in-a5-server.vercel.app/products")
    .then((res) => res.json())
    .then((data) => {
      if (selectedValue) {
        if (selectedValue === "All") {
          displayProducts(data);
          isLoading = false;
          loading.style.display = "none";
          return;
        }
        const filteredData = data.filter(
          (product) => product.category === selectedValue,
        );

        displayProducts(filteredData);
        isLoading = false;
        loading.style.display = "none";
        return;
      }
      displayProducts(data);
      isLoading = false;
      loading.style.display = "none";
    });
};

const displayProducts = (products) => {
  productContainer.innerHTML = "";
  noProduct.style.display = "none";
  total.innerText = `Total: ${products.length}`;

  if (products.length === 0) {
    noProduct.style.display = "block";
  }

  products.forEach((product) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div
            class="bg-white drop-shadow-lg p-4 rounded-xl border-t-2 ${product.category === "Men" ? "border-[#4F46E5]" : product.category === "Women" ? "border-[#FF33EA]" : "border-orange-400"}"
          >
            <img
              src=${product.img}
              alt=${product.title}
              class="rounded-xl h-46 w-full object-cover"
            />

            <div class="space-y-2 my-3">
              <p class="font-medium">${product.title}</p>
              <p
                class="px-3 py-0.5 w-fit rounded-xl ${product.category === "Men" ? "bg-[#4F46E5]/20 text-[#4F46E5] " : product.category === "Women" ? "bg-[#FF33EA]/20 text-[#FF33EA]" : "bg-orange-400/20 text-orange-400"}"
              >
                ${product.category}
              </p>
              <p class="text-[#4F46E5]">$${product.price}</p>
            </div>

            <button onclick="document.getElementById('${product._id}').showModal()" class="bg-[#4F46E5] text-white py-2 w-full rounded-xl">
              View Details
            </button>
          </div>

          
<dialog id="${product._id}" class="modal">
  <div class="max-w-2xl bg-white flex p-0 drop-shadow-sm rounded-2xl">

  <div class="flex-1 rounded-2xl">
  
  <img class="rounded-l-2xl w-full h-full object-cover" src="${product.img}"/>
  </div>

    <div class="flex-1 bg-white rounded-2xl space-y-3 p-8">
    <p
                class="px-3 py-0.5 w-fit rounded-xl ${product.category === "Men" ? "bg-[#4F46E5]/20 text-[#4F46E5] " : product.category === "Women" ? "bg-[#FF33EA]/20 text-[#FF33EA]" : "bg-orange-400/20 text-orange-400"}"
              >
                ${product.category}
              </p>

              <p class="font-medium">${product.title}</p>

              <p class="text-gray-500">${product.description}</p>
 <p class="text-[#4F46E5]">$${product.price}</p>

      <form method="dialog">
        <button class="btn bg-[#4F46E5] text-white">Add To Cart</button>
      </form>
    
    </div>  


   
  </div>
</dialog>
    `;
    productContainer.appendChild(card);
  });
};

select.addEventListener("change", (e) => {
  e.preventDefault();

  const selectedValue = e.target.value;

  fetchProducts(selectedValue);
});

const handleSearch = (searchValue) => {
  fetch(`https://in-a5-server.vercel.app/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;

  handleSearch(searchInput);
});

fetchProducts();
