cart = [];

checkCart();

function checkCart() {
    cart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || [];
    updateShoppingCartCount();
}

function updateShoppingCartCount() {
    var count = 0;
    for (i = 0; i < cart.length; i++) {
      count += cart[i].productCount;
    }
    var shoppingCartCount = document.getElementById("ShoppingCartItemCount");
    shoppingCartCount.innerHTML = count;
}

window.addEventListener("storage", function () {
    localStorageCart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
    if(localStorageCart != cart){
        checkCart();
        updateShoppingCartCount(); // cập nhập tổng số lượng sản phẩm giỏ hàng
    }
  }, false);