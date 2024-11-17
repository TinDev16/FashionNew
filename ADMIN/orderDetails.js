function showOrderDetails(orderId) {
    // Thông tin chi tiết cho các đơn hàng
    const orderDetails = {
        "22010124111": {
            tg: "09/11/2024 - 14:30",
            customerName: "Nguyễn Văn An",
            customerPhone: "095463448",
            receiverName: "Nguyễn Văn An",
            receiverPhone: "095463448",
            receiverAddress: "62, Bình Long, Quận Bình Tân, TP.HCM",
            notes: "Không",
            product: "Áo Thun Nam Trơn Strength Contour Form Regular",
            mv: 15364,
            productQuantity: 2,
            productPrice: 200000,
            totalPrice: 400000,
            paymentMethod: "MOMO",
            payment: 400000,
            paymentAmount: 400000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 400000,
            amountdue: 400000,
        },
        "22050124171": {
            tg: "10/11/2024 - 14:30",
            customerName: "Lê Văn Bình",
            customerPhone: "096789106",
            receiverName: "Lê Văn Bình",
            receiverPhone: "096789106",
            receiverAddress: "56,Hàm Nghi,Quận 1, TP.HCM",
            notes: "Nếu không có người nhận, xin để hàng tại cửa và gửi ảnh xác nhận.",
            product: "Áo Polo Nam Họa Tiết Pattern Typography Form Regular",
            mv:14953,
            productQuantity: 3,
            productPrice: 200000,
            totalPrice: 600000,
            paymentMethod: "Tiền mặt",
            payment: 600000,
            paymentAmount: 600000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 600000,
            amountdue: 600000,
        },
        "28359124178": {
            tg: "15/11/2024 - 17:00",
            customerName: "Lê Lợi",
            customerPhone: "0987073458",
            receiverName: "Lê Lợi",
            receiverPhone: "0987073458",
            receiverAddress: "65,Hồng Bàng,Quận 5, TP.HCM",
            notes: "Gọi trước 30 phút trước khi giao để đảm bảo có người nhận.",
            product: "Nón Nam Lưỡi Trai High-crown The Spiritual Kingdom Of Fashion",
            mv:14359,
            productQuantity: 1,
            productPrice: 200000,
            totalPrice: 200000,
            paymentMethod: "VNPayQR",
            payment: 200000,
            paymentAmount: 200000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 200000,
            amountdue: 200000,
        },
    };


    // Lấy chi tiết đơn hàng từ object
    const order = orderDetails[orderId];
    if (order) {
        const orderDetailsHTML = `
            <div class="row">
        <div class="col-lg-8">
            <div class="d-flex justify-content-between align-items-center bg-body-tertiary p-4 rounded">
                <div>
                    <p>
                        <b class="text-dark">Đơn Hàng: </b>
                        <span class="fs-6 text-primary" id="order-id">${orderId}</span>
                    </p>
                    <p class="text-dark">
                        <span id="order-date">${order.tg}</span> |
                        <span class="text-secondary">NV tư vấn:</span> Admin - admin@gmail.com
                    </p>
                </div>
         <button class="btn text-white fw-bold p-2 rounded-pill" style="width: 200px; background-color: #007bff; border: none; text-align: center;" id="status-button">
    Chưa xử lý
</button>
            </div>

            <div class="row" style="margin-top: 20px">
                <div class="col-lg-6">
                    <div class="card" style="width: 100%; height: 100%">
                        <div class="card-header">Khách Hàng</div>
                        <div class="card-body">
                            <p class="text-black" id="customer-name">${order.customerName }</p>
                            <p class="text-secondary" id="customer-phone">${order.customerPhone}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card" style="width: 100%">
                        <div class="card-header">Người nhận</div>
                        <div class="card-body">
                            <p class="text-black" id="receiver-name">${order.receiverName}</p>
                            <p class="text-secondary" id="receiver-phone">${order.receiverPhone}</p>
                            <p class="text-secondary" id="receiver-address">${order.receiverAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- New row for the notes section -->
<div class="row" style="margin-top: 20px">
    <div class="col-lg-12">
        <div class="card" style="width: 100%">
            <div class="card-header">Ghi Chú</div>
            <div class="card-body">
                <p class="text-secondary" id="order-notes">${order.notes}</p>
            </div>
        </div>
    </div>
</div>

            <div style="margin-top: 20px">
                <table class="table border" style="width: 100%">
                    <thead>
                        <tr class="bg-secondary">
                            <th scope="col">Tên Sản phẩm</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Đơn Giá</th>
                            <th scope="col">Tổng Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                ${order.product}
                                <p class="text-secondary">Mã vạch:${order.mv}</p>
                            </th>
                            <td id="product-quantity">${order.productQuantity}</td>
                            <td id="product-price">${order.productPrice.toLocaleString()}</td>
                            <td id="product-total">${order.totalPrice.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-lg-4">
            <div>
                <div class="card" style="width: 100%; height: 100%">
                    <div class="card-header">Phương Thức Thanh Toán</div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="text-black">${order.paymentMethod}:</p>
                            <p class="fw-bold fs-4 text-black" id="payment-cash">${order.payment.toLocaleString()}</p>
                        </div>
                      
                    </div>
                </div>
            </div>

            <div class="border p-2" style="margin-top: 20px">
                <div class="d-flex justify-content-between">
                    <p class="text-black">Tạm tính:</p>
                    <p class="fw-bold fs-4 text-black" id="subtotal">${order.paymentAmount.toLocaleString()}</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="text-black">Khuyến mãi:</p>
                    <p class="fw-bold fs-5 text-primary" id="promotion">${order.promotion.toLocaleString()}</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="text-black">Phí vận chuyển:</p>
                    <p class="text-primary fw-bold fs-6" id="shipping-fee">${order.shippingFee}</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="text-black">Thành tiền:</p>
                    <p class="fw-bold fs-5 text-black" id="total">${order.total.toLocaleString()}</p>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                    <p class="fw-bold fs-4 text-black">Cần thanh toán:</p>
                    <p class="fw-bold fs-3 text-primary" id="amount-due">${order.amountdue.toLocaleString()}</p>
                </div>
            </div>

            <button type="button" class="btn btn-primary p-4 fs-4" style="width: 100%; margin-top: 20px" onclick="window.location.href='./orderManagement.html';">
                Đóng
            </button>
        </div>
    </div>
</div>
</div>
        `;

        // Chèn HTML vào phần tử hiển thị chi tiết đơn hàng
        document.getElementById('order-details-container').innerHTML = orderDetailsHTML;
    }
}
// Thử gọi hàm với một orderId hợp lệ
showOrderDetails("22010124111");
showOrderDetails("22050124171");  // Hoặc bất kỳ orderId nào từ dữ liệu của bạn
showOrderDetails("28359124178");
document.addEventListener('DOMContentLoaded', function() {
    const statuses = [
        { text: "Chưa xử lý", value: "chua_xu_ly" },
        { text: "Đã xác nhận", value: "da_xac_nhan" },
        { text: "Giao thành công", value: "giao_thanh_cong" },
        { text: "Đã hủy", value: "da_huy" }
    ];

    let currentIndex = 0;  // Vị trí của trạng thái hiện tại

    // Lấy orderId từ URL để xác định trạng thái khởi tạo
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    
    // Xác định trạng thái khởi đầu dựa trên orderId
    if (orderId === '22010124111') {
        currentIndex = 2; // "Giao thành công"
    } else if (orderId === '22050124171') {
        currentIndex = 1; // "Đã xác nhận"
    } else if (orderId === '28359124178') {
        currentIndex = 3; // "Đã hủy"
    } else {
        currentIndex = 0; // Mặc định "Chưa xử lý"
    }

    // Cập nhật nút khi trang được tải
    updateButton();

    // Thêm sự kiện click vào nút để thay đổi trạng thái (chỉ thay đổi trong phiên)
    document.getElementById('status-button').addEventListener('click', function() {
        console.log("Button clicked!");  // Xem sự kiện click có được kích hoạt
        currentIndex = (currentIndex + 1) % statuses.length;  // Chuyển sang trạng thái tiếp theo
        updateButton();
    });

    // Hàm cập nhật văn bản và giá trị cho nút
    function updateButton() {
        const statusButton = document.getElementById('status-button');
        if (statusButton) {
            statusButton.textContent = statuses[currentIndex].text;
            statusButton.setAttribute('data-value', statuses[currentIndex].value);
        }
    }
});
