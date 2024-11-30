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
            product1: "Áo Thun Nam Trơn Strength Contour Form Regular",
            productQuantity1: 2,
            productPrice1: 200000,
            totalPrice1: 400000,
            product2: "Áo Sơ Mi Cuban Vải Xốp Nam Tay Ngắn Modern Vibe Form Relaxed",
            productQuantity2: 1,
            productPrice2: 200000,
            totalPrice2: 200000,
            paymentMethod: "Thẻ tín dụng/Ghi nợ",
            payment: 600000,
            paymentAmount: 600000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 600000,
            amountdue: 600000,
        },
        "22050124171": {
            tg: "10/11/2024 - 14:30",
            customerName: "Lê Văn Bình",
            customerPhone: "096789106",
            receiverName: "Lê Văn Bình",
            receiverPhone: "096789106",
            receiverAddress: "56,Hàm Nghi,Quận 1, TP.HCM",
            notes: "Nếu không có người nhận, xin để hàng tại cửa và gửi ảnh xác nhận.",
            product1: "Áo Polo Nam Họa Tiết Pattern Typography Form Regular",
            productQuantity1: 2,
            productPrice1: 200000,
            totalPrice1: 400000,
            product2: "Áo Sơ Mi Cuban Vải Xốp Nam Tay Ngắn Modern Vibe Form Relaxed",
            productQuantity2: 3,
            productPrice2: 200000,
            totalPrice2: 600000,
            paymentMethod: "Tiền mặt",
            payment: 1000000,
            paymentAmount: 1000000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 1000000,
            amountdue: 1000000,
        },
        "28359124178": {
            tg: "15/11/2024 - 17:00",
            customerName: "Nguyễn Văn A",
            customerPhone: "0987073458",
            receiverName: "Nguyễn Văn A",
            receiverPhone: "0987073458",
            receiverAddress: "65,Hồng Bàng,Quận 5, TP.HCM",
            notes: "Bạn check tin nhắn mình nhé, mình chưa nhắn!",
            product1: "Áo Thun Nam Trơn Strength Contour Form Regular",
            productQuantity1: 2,
            productPrice1: 200000,
            totalPrice1: 400000,
            product2: "Quần Short Nỉ Nam Đánh Bông Quai Túi Form Regular",
            productQuantity2: 1,
            productPrice2: 200000,
            totalPrice2: 200000,
            paymentMethod: "VNPayQR",
            payment: 600000,
            paymentAmount: 600000,
            promotion: 0,
            shippingFee: "Miễn phí",
            total: 600000,
            amountdue: 600000,
        },
    };


    // Lấy chi tiết đơn hàng từ object
    const order = orderDetails[orderId];
    if (order) {
        const orderDetailsHTML = `
 <div class="order-info1">
                <div class="order-details">
                    <p><strong>Đơn Hàng:</strong> ${orderId}</p>
                    <p>${order.tg}</p>
                </div>
                
           
               <div class="dropdn-container">
<div id="status-select">  
    <div class="dropdown-button" style="text-align:center;">Giao thành công</div>  
</div>
                </div>    
                </div>      
            
            <div class="customer-info1">
                <div class="box1">
                    <p><strong>Khách Hàng</strong></p>
                    <p>${order.customerName}</p>
                    <p>${order.customerPhone}</p>
                </div>
                <div class="box1">
                    <p><strong>Người nhận</strong></p>
                    <p>${order.receiverName}</p>
                    <p>${order.receiverPhone}</p>
                    <p>${order.receiverAddress}</p>
                </div>
            </div>
            <div class="product-info1">
                <table>
                    <thead>
                        <tr>
                            <th>Tên Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn Giá</th>
                            <th>Tổng Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${order.product1}<br><small></small></td>
                            <td>${order.productQuantity1}</td>
                            <td>${order.productPrice1.toLocaleString()}</td>
                            <td>${order.totalPrice1.toLocaleString()}</td>
                        </tr>
                   
                        <tr>
                            <td>${order.product2}<br><small></small></td>
                            <td>${order.productQuantity2}</td>
                            <td>${order.productPrice2.toLocaleString()}</td>
                            <td>${order.totalPrice2.toLocaleString()}</td>
                        </tr>
                  
                    </tbody> 
                </table>
            </div>
            <div class="note1">
                <p><strong>Ghi Chú</strong></p>
                <p>${order.notes}</p>
            </div>
            
            <div class="payment-info1">
                <div class="box1">
                    <p><strong>Phương Thức Thanh Toán</strong></p>
                    <p>${order.paymentMethod}</p>
                    <p class="amount1">${order.payment.toLocaleString()}</p>
                </div>
                <div class="box1">
                    <p><strong>Tạm tính:</strong> ${order.paymentAmount.toLocaleString()}</p>
                    <p>Khuyến mãi: ${order.promotion}</p>
                    <p>Phí vận chuyển: ${order.shippingFee}</p>
                    <p><strong>Thành tiền:</strong> ${order.total.toLocaleString()}</p>
                    <p><strong>Cần thanh toán:</strong> <span class="amount1">${order.amountdue.toLocaleString()}</span></p>
                </div>
            </div>
            
           
            
            <button 
    type="button" 
    class="btn btn-primary p-4 fs-4 button-close1" 
    onclick="saveOrder();">
    Đóng
</button>




        `;

        // Chèn HTML vào phần tử hiển thị chi tiết đơn hàng
        document.getElementById('order-details-container').innerHTML = orderDetailsHTML;
    }
}
// Thử gọi hàm với một orderId hợp lệ
showOrderDetails("22010124111");
showOrderDetails("22050124171");  // Hoặc bất kỳ orderId nào từ dữ liệu của bạn
showOrderDetails("28359124178");

function saveOrder() {

	window.location.href = 'hoadonnguoidung.html';
}
