// Objek untuk menyimpan item dalam keranjang
const shoppingCart = {};

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productName, price) {
    if (!shoppingCart[productName]) {
        shoppingCart[productName] = {
            name: productName,
            price: price,
            quantity: 1
        };
    } else {
        shoppingCart[productName].quantity++;
    }

    updateCartUI();
}

// Fungsi untuk memperbarui tampilan keranjang belanja
function updateCartUI() {
    const cartListElement = document.getElementById('cart-list');
    cartListElement.innerHTML = '';

    if (Object.keys(shoppingCart).length === 0) {
        const emptyCartElement = document.createElement('li');
        emptyCartElement.textContent = 'Keranjang belanja kosong.';
        cartListElement.appendChild(emptyCartElement);
    } else {
        for (const productName in shoppingCart) {
            const item = shoppingCart[productName];
            const itemElement = document.createElement('li');
            itemElement.innerHTML = `<strong>${item.name}</strong> - ${formatCurrency(item.price)} - Kuantitas: ${item.quantity}`;
            cartListElement.appendChild(itemElement);
        }
    }
}

// Fungsi untuk menampilkan kuantitas dari jumlah kali produk diklik pada console (hanya sebagai contoh)
function displayQuantities() {
    for (const productName in shoppingCart) {
        const item = shoppingCart[productName];
        console.log(`${item.name} - Kuantitas: ${item.quantity}`);
    }
}

// Fungsi untuk menyelesaikan pembelian (proses checkout)
function checkout() {
    if (Object.keys(shoppingCart).length === 0) {
        alert('Keranjang belanja kosong. Tambahkan item ke keranjang terlebih dahulu.');
        return;
    }

    const selectedPaymentMethod = document.getElementById('paymentMethod').value;
    if (!selectedPaymentMethod) {
        alert('Pilih Metode Pembayaran');
        return;
    }

    const orderDetails = {
        items: Object.values(shoppingCart),
        totalPrice: Object.values(shoppingCart).reduce((total, item) => total + item.price * item.quantity, 0),
        paymentMethod: selectedPaymentMethod
    };

    // Buat pesan WhatsApp dengan detail pesanan
    const whatsappMessage = `Halo, saya ingin melakukan pembelian dengan detail:\n\n${formatOrderDetails(orderDetails)}\n\n: ${selectedPaymentMethod}\n\nSilakan tunggu konfirmasi dari kami,silahkan Masukkan username instagram:@`;

    // Ganti dengan nomor WhatsApp Anda (format: '628123456789')
    const recipientNumber = '6289626756135';

    // Gunakan deep linking untuk membuka aplikasi WhatsApp pada perangkat mobile
    const whatsappDeepLink = 'whatsapp://send?phone=' + recipientNumber + '&text=' + encodeURIComponent(whatsappMessage);

    // Redirect ke deep link
    window.location.href = whatsappDeepLink;
}

// Fungsi untuk memformat harga ke format Rupiah
function formatCurrency(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

// Fungsi untuk memformat detail pesanan
function formatOrderDetails(order) {
    return order.items.map(item => `${item.name} - Rp ${formatCurrency(item.price)} - Kuantitas: ${item.quantity}`).join('\n') +
        `\n\nTotal Harga: Rp ${formatCurrency(order.totalPrice)}\nMetode Pembayaran: ${order.paymentMethod}`;
}
