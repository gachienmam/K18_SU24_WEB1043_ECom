//
// Product.js
//

cart = []; // pre init cart before running function

demoProduct();
renderProduct();
checkCart();

//
//
//

function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

function Product(productId, productImageName, productSpecialTag, productName, productCategory, productDescription, productPrice, productPage){
    this.productId = productId;
    this.productImageName = productImageName;
    this.productSpecialTag = productSpecialTag;
    this.productName = productName;
    this.productCategory = productCategory;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productPage = productPage;
}

function demoProduct(){
    inventory = [];
    // smartphones
    let sp1 = new Product(
        1,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Mới",
        "catPhone 15 Pro 256GB",
        "Smartphones",
        "Phone",
        1399000,
        "phone15.html"
    );
    let sp2 = new Product(
        2,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Mới",
        "catPhone 15 Pro 512GB",
        "Smartphones",
        "Phone",
        1499000,
        "phone15.html"
    );
    let sp3 = new Product(
        3,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Mới",
        "catPhone 15 Pro 1TB",
        "Smartphones",
        "Phone",
        1599000,
        "phone15.html"
    );
    let sp4 = new Product(
        4,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Khắc tên miễn phí",
        "catPhone 14 Pro 256GB",
        "Smartphones",
        "Phone",
        1099000,
        "phone15.html"
    );
    let sp5 = new Product(
        5,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Khắc tên miễn phí",
        "catPhone 14 Pro 512GB",
        "Smartphones",
        "Phone",
        1199000,
        "phone15.html"
    );
    let sp6 = new Product(
        6,
        "items/phone-15-pro/phone_15_pro_large.png",
        "Khắc tên miễn phí",
        "catPhone 14 Pro 1TB",
        "Smartphones",
        "Phone",
        1299000,
        "phone15.html"
    );
    
    // accessories

    let sp7 = new Product(
        7,
        "items/homepod/homepod-midnight.jpeg",
        "Mới",
        "HomePod - trợ lí thông minh",
        "Accessories",
        "HomePod",
        1399000,
        "homepod.html"
    );
    let sp8 = new Product(
        8,
        "items/homepod-mini/homepod-mini-yellow.jpeg",
        "Mới",
        "HomePod mini - trợ lí thông minh với kích thước nhỏ hơn",
        "Accessories",
        "Tốt nhất, nhỏ nhất",
        1299000,
        "homepod-mini.html"
    );
    let sp9 = new Product(
        9,
        "items/pods-3rd/pods-3rd.jpeg",
        "Mới",
        "catPods (thế hệ thứ 3)",
        "Accessories",
        "catPods 3rd generation",
        1599000,
        "catpods-3rd.html"
    );
    let sp10 = new Product(
        10,
        "items/pods-max/pods-max-silver.jpeg",
        "Mới",
        "catPods Max (silver)",
        "Accessories",
        "catPods Max",
        11099000,
        "catpods-max.html"
    );
    let sp11 = new Product(
        11,
        "items/pods-pro-2nd/pods-pro-2nd.jpeg",
        "Mới",
        "catPods Pro (thế hệ thứ 2)",
        "Accessories",
        "catPods Pro 2nd generation",
        1199000,
        "catpods-pro-2nd.html"
    );
    let sp12 = new Product(
        12,
        "items/pencil-pro/pencil-pro.jpeg",
        "Mới",
        "catPencil Pro - bút vẽ huyền thoại",
        "Accessories",
        "Phone",
        1299000,
        "catpencil-pro.html"
    );

    // push in items

    // smartphones
    inventory.push(sp1);
    inventory.push(sp2);
    inventory.push(sp3);
    inventory.push(sp4);
    inventory.push(sp5);
    inventory.push(sp6);

    // accessories
    inventory.push(sp7);
    inventory.push(sp8);
    inventory.push(sp9);
    inventory.push(sp10);
    inventory.push(sp11);
    inventory.push(sp12);
}

