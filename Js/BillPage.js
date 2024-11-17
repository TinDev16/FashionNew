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