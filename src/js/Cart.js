function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

// init lists

var CartCurrentCount = 0;

let ShippingMethodList = {
  1: 100000,
  2: 2000000,
};

let PromotionDiscountCodes = {
  //NGUBO30: 30,
  //NGUBO20: 20,
  KM20TH11: 10,
};

renderCart(); // load cart

////
function renderCart() {
  cart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
  let CartContainer = document.getElementById("CartContainer");

  var Title = document.createElement("div");
  Title.classList.add("title");
  Title.innerHTML = `
                        <div class="row">
                            <div class="col"><h4><b>Giỏ hàng</b></h4></div>
                            <div class="col align-self-center text-right text-muted"><span id="CartAmountOfItems">${cart.length}</span> sản phẩm</div>
                        </div>`;
  CartContainer.appendChild(Title);

  if (cart.length == 0) {
    var ChildToBeAppend = document.createElement("div");
    ChildToBeAppend.classList.add("row");
    ChildToBeAppend.classList.add("border-top");
    ChildToBeAppend.classList.add("border-bottom");
    
    var str = `
                        <div class="row main align-items-center">
                            <div class="col item-text">
                                <div class="row">Bạn chưa thêm gì vào giỏ, mời bạn mua ủng hộ dùm ạ</div>
                            </div>
                        </div>
                    `;
    ChildToBeAppend.innerHTML = str;
    CartContainer.appendChild(ChildToBeAppend);
  }

  for (i = 0; i < cart.length; i++) {
    // tạo dòng mới
    var ChildToBeAppend = document.createElement("div");
    ChildToBeAppend.classList.add("row");
    if (i == 0){
      if (cart.length == 1){
        ChildToBeAppend.classList.add("border-top");
        ChildToBeAppend.classList.add("border-bottom");
      } else {
        ChildToBeAppend.classList.add("border-top");
      }
    } else {
      ChildToBeAppend.classList.add("border-top");
    }
    if (i+1 == cart.length){
      ChildToBeAppend.classList.add("border-top");
      ChildToBeAppend.classList.add("border-bottom");
    }
    // thêm thông tin sản phẩm
    
    var str = `
                        <div class="row main align-items-center">
                            <div class="col-2"><img class="img-fluid" src="images/${cart[i].productImageName}"></div>
                            <div class="col item-text">
                                
                                <div class="row">${cart[i].productName}</div>
                            </div>
                            <div class="col">
                                <a href="javascript:;" onclick="changeProductCount(${cart[i].productId}, -1)">-</a><a href="#" class="border" id="Count_${cart[i].productId}" >${cart[i].productCount}</a><a href="javascript:;" onclick="changeProductCount(${cart[i].productId}, 1)">+</a>
                            </div>
                            <div class="col"><span id="Price_${cart[i].productId}">${convertMoney(cart[i].productPrice*cart[i].productCount)}</span><span class="close" onclick="DeleteProductFromCart(${cart[i].productId})">&#10005;</span></div>
                        </div>
                    `;
                    // <div class="row text-muted">Hồng Titan</div>
    ChildToBeAppend.innerHTML = str;
    // thêm node mới vào trang html
    CartContainer.appendChild(ChildToBeAppend);
  }

  var BackToShop = document.createElement("div");
  BackToShop.classList.add("back-to-shop");
  BackToShop.innerHTML = `<a href="index.html">&leftarrow;</a><span class="text-muted">Quay lại shop</span>`;
  CartContainer.appendChild(BackToShop);

  
  updateShoppingCartCount(); // sau khi vẽ giỏ hàng thì cập nhập tổng số lượng, thông tin thanh toán
}

function updateShoppingCartCount() {
  var count = 0;
  for (i = 0; i < cart.length; i++) {
    count += cart[i].productCount;
  }
  var shoppingCartCount = document.getElementById("ShoppingCartItemCount");
  var panelCartCount = document.getElementById("CartAmountOfItems");
  shoppingCartCount.innerHTML = count;
  panelCartCount.innerHTML = count;
  localStorage.setItem("cat-ShoppingCart", JSON.stringify(cart)); // update storage
  updateCheckoutInfo(); // update payment
}

