// Shopping Cart
let cart = {};
let totalPrice = 0;
let totalProducts = 0;

function goToHomePage() {
    // Thay đổi URL để điều hướng về trang chủ
    window.location.href = "index_home.html";
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
}

// Increase & Decrease & Delete & Checkout buttons
document.addEventListener('DOMContentLoaded', function () {
    let decreaseButtons = document.querySelectorAll('.minus-button');
    let increaseButtons = document.querySelectorAll('.add-button');
    let deleteButtons = document.querySelectorAll('.deleteButton');
    let checkoutButton = document.querySelector('.checkout-btn');

    // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa tồn tại
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Hiển thị giỏ hàng trên giao diện
    displayCart();

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

    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let productId = this.dataset.productId;
            deleteFromCart(productId);
        });
    });

    checkoutButton.addEventListener('click', function () {
        window.location.href = `CheckoutPage.html`;
    });

    function decreaseProductQuantity(productId) {
        let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            cart[productId].quantity = quantity;
            updateCart();
            updateProductTotalPrice(productId);
        } else {
            deleteFromCart(productId);
        }
    }

    function increaseProductQuantity(productId) {
        let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
        cart[productId].quantity = quantity;
        updateCart();
        updateProductTotalPrice(productId);
    }

    function updateProductTotalPrice(productId) {
        let productRow = document.querySelector(`input[data-product-id="${productId}"]`).closest('tr');
        let quantityInput = productRow.querySelector('.product-quantity');
        let quantity = parseInt(quantityInput.value);

        let unitPriceText = productRow.querySelector('.price').textContent.replace(/[^0-9]/g, '');
        let unitPrice = parseInt(unitPriceText);

        let totalPriceElement = productRow.querySelectorAll('.price')[1];
        totalPriceElement.textContent = `${(unitPrice * quantity).toLocaleString()}đ`;
    }

    function deleteFromCart(productId) {
        // Xóa sản phẩm khỏi giỏ hàng trong localStorage và cập nhật giao diện
        delete cart[productId];
        updateCart();

        let productRow = document.querySelector(`input[data-product-id="${productId}"]`).closest('tr');
        productRow.remove();
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
                updateProductTotalPrice(productId);
            }
        });
    }
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