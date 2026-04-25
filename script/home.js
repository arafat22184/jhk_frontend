const productContainer = document.getElementById("productContainer");
const loading = document.getElementById("loading");
let isLoading = true;

const fetchProducts = () => {
  isLoading = true;
  loading.style.display = "flex";
  fetch("https://in-a5-server.vercel.app/products")
    .then((res) => res.json())
    .then((data) => {
      displayProducts(data);
      isLoading = false;
      loading.style.display = "none";
    });
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div
            class="bg-white drop-shadow-lg p-4 rounded-xl border-t-2 border-[#4F46E5]"
          >
            <img
              src=${product.img}
              alt=${product.title}
              class="rounded-xl h-46 w-full object-cover"
            />

            <div class="space-y-2 my-3">
              <p class="font-medium">${product.title}</p>
              <p
                class="bg-[#4F46E5]/20 text-[#4F46E5] px-3 py-0.5 w-fit rounded-xl"
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

fetchProducts();
