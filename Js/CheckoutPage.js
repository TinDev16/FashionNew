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

// Payment buttons
const paymentButtons = document.querySelectorAll('.payment-button');
let currentActiveButton = null; // Track the currently active button
let previousButtonState = {}; // Track previous state of buttons

// Initialize button states
paymentButtons.forEach(button => {
    // Store initial state
    previousButtonState[button.id] = {
        active: button.classList.contains('active'),
        hover: false // Start with no hover state
    };

    button.addEventListener('click', () => {
        // Check if the clicked button is already active
        if (currentActiveButton === button) {
            // Restore previous state
            button.classList.remove('active');
            if (previousButtonState[button.id].hover) {
                button.classList.add('hover'); // Restore hover state if it was hovered before
            } else {
                button.classList.remove('hover'); // Ensure hover state is removed
            }
            currentActiveButton = null; // Reset the currently active button
        } else {
            // Remove the "active" class from all buttons
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add the "active" class to the clicked button
            button.classList.add('active');
            currentActiveButton = button; // Store the currently active button
        }
    });

    button.addEventListener('mouseenter', () => {
        button.classList.add('hover'); // Add hover class on mouse enter
        previousButtonState[button.id].hover = true; // Update hover state
    });

    button.addEventListener('mouseleave', () => {
        if (currentActiveButton !== button) {
            button.classList.remove('hover'); // Remove hover class on mouse leave if not active
            previousButtonState[button.id].hover = false; // Update hover state
        }
    });
});

// Close popover when clicking outside of it
document.addEventListener('click', (event) => {
    if (currentActiveButton && !currentActiveButton.contains(event.target)) {
        currentActiveButton.classList.remove('active'); // Reset the active state of the previously selected button
        currentActiveButton.classList.remove('hover'); // Remove hover state
        // Restore previous state if needed
        if (previousButtonState[currentActiveButton.id].active) {
            currentActiveButton.classList.add('active'); // Restore active state
        } else {
            currentActiveButton.classList.remove('active'); // Ensure it's inactive
        }
        currentActiveButton = null; // Reset the currently active button
    }
});