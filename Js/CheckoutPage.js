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

// Payment Section Logic
const codButton = document.getElementById('cod-button');
const cardButton = document.getElementById('card-button');
const cardInformation = document.getElementById('card-information');
const confirmationButton = document.querySelector('.card-information-confirmation');
const noteField = document.querySelector('.note .input-field');
const savedAddressRadio = document.getElementById('saved-address-account');
const newAddressRadio = document.getElementById('new-address');
const savedAddressSelect = document.getElementById('saved-address-select');
const savedAddressSection = document.getElementById('saved-address-section');
const newAddressSection = document.getElementById('new-address-section');
const countryInput = document.querySelector('.countries-input');
const cityInput = document.querySelector('.cities-input');
const districtInput = document.querySelector('.districts-input');
const addressInput = document.querySelector('.address-input');

let isCardInfoVisible = false;

function setActiveButton(button) {
    codButton.classList.remove('active');
    cardButton.classList.remove('active');
    if (button) button.classList.add('active');
}

// Toggle Payment Method Buttons
codButton.addEventListener('click', () => {
    if (codButton.classList.contains('active')) {
        setActiveButton(null);
        cardInformation.style.display = 'none';
        isCardInfoVisible = false;
        localStorage.removeItem('activeButton');
    } else {
        setActiveButton(codButton);
        cardInformation.style.display = 'none';
        isCardInfoVisible = false;

        // Clear card-information data
        clearCardInformationData();

        localStorage.setItem('activeButton', 'cod');
    }
});

cardButton.addEventListener('click', () => {
    if (isCardInfoVisible) {
        cardInformation.style.display = 'none';
        cardButton.classList.remove('active');
        isCardInfoVisible = false;
        localStorage.removeItem('activeButton');
    } else {
        setActiveButton(cardButton);
        cardInformation.style.display = 'block';
        isCardInfoVisible = true;
        localStorage.setItem('activeButton', 'card');
    }
});

// Save Data to Local Storage
function saveDataToLocalStorage() {
    const cardData = {
        cardName: document.querySelector('.card-name-input').value,
        cardNumber: document.querySelector('.card-number-input').value,
        expirationDate: document.querySelector('.expiration-date-input').value,
        cvvCode: document.querySelector('.cvv-code-input').value
    };

    const customerInfo = {
        name: document.querySelector('.customer-name-input').value,
        phone: document.querySelector('.customer-phone-input').value
    };

    const noteContent = noteField.value;

    localStorage.setItem('cardData', JSON.stringify(cardData));
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    localStorage.setItem('orderNote', noteContent);
}

// Clear card-information data
function clearCardInformationData() {
    // Remove card data from localStorage
    localStorage.removeItem('cardData');

    // Clear all card-information input fields
    document.querySelector('.card-name-input').value = '';
    document.querySelector('.card-number-input').value = '';
    document.querySelector('.expiration-date-input').value = '';
    document.querySelector('.cvv-code-input').value = '';
}

// Confirmation Button Event
confirmationButton.addEventListener('click', (event) => {
    event.preventDefault();
    saveDataToLocalStorage();
    localStorage.setItem('activeButton', 'card');
    location.reload();
});

// Input Events to Save Data Dynamically
['input', 'change'].forEach(eventType => {
    document.querySelector('.card-name-input').addEventListener(eventType, saveDataToLocalStorage);
    document.querySelector('.card-number-input').addEventListener(eventType, saveDataToLocalStorage);
    document.querySelector('.expiration-date-input').addEventListener(eventType, saveDataToLocalStorage);
    document.querySelector('.cvv-code-input').addEventListener(eventType, saveDataToLocalStorage);
    document.querySelector('.customer-name-input').addEventListener(eventType, saveDataToLocalStorage);
    document.querySelector('.customer-phone-input').addEventListener(eventType, saveDataToLocalStorage);
    noteField.addEventListener(eventType, saveDataToLocalStorage);
});