function renderProduct() {
    productCategories = ["Smartphones", "Accessories"];
    //productCategories.push("Smartphones");
    //productCategories.push("Accessories");
    
    //
    // Product append
    //

    for (i = 0; i < inventory.length; i++) {
        var categoryValid = false;

        var selectedCategory = "category-Accessories";

        for (j = 0; j < productCategories.length; j++){
            if (inventory[i].productCategory === productCategories[j]){
                selectedCategory = `category-${inventory[i].productCategory}`;
                categoryValid = true;
                break;
            }
        }

        

        var ChildToBeAppend = document.createElement('div');
        ChildToBeAppend.classList.add("cat-shop-itemsshelf_1-item");

        console.log(`[Product.js/ProductAppend, ${inventory[i].productId}, ${inventory[i].productName}]. appending to ${selectedCategory}`);

        if (categoryValid === false){
            console.error(`[Product.js/ProductAppend, ${inventory[i].productName}] Product doesn't have a valid category set. Product will be put into first defined category. Sản phẩm có phân loại không xác định được.`);
        }

        var str = `<div class="cat-shop-itemsshelf_1-item-ImageCard">
                        <img src="images/${inventory[i].productImageName}" alt="${inventory[i].productDescription}">
                    </div>
                    <div class="cat-shop-itemsshelf_1-item-ItemSpecial">
                        <span class="text-item-special-12">${inventory[i].productSpecialTag}</span>
                    </div>
                    <div class="cat-shop-itemsshelf_1-item-ItemVariants">

                    </div>
                    <div class="cat-shop-itemsshelf_1-item-ItemTitle">
                        <span class="text-item-title-17-600">${inventory[i].productName}</h2>
                    </div>
                    <div class="cat-shop-itemsshelf_1-item-EndGroup">
                        <div class="cat-shop-itemsshelf_1-item-ItemPrice"><span class="text-item-title-17-600">${convertMoney(inventory[i].productPrice)}</span></div>
                        <div id="Item_AddToCart" class="cat-shop-itemsshelf_1-item-ButtonAddToCart" onclick="addToCart(${inventory[i].productId})">Thêm vào giỏ</div>
                    </div>`;

        ChildToBeAppend.innerHTML = str;

        var appendToCategory = document.getElementById(`${selectedCategory}`); // error: nested node unable to be found
        // fix: create div to put html in and append the div
        appendToCategory.appendChild(ChildToBeAppend); // append to category
        
        /*
        if (dem % 4 == 0) {
            // nếu dòng đã đủ 4 phần tử vào
            var viTriGan = document.getElementsByClassName("pSanPham")[0];
            viTriGan.appendChild(dongMoi);
            // tạo dòng mới
            var dongMoi = document.createElement("dong"); // Tạo dòng mới
            dongMoi.classList.add("dongSp"); // sẽ lưu 4 sản phẩm
        }
        */
    }

    //
    // slideshow append
    //
    
    for (i = 0; i < inventory.length; i++) {
        var SlideshowContainer = "cat-slideshow-container";
        var ChildToBeAppend = document.createElement('div');
        ChildToBeAppend.classList.add("cat-slideshow-slide");
        ChildToBeAppend.classList.add("fade");

        console.log(`[Product.js/SlideshowAppend, ${inventory[i].productId}, ${inventory[i].productName}].`);

        var str = `
              <div class="cat-slideshow-slide-numbertext">${i + 1} / ${inventory.length}</div>
              <img src="images/${inventory[i].productImageName}" style="width:100%">
              <div class="cat-slideshow-slide-text">${inventory[i].productName}</div>
              `

        ChildToBeAppend.innerHTML = str;

        var appendToCategory = document.getElementsByClassName(`${SlideshowContainer}`)[0];
        appendToCategory.appendChild(ChildToBeAppend); // append to category
    }
}

  
function convertMoney(num) {
    return num.toLocaleString("vi-VN", { style: "currency", currency: "VND", currencyDisplay: "narrowSymbol", useGrouping: true });
    // num.toLocaleString(locale, options);
    // •  locale: Một chuỗi chỉ định ngôn ngữ và quy tắc định dạng khu vực.
    //•  options: Một đối tượng cung cấp các thuộc tính để tùy chỉnh định dạng.
    // Các thuộc tính này có thể bao gồm style, currency
}






//
// Shopping cart
//

 // cart array

function ProductCart(productId, productImageName, productSpecialTag, productName, productCategory, productDescription, productPrice, productPage, productCount){
    this.productId = productId;
    this.productImageName = productImageName;
    this.productSpecialTag = productSpecialTag;
    this.productName = productName;
    this.productCategory = productCategory;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productPage = productPage;
    this.productCount = productCount;
} // new product type to add counts

function checkCart() {
  cart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || [];
  updateShoppingCartCount();
}

function addToCart(addProductId) { // Product to Cart handler
  var ProductDoesNotExist = true; 
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId == addProductId) {
      cart[i].productCount += 1;
      ProductDoesNotExist = false;
      break;
    }
  }
  if (ProductDoesNotExist) {
    /*
    for (i = 0; i < inventory.length; i++) {
      if (inventory[i].productId == addProductId) {
        break;
      } else {
        console.log(`[Product.js/ShoppingCart, ${inventory[i].productId}, ${inventory[i].productName}]. Trying to add ${inventory[i].productId} to cart, but product does not exist`);
      }
    }
    */
    var productIdInArray = addProductId - 1;
    let productCart = new ProductCart();
    productCart.productId = addProductId;
    productCart.productImageName = inventory[productIdInArray].productImageName;
    productCart.productSpecialTag = inventory[productIdInArray].productSpecialTag;
    productCart.productName = inventory[productIdInArray].productName;
    productCart.productCategory = inventory[productIdInArray].productCategory;
    productCart.productDescription = inventory[productIdInArray].productDescription;
    productCart.productPrice = inventory[productIdInArray].productPrice;
    productCart.productPage = inventory[productIdInArray].productPage;
    productCart.productCount = 1;
    cart.push(productCart);
  }
  updateShoppingCartCount();
  localStorage.setItem("cat-ShoppingCart", JSON.stringify(cart));
}

function updateShoppingCartCount() { // Update the count in header
    var count = 0;
    for (i = 0; i < cart.length; i++) {
        count += cart[i].productCount;
    }
    var shoppingCartCount = document.getElementById("ShoppingCartItemCount");
    shoppingCartCount.innerHTML = count;
}




//
// event handling (localStorage changes)
//

window.addEventListener("storage", function () {
    localStorageCart = JSON.parse(localStorage.getItem("cat-ShoppingCart")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
    if(localStorageCart != cart){
      checkCart(); // cập nhập tổng số lượng sản phẩm giỏ hàng
    }
}, false);