function updateCheckoutInfo() {
  var PromotionCode = document.querySelector("#CartPromotionCode").value; // kiểu input- value
  if (PromotionCode != ""){
      var tKM = localStorage.getItem("cat-Promotion") || false;
    if (!tKM) {
      // nếu không có thời gian khuyến mãi hay đã hết hạn thì thông báo đã hết thời gian khuyến mãi
      // tính theo giá bình thường
      alert("Đã hết thời gian khuyến mãi. Bạn sẽ không được giảm giá.");
      return;
    }
    // có khuyến mãi, nhưng tại thời điểm thanh toán, đã hết hạn
    var currDate = new Date();
    thoiGianConLai = Date.parse(tKM) - Date.parse(currDate);
    if (thoiGianConLai < 0) {
      localStorage.removeItem("cat-Promotion");
      alert("Đã hết thời gian khuyến mãi. Bạn sẽ không được giảm giá.");
      return;
    }

    // nếu còn thời gian khuyến mãi
    var Money_TotalOnlyProduct = 0; // tổng tiền sản phẩm
    var Money_VAT = 0; // tổng tiền VAT 5%
    var Money_Discount = 0; // tổng tiền khuyến mãi
    var Money_TotalToBePaid = 0; // tổng tiền thanh toán
    var Money_PerProduct = 0; // tổng giả trị mổi sản phẩm = số lượng * đơn giá

    for (i = 0; i < cart.length; i++) {
      Money_PerProduct = cart[i].productCount * cart[i].productPrice;
      Money_TotalOnlyProduct += Money_PerProduct;
    }
    var Money_VAT = (Money_TotalOnlyProduct * 5) / 100;
    var Money_TotalToBePaid = Money_TotalOnlyProduct + Money_VAT + Money_ShippingMethod;
    // lấy và kiểm tra mã giảm giá
    
    PromotionCode = PromotionCode.toUpperCase(); // chuyển ký tự nhập thành hoa
    PromotionDiscountPercent = 0;
    if (PromotionDiscountCodes[PromotionCode]) {
      PromotionDiscountPercent = PromotionDiscountCodes[PromotionCode];
    }

    if (PromotionDiscountPercent > 0) {
      Money_Discount = (Money_TotalOnlyProduct * PromotionDiscountPercent) / 100;
      Money_TotalToBePaid = Money_TotalOnlyProduct + Money_VAT - Money_Discount; // giảm (tổng tiền phải thanh toán) = ((tổng tiền) + vat) - khuyến mãi
    } else {
      // mã khuyến mãi không hợp lệ
      Money_TotalToBePaid = Money_TotalOnlyProduct + Money_VAT; // (tổng tiền phải thanh toán) = ((tổng tiền) + vat)
    }
    Money_VAT = (Money_TotalOnlyProduct * 5) / 100;

    // shipping method handler
    
    var ShippingMethodElement = document.getElementById("CartSelectShipMethod");
    var Money_ShippingMethod = 0;
    if(cart.length != 0){
      if (ShippingMethodList[ShippingMethodElement.value]){
        Money_ShippingMethod = ShippingMethodList[ShippingMethodElement.value];
      } else {
        Money_ShippingMethod = 0;
      }
    } else {
      Money_ShippingMethod = 0;
    }

    // hiển thị thông tin
    let CartCheckoutTotalWithoutTax = document.getElementsByClassName("CartCheckoutTotalWithoutTax")[0];
    let CartCheckoutDiscount = document.getElementsByClassName("CartCheckoutDiscount")[0];
    let CartCheckoutTax = document.getElementsByClassName("CartCheckoutTax")[0];
    let CartCheckoutShipping = document.getElementsByClassName("CartCheckoutShipping")[0];
    let CartCheckoutTotal = document.getElementsByClassName("CartCheckoutTotal")[0];
    
    CartCheckoutTotalWithoutTax.innerHTML = convertMoney(Money_TotalOnlyProduct);
    CartCheckoutTax.innerHTML = convertMoney(Money_VAT);
    CartCheckoutShipping.innerHTML = convertMoney(Money_ShippingMethod);
    CartCheckoutTotal.innerHTML = convertMoney(Money_TotalToBePaid);
    CartCheckoutDiscount.innerHTML = convertMoney(Money_Discount);
  } else {
    // cập nhập thông tin thanh toán: tổng tiền, vat, khuyến mãi, tổng thanh toán
    var Money_TotalOnlyProduct = 0;
    var Money_PerProduct = 0; // tổng giả trị sản phẩm = số lượng * đơn giá
    var Money_Discount = 0;

    // shipping method handler
    var ShippingMethodElement = document.getElementById("CartSelectShipMethod");
    var Money_ShippingMethod = 0;
    if(cart.length != 0){
      if (ShippingMethodList[ShippingMethodElement.value]){
        Money_ShippingMethod = ShippingMethodList[ShippingMethodElement.value];
      } else {
        Money_ShippingMethod = 0;
      }
    } else {
      Money_ShippingMethod = 0;
    }



    for (i = 0; i < cart.length; i++) {
      Money_PerProduct = cart[i].productCount * cart[i].productPrice;
      Money_TotalOnlyProduct += Money_PerProduct;
    }
    var Money_VAT = (Money_TotalOnlyProduct * 5) / 100;
    var Money_TotalToBePaid = Money_TotalOnlyProduct + Money_VAT + Money_ShippingMethod;
    let CartCheckoutTotalWithoutTax = document.getElementsByClassName("CartCheckoutTotalWithoutTax")[0];
    let CartCheckoutDiscount = document.getElementsByClassName("CartCheckoutDiscount")[0];
    let CartCheckoutTax = document.getElementsByClassName("CartCheckoutTax")[0];
    let CartCheckoutShipping = document.getElementsByClassName("CartCheckoutShipping")[0];
    let CartCheckoutTotal = document.getElementsByClassName("CartCheckoutTotal")[0];
    
    CartCheckoutTotalWithoutTax.innerHTML = convertMoney(Money_TotalOnlyProduct);
    CartCheckoutTax.innerHTML = convertMoney(Money_VAT);
    CartCheckoutShipping.innerHTML = convertMoney(Money_ShippingMethod);
    CartCheckoutTotal.innerHTML = convertMoney(Money_TotalToBePaid);
    CartCheckoutDiscount.innerHTML = convertMoney(Money_Discount);

    CartCurrentCount = cart.length;
  }
}

