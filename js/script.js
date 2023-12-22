// Toggle class active hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar sidebar supaya navnya hilang
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Toggle class active search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-btn").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
}


// Klik di luar search form supaya formnya hilang
const searchBtn = document.querySelector("#search-btn");

document.addEventListener("click", function (e) {
  if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
})

// Logika untuk ketika tombol add to cart diklik
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-cart-btn").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

const cartBtn = document.querySelector("#shopping-cart-btn");

document.addEventListener("click", function (e) {
  if (!cartBtn.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

const shoppingCartBtn = document.getElementById("shopping-cart-button");

shoppingCartBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
});



// Menggunakan format terhubung dengan WhatsApp
document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('email').value;
  const alamat = document.getElementById('alamat').value;

  const baseUrl = 'https://api.whatsapp.com/send?phone=';
  const phoneNumber = '6281217952403';

  
  const message = encodeURIComponent(`Halo, nama saya ${nama}. Email saya ${email}. Alamat saya di ${alamat}`);

  const whatsappUrl = `${baseUrl}${phoneNumber}&text=${message}`;

  window.open(whatsappUrl, '_blank');
});


// Item Detail Modal
const itemModal = document.querySelector("#item-detail-modal");
const itemModalBtn = document.querySelectorAll(".item-modal-btn");

itemModalBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    itemModal.style.display = "flex";
    e.preventDefault();
  });
  
})



// Close Item Detail Modal
const itemModalCloseBtn = document.querySelector(".close");

itemModalCloseBtn.addEventListener("click", (e) => {
  itemModal.style.display = "none";
  e.preventDefault();
})

// Close Item Detail Modal ketika klik di luar modal
window.addEventListener("click", (e) => {
  if (e.target === itemModal) {
    itemModal.style.display = "none";
  }
})