// Address Section Logic
function toggleAddressFields() {
    if (savedAddressRadio.checked) {
        savedAddressSection.style.display = 'block';
        newAddressSection.style.display = 'none';
        localStorage.setItem('selectedAddressType', 'saved');
        localStorage.setItem('selectedSavedAddress', savedAddressSelect.value);

        // Clear new-address data
        clearNewAddressData();
    } else if (newAddressRadio.checked) {
        savedAddressSection.style.display = 'none';
        newAddressSection.style.display = 'block';
        const newAddressData = {
            country: countryInput.value,
            city: cityInput.value,
            district: districtInput.value,
            address: addressInput.value
        };
        localStorage.setItem('selectedAddressType', 'new');
        localStorage.setItem('newAddressData', JSON.stringify(newAddressData));
    }
}

// Clear new-address data
function clearNewAddressData() {
    localStorage.removeItem('newAddressData');

    // Clear all new-address-section input fields
    countryInput.value = '';
    cityInput.value = '';
    districtInput.value = '';
    addressInput.value = '';
}

// Add Event Listeners for Address Inputs
savedAddressRadio.addEventListener('change', toggleAddressFields);
newAddressRadio.addEventListener('change', toggleAddressFields);
savedAddressSelect.addEventListener('change', toggleAddressFields);
['input', 'change'].forEach(eventType => {
    countryInput.addEventListener(eventType, toggleAddressFields);
    cityInput.addEventListener(eventType, toggleAddressFields);
    districtInput.addEventListener(eventType, toggleAddressFields);
    addressInput.addEventListener(eventType, toggleAddressFields);
});

// Restore Data from Local Storage on Page Load
window.addEventListener('DOMContentLoaded', () => {
  const activeButton = localStorage.getItem('activeButton');
  const cardData = JSON.parse(localStorage.getItem('cardData') || '{}');
  const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
  const savedNote = localStorage.getItem('orderNote') || '';
  const selectedAddressType = localStorage.getItem('selectedAddressType');
  const newAddressData = JSON.parse(localStorage.getItem('newAddressData') || '{}');

  // Restore Payment Method
  if (activeButton === 'card') {
      setActiveButton(cardButton);
      cardInformation.style.display = 'block';
      isCardInfoVisible = true;
  } else if (activeButton === 'cod') {
      setActiveButton(codButton);
  } else {
      setActiveButton(null);
      cardInformation.style.display = 'none';
      isCardInfoVisible = false;
  }

  // Restore Card Data
  document.querySelector('.card-name-input').value = cardData.cardName || '';
  document.querySelector('.card-number-input').value = cardData.cardNumber || '';
  document.querySelector('.expiration-date-input').value = cardData.expirationDate || '';
  document.querySelector('.cvv-code-input').value = cardData.cvvCode || '';

  // Restore Customer Info and Note
  document.querySelector('.customer-name-input').value = customerInfo.name || '';
  document.querySelector('.customer-phone-input').value = customerInfo.phone || '';
  noteField.value = savedNote;

  // Restore Address Data
  if (selectedAddressType === 'saved') {
      savedAddressRadio.checked = true;
      toggleAddressFields();
      const selectedSavedAddress = localStorage.getItem('selectedSavedAddress');
      if (selectedSavedAddress) {
          savedAddressSelect.value = selectedSavedAddress;
      }
  } else if (selectedAddressType === 'new') {
      newAddressRadio.checked = true;
      toggleAddressFields();

      // Restore new-address-section data
      countryInput.value = newAddressData.country || '';
      cityInput.value = newAddressData.city || '';
      districtInput.value = newAddressData.district || '';
      addressInput.value = newAddressData.address || '';
  } else {
      // Set saved-address-account as default
      savedAddressRadio.checked = true;
      toggleAddressFields();

      // Hide new-address section by default
      savedAddressSection.style.display = 'block';
      newAddressSection.style.display = 'none';
      localStorage.setItem('selectedAddressType', 'saved'); // Save default state
  }
});
