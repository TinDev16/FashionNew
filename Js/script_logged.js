// Mở/Đóng thanh tìm kiếm
document.getElementById("search-icon").addEventListener("click", function () {
  document.getElementById("search-box").style.display = "block";
});

document
  .getElementById("search-close-btn")
  .addEventListener("click", function () {
    document.getElementById("search-box").style.display = "none";
  });

// Giả lập dữ liệu sản phẩm (có thể thay thế bằng dữ liệu thực tế từ API hoặc backend)
const products = [
  {
    name: "Carrot Cardigan",
    price: "990 000 VND",
    image: "carrot_cardigan.png",
  },
  { name: "Heart Cardigan", price: "900 000 VND", image: "heart_cardigan.png" },
  {
    name: "Black Cartoon Cardigan",
    price: "900 000 VND",
    image: "black_cartoon_cardigan.png",
  },
  {
    name: "Dreamer Jacket",
    price: "1 200 000 VND",
    image: "dreamer_jacket.png",
  },
  {
    name: "Best Seller Hoodie",
    price: "850 000 VND",
    image: "best_seller_hoodie.png",
  },
  // Thêm nhiều sản phẩm vào đây để có dữ liệu phân trang
];

const itemsPerPage = 3; // Số sản phẩm trên mỗi trang
let currentPage = 1; // Trang hiện tại

function renderProducts() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  currentProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Hiển thị hình ảnh sản phẩm
    const imgElement = document.createElement("img");
    imgElement.src = product.image;
    imgElement.alt = product.name;

    // Hiển thị tên và giá sản phẩm
    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;

    const priceElement = document.createElement("p");
    priceElement.textContent = product.price;

    // Thêm các phần tử vào div sản phẩm
    productItem.appendChild(imgElement);
    productItem.appendChild(nameElement);
    productItem.appendChild(priceElement);

    productList.appendChild(productItem);
  });

  // Cập nhật thông tin phân trang
  document.getElementById(
    "page-info"
  ).textContent = `Trang ${currentPage} / ${Math.ceil(
    products.length / itemsPerPage
  )}`;

  // Vô hiệu hóa nút nếu ở trang đầu hoặc cuối
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled =
    currentPage === Math.ceil(products.length / itemsPerPage);
}

// Điều khiển nút "Trang trước" và "Trang sau"
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(products.length / itemsPerPage)) {
    currentPage++;
    renderProducts();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userLoggedIn = true; // Giả sử người dùng đã đăng nhập
  const userInfo = document.getElementById("user-info");
  const loginLink = document.getElementById("login-link");

  if (userLoggedIn) {
    userInfo.style.display = "flex"; // Hiển thị phần thông tin người dùng
    loginLink.style.display = "none"; // Ẩn icon user đăng nhập ban đầu
  } else {
    userInfo.style.display = "none"; // Ẩn thông tin người dùng nếu chưa đăng nhập
    loginLink.style.display = "block"; // Hiển thị icon user đăng nhập ban đầu
  }
});
