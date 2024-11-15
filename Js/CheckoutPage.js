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

function goToBillPage() {
  window.location.href = "BillPage.html";
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

// Delivery inputs & selects
const savedAddressSection = document.getElementById('saved-address-section');
const newAddressSection = document.getElementById('new-address-section');
const savedAddressRadio = document.getElementById('saved-address-account');
const newAddressRadio = document.getElementById('new-address');

// Ẩn các phần tử liên quan khi trang được tải
savedAddressSection.style.display = 'none';
newAddressSection.style.display = 'none';

function toggleAddressFields() {
    if (savedAddressRadio.checked) {
        savedAddressSection.style.display = 'block';
        newAddressSection.style.display = 'none';
    } else {
        savedAddressSection.style.display = 'none';
        newAddressSection.style.display = 'block';
    }
}

// Lắng nghe sự kiện 'change' trên các radio button
savedAddressRadio.addEventListener('change', toggleAddressFields);
newAddressRadio.addEventListener('change', toggleAddressFields);

// Khai báo các biến cần thiết 
let clickCount = 0; // Đếm số lần nhấn nút
let currentActiveButton = null; // Biến để lưu nút đang active
const paymentButtons = document.querySelectorAll('.card-button'); // Khai báo và khởi tạo paymentButtons
const previousButtonState = {}; // Lưu trạng thái nút trước đó

// Lặp qua tất cả các nút và thêm sự kiện click
paymentButtons.forEach(button => {
  button.addEventListener('click', () => {
    clickCount++; // Tăng số lần nhấn lên

    if (button === currentActiveButton) {
        // Nếu nút đã được kích hoạt
        if (clickCount === 2) {
            // Nếu nhấn hai lần, ẩn phần card-information
            const cardInfo = document.querySelector('.card-information');
            if (cardInfo) {
                cardInfo.style.display = 'none'; // Ẩn phần card-information
            }

            // Xóa trạng thái active và hover
            button.classList.remove('active'); // Xóa trạng thái active
            button.classList.remove('hover'); // Xóa trạng thái hover
            currentActiveButton = null; // Xóa tham chiếu đến nút active
            clickCount = 0; // Đặt lại đếm về 0
        } else {
            // Nếu chưa nhấn hai lần, thêm lớp hover
            button.classList.add('hover'); // Thêm lớp hover
            // Không cần xóa trạng thái active ở đây
        }
    } else {
        // Xóa lớp "active" và "hover" từ tất cả các nút
        paymentButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('hover'); // Xóa lớp hover từ các nút khác
            previousButtonState[btn.id].hover = false; // Cập nhật trạng thái hover
        });

        // Thêm lớp "active" và "hover" vào nút được nhấn
        button.classList.add('active');
        button.classList.add('hover'); // Thêm lớp hover cho nút được nhấn
        currentActiveButton = button; // Lưu nút đang active
        clickCount = 0; // Đặt lại đếm về 0 nếu nút khác được nhấn
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cardButton = document.getElementById('card-button');
  const codButton = document.getElementById('cod-button');
  const cardInformation = document.getElementById('card-information');
  const confirmButton = document.querySelector('.card-information-confirmation');

  // Hàm để hiển thị phần thông tin thẻ và lưu trạng thái vào localStorage
  function showCardInformation() {
    cardInformation.classList.add('show');
    localStorage.setItem('paymentMethod', 'card');
  }

  // Hàm để lưu trạng thái chọn "Thanh toán khi nhận hàng" vào localStorage
  function selectCodPayment() {
    localStorage.setItem('paymentMethod', 'cod');
  }

  // Sự kiện khi bấm vào nút "Thẻ Tín dụng/Ghi nợ"
  cardButton.addEventListener('click', () => {
    showCardInformation();
  });

  // Sự kiện khi bấm vào nút "Thanh toán khi nhận hàng"
  codButton.addEventListener('click', () => {
    cardInformation.classList.remove('show');
    selectCodPayment();
  });

  // Sự kiện khi bấm vào nút "Xác nhận"
  confirmButton.addEventListener('click', () => {
    showCardInformation();
  });

  // Kiểm tra trạng thái đã lưu trong localStorage khi tải trang
  const savedPaymentMethod = localStorage.getItem('paymentMethod');
});

