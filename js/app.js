// Alpine JS
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Madu Hitam",
        img: "madu_hitam.jpg",
        price: 150000,
      },
      {
        id: 2,
        name: "Madu Akasia",
        img: "madu_akasia.jpg",
        price: 155000,
      },
      {
        id: 3,
        name: "Madu Hutan NTT",
        img: "madu_hutan_ntt.jpg",
        price: 140000,
      },
      {
        id: 4,
        name: "Madu Internasional",
        img: "madu_internasional.jpg",
        price: 205000,
      },
      {
        id: 5,
        name: "Madu Kaliandra",
        img: "madu_kaliandra.jpg",
        price: 160000,
      },
      {
        id: 6,
        name: "Madu Multiflora",
        img: "madu_multiflora.jpg",
        price: 159000,
      },
      {
        id: 7,
        name: "Madu Super",
        img: "madu_super.jpg",
        price: 201000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah item sudah ada di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika Cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barangnya sama atau tidak dengan yang sudah ada
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada dan sama, maka tambahkan quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // Ambil item yang mau dihapus
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            // Kurangi quantity dan total
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// // Checkout Form Validation
const checkoutButton = document.querySelector(".checkout-btn");
// checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

// form.addEventListener('keyup', function() {
//   for(let i = 0; i < form.elements.length; i++) {
//     if(form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove("disabled");
//       checkoutButton.classList.add("disabled");
//     }
//     else {
//       return false;
//     }
//   }
//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove("disabled");
// })

// Kirim Data ketika Checkout
checkoutButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Check if any required field is empty
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name === '' || email === '' || phone === '') {
    alert("Tolong isi form terlebih dahulu.");
    return; // Stop execution if any field is empty
  }

  // If all fields are filled, proceed to create WhatsApp message
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objectData = Object.fromEntries(data);
  const message = formatMessage(objectData);
  window.open(`https://wa.me/6281217952403?text=${encodeURIComponent(message)}`, '_blank');
});

// Format pesan WhatsApp
const formatMessage = (obj) => {
  return `
  Halo, saya ingin memesan, berikut datanya:
  Nama: ${obj.name}
  Email: ${obj.email}
  No. HP: ${obj.phone}
  Data Pesanan
  ${JSON.parse(obj.items).map(item => `${item.name} (${item.quantity} x ${formatRupiah(item.total)}) \n`)}
  Total: ${formatRupiah(obj.total)}
  Terima Kasih
  `
}


// Konversi ke Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};


