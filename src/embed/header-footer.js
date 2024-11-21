function loadHeader(){
    let menu = document.getElementById("headerMenu");
    menu.innerHTML = `    <div class="header">
        <ul class="logo">
            <li><a href="index.html"><img class="logoimg" src="images/icon/logo.png"></a></li>
        </ul>
        
        <ul class="headerItems">
            <li><a href="index.html">Store</a></li>
            <li><a href="#">catPhone</a></li>
            <li><a href="#">catPad</a></li>
        </ul>

        <ul class="right">
            <li>
                <a href="admin.html"><i class="fa-solid fa-user-tie"></i></a>
            </li>
            <li>
                <a href="checkout.html">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="ShoppingCartItemCount" class="shopping-item-count">0</span>
                </a>
            </li>
            <li id="header-BurgerButton_Event" class="header-BurgerButton">
                <i class="fa-solid fa-bars"></i>
            </li>
        </ul>
    </div>
    <div id="header-Overlay">
        <i id="header-CloseBurger_Event" class="fa-solid fa-x"></i>
        <ul class="headerItems-Burger">
            <li><a href="index.html">Store</a></li>
            <li><a href="#">catPhone</a></li>
            <li><a href="#">catPad</a></li>
        </ul>
    </div>`;

    var OpenBurgerButton = document.getElementById("header-BurgerButton_Event");
    OpenBurgerButton.onclick = function(){
        var Burger = document.getElementById("header-Overlay");
        Burger.style = "display: block";
    };

    var CloseBurgerButton = document.getElementById("header-CloseBurger_Event");
    CloseBurgerButton.onclick = function(){
        var Burger = document.getElementById("header-Overlay");
        Burger.style = "display: none";
    };
}
loadHeader();


//
// footer
//

function loadFooter(){
    let menu = document.getElementById("footerMenu");
    menu.innerHTML = `        <div class="cat-footer">
                <div class="cat-footer-logo">
                    <img src="images/icon/logo.png" style="height: 128px; width: 100px;">
                    <span style="font-size: 48px; font-weight: 600; background-image: linear-gradient(#dc8a78, #8839ef); color: transparent; background-clip: text;">
                        catStore
                    </span>
                </div>
        <div class="cat-footer-container">
            <div class="cat-footer-row">
                <div class="cat-footer-col">
                    <h4>catStore</h4>
                    <ul>
                        <li>Phone: </li>
                        <li><a href="tel:0919847164">0919847164</a></li>
                        <li>Email: </li>
                        <li><a href="mailto:sales@catstore.com">sales@catstore.com</a></li>
                    </ul>
                </div>
                <div class="cat-footer-col">
                    <h4>Chi nhánh toàn cầu</h4>
                    <ul>
                        <li>CatStore International</li>
                        <li><a href="#">123 Lorem Ipsum Rd.</a></li>
                        <li>catStore Da Nang</li>
                        <li><a href="#">456 Hoang Van Thu St.</a></li>
                    </ul>
                </div>
                <div class="cat-footer-col">
                    <h4>Theo dõi catStore</h4>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fa-solid fa-globe"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}
loadFooter();