// Shopping Cart
let cart = {};
let totalProducts = 0;

function goToHomePage() {
    // Thay đổi URL để điều hướng về trang chủ
    window.location.href = "index_logged.html";
}

function goToLoginPage() {
    window.location.href = "Login.html";
}

function goToCartPage() {
    window.location.href = "CartPage.html";
}

function goToCartPageYesBtn() {
    alert("Sản phẩm đã được xóa thành công.")
    setTimeout(goToCartPage, 50);
    window.location.href = "CartPage.html";
}

function goToCartPageNoBtn() {
    window.location.href = "CartPage.html";
}

function toggleMenu() {
    const sidebarMenu = document.getElementById("sidebarMenu");
  
    // Kiểm tra vị trí hiện tại của sidebarMenu
    if (sidebarMenu.style.left === "0px") {
      // Nếu đang hiển thị, ẩn đi bằng cách di chuyển nó ra ngoài màn hình
      sidebarMenu.style.left = "-300px";
    } else {
      // Nếu đang ẩn, hiển thị bằng cách di chuyển nó vào trong màn hình
      sidebarMenu.style.left = "0px";
    }
}

function openSearchAdvanced() {
    document.getElementById("advanced-search").style.display = "block";
    document.getElementById("advanced-search-overlay").style.display = "block";
  }
  
  function closeSearchAdvanced() {
    document.getElementById("advanced-search").style.display = "none";
    document.getElementById("advanced-search-overlay").style.display = "none";
  }

  //Open Search Mobile
function openSearchMb() {
    document.querySelector(".header-middle-left").style.display = "none";
    document.querySelector(".header-middle-center").style.display = "block";
    document.querySelector(".header-middle-right-item.close").style.display =
      "block";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for (let i = 0; i < liItem.length; i++) {
      liItem[i].style.setProperty("display", "none", "important");
    }
  }
  
  //Close Search Mobile
  function closeSearchMb() {
    document.querySelector(".header-middle-left").style.display = "block";
    document.querySelector(".header-middle-center").style.display = "none";
    document.querySelector(".header-middle-right-item.close").style.display =
      "none";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for (let i = 0; i < liItem.length; i++) {
      liItem[i].style.setProperty("display", "block", "important");
    }
  }

// Add products into cart
function addToCart(productID) {
    if (cart[productID]) {
        cart[productID]++;
    } else {
        cart[productID] = 1;
    }
    updateCartCount();
}

// Decrease products in cart
function removeFromCart(productID) {
    if (cart[productID]) {
        cart[productID]--;
        if (cart[productID] === 0) {
            delete cart[productID];
        }
        updateCartCount();
    }
}

// Update products quantity
function updateCartCount() {
    let totalItems = 0;
    for (let productID in cart) {
        totalItems += cart[productID];
    }
    let cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = ` (${totalItems})`;
}

// Select & not select all products
function toggleAllProducts() {
    let checkboxes = document.getElementsByName('product-checkbox');
    let isChecked = document.getElementById('select-all').checked;

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = isChecked;
        if (isChecked) {
            addToCart(checkboxes[i].value);
        } else {
            removeFromCart(checkboxes[i].value);
        }
    }

    updateCartCount();
    updateCartCountDisplay(); // Cập nhật số lượng trong cart-count
}

// Increase & Decrease & Delete & Checkout buttons
document.addEventListener('DOMContentLoaded', function () {
    let decreaseButtons = document.querySelectorAll('.minus-button');
    let increaseButtons = document.querySelectorAll('.add-button');
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="product-checkbox"]');
    let selectAllCheckbox = document.querySelector('input[type="checkbox"][id="select-all"]');
    let checkoutButton = document.querySelector('.checkout-btn');
    let totalPriceElement = document.querySelector('.value');
    let totalProductsElement = document.querySelector('.total-products');
    let cartCountElement = document.getElementById('cart-count'); // Thêm phần tử cart-count

    let totalPrice = 0;
    let totalProducts = 0;

    // Initial calculation
    updateTotalAmount();

    decreaseButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let productId = this.dataset.productId;
            decreaseProductQuantity(productId);
        });
    });

    increaseButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let productId = this.dataset.productId;
            increaseProductQuantity(productId);
        });
    });

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            updateTotalAmount();
            updateCartCountDisplay(); // Cập nhật số lượng trong cart-count
        });
    });

    // Event listener cho checkbox "Sản phẩm"
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function () {
            toggleSelectAllProducts(this.checked);
            updateTotalAmount();
            updateCartCountDisplay(); // Cập nhật số lượng trong cart-count
        });
    }

    checkoutButton.addEventListener('click', function () {
        window.location.href = `CheckoutPage.html?total=${totalPrice}`;
    });

    function updateTotalAmount() {
        totalPrice = 0;
        totalProducts = 0;

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                let productRow = checkbox.closest('tr');
                let quantityInput = productRow.querySelector('.product-quantity');
                let quantity = parseInt(quantityInput.value);

                let priceText = productRow.querySelector('.price').textContent.replace(/[^0-9]/g, '');
                let unitPrice = parseInt(priceText);

                totalPrice += unitPrice * quantity;
                totalProducts += quantity;
            }
        });

        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
        }

        if (totalProductsElement) {
            totalProductsElement.textContent = totalProducts;
        }
    }

    function updateCartCountDisplay() {
        let selectedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        cartCountElement.textContent = `(${selectedCount})`; // Thêm dấu ngoặc đơn cho số lượng sản phẩm đã chọn
    }

    function decreaseProductQuantity(productId) {
        let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotalAmount();
        }
    }

    function increaseProductQuantity(productId) {
        let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
        updateTotalAmount();
    }

    // Hàm chọn hoặc bỏ chọn tất cả sản phẩm
    function toggleSelectAllProducts(isChecked) {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    }

    // Hàm cập nhật giỏ hàng trong localStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Hàm hiển thị giỏ hàng khi tải lại trang
    function displayCart() {
        Object.keys(cart).forEach(productId => {
            let product = cart[productId];
            let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
            if (quantityInput) {
                quantityInput.value = product.quantity;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let deleteButtons = document.querySelectorAll('.deleteButton');
    let deletePopover = document.getElementById('delete-confirmation');
    let overlay = document.querySelector('.overlay');

    // Show popover and overlay when clicking delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            deletePopover.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    // Close the popover and overlay if clicking outside the popover (on the overlay)
    overlay.addEventListener('click', function () {
        deletePopover.style.display = 'none';
        overlay.style.display = 'none';
    });
});

// Select-all checkbox
document.getElementById('select-all').addEventListener('change', toggleAllProducts);

// Example use
document.getElementById('select-all').addEventListener('change', toggleAllProducts);
let productCheckboxes = document.getElementsByName('product-checkbox');
for (let i = 0; i < productCheckboxes.length; i++) {
    productCheckboxes[i].addEventListener('change', function() {
        let productID = this.value;
        if (this.checked) {
            addToCart(productID);
        } else {
            removeFromCart(productID);
        }
        updateCartCount();
    });
}