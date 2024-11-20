checkPromotion(); // trang chủ Home - kiểm tra thời gian khuyến mãi nếu còn
renderPromotionBanner(); //trang chủ Home - load HTML thời gian khuyến mãi
loadTGKMToInput(); //trang thiết lập thời gian khuyến mãi - nếu có thời gian khuyến mãi thì load và nạp lên giao diên input -

////////trang chủ Home

function renderPromotionBanner() {
  let PromotionBanner = document.getElementById("promotionBanner");
  PromotionBanner.innerHTML = `Giảm giá 10% cho toàn bộ sản phẩm. Áp dụng mã <b>KM20TH11</b> khi thanh toán. Còn 
      <span id="idTgKM"></span> 
      <b>
      <span class="promotionDays"></span>, 
      <span class="promotionHours"></span>, 
      <span class="promotionMinutes"></span>, 
      <span class="promotionSeconds"></span></b> nữa.`;
}

function hidePromotionBanner() {
  let PromotionBanner = document.getElementById("promotionBanner"); // ẩn thông tin thời gian khuyến mãi
  PromotionBanner.style.display = "none";
}

function checkPromotion() {
  tgKM = localStorage.getItem("cat-Promotion") || false;
  if (!tgKM) {
    // không có thời gian khuyến mãi
    hidePromotionBanner();
    return;
  }
  updateInterval = setInterval("updatePromotionBanner();", 0); // fix 1s load delay
  updateInterval = setInterval("updatePromotionBanner();", 1000);
}

function updatePromotionBanner() {
  var d = CalculateTimeLeft(); // tính toán thời gian còn lại
  if (d.msLeft < 0) {
    // đã hết hạn khuyến mãi
    localStorage.removeItem("cat-Promotion"); // xóa
    hidePromotionBanner();
    clearInterval(updateInterval);
    return;
  }
  // hiển thị thông tin
  var LocationNgay = document.getElementsByClassName("promotionDays")[0];
  LocationNgay.innerHTML = d.days + " ngày";
  var LocationNgay = document.getElementsByClassName("promotionHours")[0];
  LocationNgay.innerHTML = d.hours + " giờ";
  var LocationNgay = document.getElementsByClassName("promotionMinutes")[0];
  LocationNgay.innerHTML = d.minutes + " phút";
  var LocationNgay = document.getElementsByClassName("promotionSeconds")[0];
  LocationNgay.innerHTML = d.seconds + " giây";
}

function CalculateTimeLeft() {
  var currDate = new Date();
  var tgRemain = Date.parse(tgKM) - Date.parse(currDate); // số mili giây
  // Tổng thời gian khuyến mãi còn lại
  var tongSoGiay = Math.floor(tgRemain / 1000);
  var tongSoPhut = Math.floor(tongSoGiay / 60);
  var tongSoGio = Math.floor(tongSoPhut / 60);
  var tongSoNgay = Math.floor(tongSoGio / 24);

  // Tổng thời gian khuyến mãi còn lại chi tiết
  var tongSoGiayLe = tongSoGiay % 60; // số giây lẻ còn lại, sau khi đã chia cho phút
  var tongSoPhutLe = tongSoPhut % 60; // số phút lẻ còn lại, sau khi đã chia cho giờ
  var tongSoGioLe = tongSoGio % 24; // số giờ lẻ còn lại, sau khi đã chia cho ngày

  return {
    msLeft: tgRemain,
    days: tongSoNgay,
    hours: tongSoGioLe,
    minutes: tongSoPhutLe,
    seconds: tongSoGiayLe,
  };
}

//////// trang thiết lập thời gian khuyến mãi

function loadTGKMToInput() {
  var t1 = localStorage.getItem("cat-Promotion") || false;
  if (t1) {
    // nếu có thời gian khuyến mãi thì load và nạp lên giao diên input
    var nkm = document.querySelector("input[name='cat-admin-PromotionEndDate-Input']");
    var ngay = new Date(t1);
    nkm.valueAsDate = ngay;
  }
}

function setupPromotionTimerToLocal() {
  var nkm = document.querySelector("input[name='cat-admin-PromotionEndDate-Input']");
  var t = new Date(nkm.value);
  localStorage.setItem("cat-Promotion", t);
  window.location.reload();
}
