// Shopping Cart
let cart = {};

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

// Delete products from cart
function deleteFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId]; // Xóa sản phẩm khỏi giỏ hàng
        updateCartCount(); // Cập nhật số lượng sản phẩm trong giỏ hàng

        // Xóa sản phẩm khỏi giao diện
        let productRow = document.querySelector(`button[data-product-id="${productId}"]`).closest('tr');
        if (productRow) {
            productRow.remove(); // Xóa hàng sản phẩm khỏi bảng
        }
    }
    updateTotalAmount();
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
document.addEventListener('DOMContentLoaded', function() {
    let decreaseButtons = document.querySelectorAll('.minus-button');
    let increaseButtons = document.querySelectorAll('.add-button');
    let deleteButtons = document.querySelectorAll('.deleteButton');
    let checkboxes = document.querySelectorAll('.product-checkbox');
    let checkoutButton = document.querySelector('.checkout-btn');

    let totalPriceElement = document.querySelector('.value');
    let totalProductsElement = document.querySelector('.total-products');

    let totalPrice = 0;
    let totalProducts = 0;

    updateTotalAmount();

    decreaseButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let productId = this.dataset.productId;
            decreaseProductQuantity(productId);
            updateTotalAmount();
        });
    });
    
    increaseButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let productId = this.dataset.productId;
            increaseProductQuantity(productId);
            updateTotalAmount();
        });
    });
    
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let productId = this.dataset.productId;
            deleteFromCart(productId);
            updateTotalAmount();
        });
    });
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateTotalAmount();
        });
    });

    checkoutButton.addEventListener('click', function() {
        // Chuyển sang trang thanh toán
        window.location.href = `CheckoutPage.html?total=${totalPrice}`;
    });

    function updateTotalAmount() {
        totalPrice = 0;
        totalProducts = 0;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                let productId = checkbox.dataset.productId;
                let priceElement = document.querySelector(`span[data-product-id="${productId}"]`);
                if (priceElement) {
                    let priceText = priceElement.textContent.replace(/[^0-9]/g, '');
                    let price = parseInt(priceText);
                    totalPrice += price;
                    totalProducts++;
                }
            }
        });
    
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice.toLocaleString()}đ`;
        }
    
        if (totalProductsElement) {
            totalProductsElement.textContent = totalProducts;
        }
    }

});

// Decrease products quantity
function decreaseProductQuantity(productId) {
    let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    let quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotalPrice(productId, 21000, quantity); // Cập nhật giá tiền
        updateTotalAmount();
    } else {
        deleteFromCart(productId);
    }
}

// Decrease products quantity
function decreaseProductQuantity(productId) {
    let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    let quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotalPrice(productId, 21000, quantity); // Cập nhật giá tiền
        updateTotalAmount();
    } else {
        deleteFromCart(productId);
    }
}

// Increase products quantity
function increaseProductQuantity(productId) {
    let quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice(productId, 21000, quantity); // Cập nhật giá tiền
    updateTotalAmount();
}

// Update total price
function updateTotalPrice(productId, price, quantity) {
    let priceElement = document.querySelector(`span[data-product-id="${productId}"]`);
    let totalPrice = price * quantity;
    priceElement.textContent = `${totalPrice.toLocaleString()}đ`;
}

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