function DeleteCart() {
  cart = []; //cart hiện tại trong bộ nhớ bằng rỗng
  localStorage.setItem("cat-ShoppingCart", JSON.stringify(cart)); // ghi lại vào localStorage
  let CartContainerByClass = document.getElementsByClassName("cart")[0];
  CartContainerByClass.innerHTML = "";
  renderCart(); // render trang giỏ hàng
  updateShoppingCartCount(); // cập nhập tổng số lượng sản phẩm giỏ hàng
}

function CompletePayment() {
  if (cart.length == 0){
    alert("Giỏ hàng chưa có gì, mời bạn mua thêm đồ giúp em ạ")
  } else {
    alert("Cảm ơn quý khách đã thanh toán!");
    DeleteCart();
    window.location.href = "index.html";
    return true;
  }
}



function DeleteProductFromCart(productIdToBeDeleted) {
  // khi xóa 1 sản phẩm
  // cập nhập lại mảng
  // ghi lại json
  // cập nhập tổng số lượng sản phẩm + thông tin thanh toán
  // vẽ lại giao diện
  for (i = 0; i < cart.length; i++) {
    // cập nhập cart hiện tại trong bộ nhớ
    if (cart[i].productId == productIdToBeDeleted) cart.splice(i, 1);
  }
  localStorage.setItem("cat-ShoppingCart", JSON.stringify(cart)); // ghi lại vào localStorage
  let CartContainerByClass = document.getElementsByClassName("cart")[0];
  CartContainerByClass.innerHTML = "";
  renderCart(); // vẽ lại giỏ hàng
  updateShoppingCartCount(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
}

function changeProductCount(productId, changeBy) {
  var ProductCountObject = document.getElementById(`Count_${productId}`);
  var ProductPriceObject = document.getElementById(`Price_${productId}`);
  var ProductCountAfterChange = Number(Number(ProductCountObject.innerHTML) + changeBy);
  if (parseInt(ProductCountAfterChange) <= 0) {
    cart[i].productCount = 1;
    ProductCountObject.innerHTML = 1;
    ProductPriceObject.innerHTML = convertMoney(cart[i].productPrice*cart[i].productCount);
  }
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId == productId) {
      cart[i].productCount = Number(ProductCountAfterChange);
      ProductCountObject.innerHTML = Number(ProductCountAfterChange);
      ProductPriceObject.innerHTML = convertMoney(cart[i].productPrice*cart[i].productCount);
    }
    //  parseInt(numUnderString) or Number(numUnderString)
  }
  updateShoppingCartCount(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
}


function convertMoney(num) {
  return num.toLocaleString("vi-VN", { style: "currency", currency: "VND", currencyDisplay: "narrowSymbol", useGrouping: true });
  // num.toLocaleString(locale, options);
  // •  locale: Một chuỗi chỉ định ngôn ngữ và quy tắc định dạng khu vực.
  //•  options: Một đối tượng cung cấp các thuộc tính để tùy chỉnh định dạng.
  // Các thuộc tính này có thể bao gồm style, currency
}



//
// event handling (localStorage changes)
//

window.addEventListener("storage", function () {
  localStorageCart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
  if(localStorageCart != cart){
    let CartContainerByClass = document.getElementsByClassName("cart")[0];
    CartContainerByClass.innerHTML = "";
    renderCart(); // render trang giỏ hàng
    updateShoppingCartCount(); // cập nhập tổng số lượng sản phẩm giỏ hàng
  }
}, false);