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

// Payment options buttons
// DOM Elements
const codButton = document.getElementById('cod-button');
const cardButton = document.getElementById('card-button');
const cardInformation = document.getElementById('card-information');
const confirmationButton = document.querySelector('.card-information-confirmation');

// State variables
let isCardInfoVisible = false;

// Function to update button styles
function setActiveButton(button) {
    // Reset styles for all buttons
    codButton.classList.remove('active');
    cardButton.classList.remove('active');

    // Set active style for the selected button
    if (button) button.classList.add('active');
}

// Event Listener for COD Button
codButton.addEventListener('click', () => {
    setActiveButton(codButton);
    cardInformation.style.display = 'none'; // Hide card information
    isCardInfoVisible = false;
    localStorage.setItem('activeButton', 'cod'); // Store active button
});

// Event Listener for Card Button
cardButton.addEventListener('click', () => {
    if (isCardInfoVisible) {
        cardInformation.style.display = 'none'; // Hide card information
        cardButton.classList.remove('active');
        isCardInfoVisible = false;
        localStorage.removeItem('activeButton'); // Reset active button
    } else {
        setActiveButton(cardButton);
        cardInformation.style.display = 'block'; // Show card information
        isCardInfoVisible = true;
        localStorage.setItem('activeButton', 'card'); // Store active button
    }
});

// Event Listener for Confirmation Button
confirmationButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    localStorage.setItem('cardData', JSON.stringify({
        cardName: document.querySelector('.card-name-input').value,
        cardNumber: document.querySelector('.card-number-input').value,
        expirationDate: document.querySelector('.expiration-date-input').value,
        cvvCode: document.querySelector('.cvv-code-input').value
    }));

    localStorage.setItem('activeButton', 'card'); // Store active button
    location.reload(); // Reload the page
});

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
    const activeButton = localStorage.getItem('activeButton');
    const cardData = JSON.parse(localStorage.getItem('cardData'));

    if (activeButton === 'card') {
        setActiveButton(cardButton);
        cardInformation.style.display = 'block'; // Show card information

        // Populate the form with saved data
        if (cardData) {
            document.querySelector('.card-name-input').value = cardData.cardName || '';
            document.querySelector('.card-number-input').value = cardData.cardNumber || '';
            document.querySelector('.expiration-date-input').value = cardData.expirationDate || '';
            document.querySelector('.cvv-code-input').value = cardData.cvvCode || '';
        }

        isCardInfoVisible = true;
    } else if (activeButton === 'cod') {
        setActiveButton(codButton);
    } else {
        // Reset to default state (no buttons active)
        setActiveButton(null);
        cardInformation.style.display = 'none';
        isCardInfoVisible = false;
    }
});