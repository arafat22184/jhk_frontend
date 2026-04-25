const productContainer = document.getElementById("productContainer");
const select = document.getElementById("select");
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

            <button class="bg-[#4F46E5] text-white py-2 w-full rounded-xl">
              View Details
            </button>
          </div>
    `;
    productContainer.appendChild(card);
  });
};

select.addEventListener("change", (e) => {
  e.preventDefault();

  const selectedValue = e.target.value;

  fetchProducts(selectedValue);
});

fetchProducts();
