const orders = [
    { id: "aothun1", customer: "Nguyễn Văn An", address: "Số 12, Đường An Dương Vương, Quận Bình Tân", time: "2024-10-01", status: "Chưa xử lý", productType: "Áo thun" },
    { id: "polo2", customer: "Trần Thị Bình", address: "Số 34/12, Đường Bình Long, Quận Tân Phú", time: "2024-10-02", status: "Đã xác nhận", productType: "Áo Polo" },
    { id: "somi4", customer: "Lê Văn Chiến", address: "Số 73, Đường Bà Huyện Thanh Quan, Quận 3", time: "2024-10-03", status: "Đã giao", productType: "Áo Sơ Mi" },
    { id: "non3", customer: "Phạm Thị Dung", address: "Số 27, Đường Hồng Bàng, Quận 6", time: "2024-10-04", status: "Đã hủy", productType: "Mũ" },
];

// Danh sách các trạng thái bằng tiếng Việt
const statuses = ["Chưa xử lý", "Đã xác nhận", "Đã giao", "Đã hủy"];

// Biến để lưu trữ trạng thái lọc
let filterCriteria = {
    startDate: '',
    endDate: '',
    productType: '',
    sortAddress: ''
};

// Khởi tạo filteredOrders để chứa tất cả các đơn hàng ban đầu
let filteredOrders = [...orders];

function renderOrders(orderList) {
    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = ''; // Xóa nội dung bảng trước khi thêm

    if (orderList.length === 0) {
        // Hiển thị thông báo nếu không có dữ liệu
        orderTable.innerHTML = '<tr><td colspan="7" style="text-align:center;">Không có dữ liệu</td></tr>';
        return;
    }

    orderList.forEach(order => {
        const row = `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.address}</td>
            <td>${order.time}</td>
            <td class="order-status" onclick="changeStatus('${order.id}')">${order.status}</td>
            <td>${order.productType}</td>
            <td><a href="#" class="btn btn-info">Xem chi tiết</a></td>
        </tr>`;
        orderTable.innerHTML += row;
    });
}

// Lọc đơn hàng dựa trên loại sản phẩm, thời gian, và quận
function filterOrders() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const productType = document.getElementById('productType').value;
    const sortAddress = document.getElementById('sortAddress').value;

    // Cập nhật trạng thái lọc
    filterCriteria.startDate = startDate;
    filterCriteria.endDate = endDate;
    filterCriteria.productType = productType;
    filterCriteria.sortAddress = sortAddress;

    // Lọc đơn hàng
    filteredOrders = orders.filter(order => {
        const matchesDate = (!filterCriteria.startDate || new Date(order.time) >= new Date(filterCriteria.startDate)) &&
                            (!filterCriteria.endDate || new Date(order.time) <= new Date(filterCriteria.endDate));
        const matchesProductType = !filterCriteria.productType || order.productType === filterCriteria.productType;
        const matchesAddress = !filterCriteria.sortAddress || order.address.includes(filterCriteria.sortAddress); // Thêm điều kiện lọc quận

        return matchesDate && matchesProductType && matchesAddress; // Sử dụng tất cả các tiêu chí lọc
    });

    renderOrders(filteredOrders);
}

// Thay đổi trạng thái đơn hàng khi nhấn vào tình trạng
function changeStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const currentIndex = statuses.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statuses.length; // Chuyển đến trạng thái tiếp theo
        order.status = statuses[nextIndex];

        // Gọi lại hàm renderOrders với danh sách đã lọc
        renderOrders(filteredOrders);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    sidebar.classList.toggle('hidden'); // Ẩn/hiện sidebar
    content.style.marginLeft = sidebar.classList.contains('hidden') ? '0' : '260px'; // Căn chỉnh nội dung
}

// Hiển thị đơn hàng khi tải trang
renderOrders(filteredOrders); // Hiển thị tất cả các đơn hàng ban đầu
// Thông tin người dùng (bạn có thể thay thế bằng dữ liệu thực tế từ server)
const userInfo = {
    name: "Admin",  // Tên người dùng
    role: "Quản trị viên"   // Vai trò của người dùng
};

// Hàm hiển thị thông tin người dùng
function displayUserInfo() {
    document.getElementById("userName").textContent = userInfo.name;
    document.getElementById("userRole").textContent = userInfo.role;
}

// Gọi hàm hiển thị thông tin khi tải trang
displayUserInfo();
function openMail() {
    alert("Mở hộp thư đến!");
    // Thực hiện các hành động khác liên quan đến mail
}

function openNotifications() {
    alert("Mở thông báo!");
    // Thực hiện các hành động khác liên quan đến thông báo
}