document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });

    function slideImage() {
        const displayWidth = document.querySelector('.img-display').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);

    // Cart functionality
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const viewCartBtn = document.querySelector('.view-cart');
    const closeModal = document.querySelector('.close');
    const notification = document.getElementById('notification'); // Thông báo
    let cart = [];

    addToCartBtn.addEventListener('click', () => {
        const productTitle = document.querySelector('.product-title').innerText;
        const productPrice = parseFloat(document.querySelector('.new-price span').innerText.replace('₫', '').replace(/\./g, ''));
        const quantity = parseInt(document.getElementById('quantity').value);

        const product = {
            title: productTitle,
            price: productPrice,
            quantity: quantity
        };

        cart.push(product);
        updateCart();

        // Hiển thị thông báo
        notification.innerText = "Đã thêm vào giỏ hàng thành công!";
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none"; // Ẩn thông báo sau 3 giây
        }, 3000);
    });

    viewCartBtn.addEventListener('click', () => {
        window.location.href = "CartPage.html"; // Chuyển đến trang giỏ hàng
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerText = `${item.title} - ₫${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Tổng cộng: ₫${total.toFixed(2)}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const notification = document.getElementById('notification');

    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        if (quantity > 0) {
            notification.innerText = "Đã thêm vào giỏ hàng thành công";
            notification.style.display = "block";
            setTimeout(() => {
                notification.style.display = "none";
            }, 3000); // Ẩn thông báo sau 3 giây
        } else {
            alert("Vui lòng chọn số lượng hợp lệ.");
        }
    });
});



function goToHomePage() {
    // Thay đổi URL để điều hướng về trang chủ
    window.location.href = "index.html";
}

function goToLoginPage() {
    window.location.href = "Login.html";
}

function goToCartPage() {
    window.location.href = "CartPage.html";
}
