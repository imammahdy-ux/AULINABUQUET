document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) { // Pastikan elemen target ada
                const headerOffset = document.querySelector('.header').offsetHeight; // Tinggi header
                // Tambahan 20px untuk padding agar tidak terlalu mepet ke header
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animasi scroll (fade-in-section)
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% dari elemen terlihat
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Berhenti mengamati setelah terlihat
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- FUNGSI WHATSAPP ---

    const whatsappNumber = "6281232495026"; // Nomor WhatsApp AULINA Bouquet (tanpa + atau spasi)

    // Handler untuk tombol "Detail & Pesan" pada kartu produk
    const whatsappProductButtons = document.querySelectorAll('.whatsapp-product-btn');
    whatsappProductButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah link default

            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;

            let message = `Halo AULINA Bouquet,\n\nSaya tertarik dengan produk:\n`;
            message += `*Nama Produk:* ${productName}\n`;
            message += `*Harga:* ${productPrice}\n\n`;
            message += `Mohon info lebih lanjut atau saya ingin memesan.`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // Handler untuk tombol "Kirim Pesanan (via WhatsApp)" di formulir
    const whatsappSendFormButton = document.getElementById('kirim-via-whatsapp');
    if (whatsappSendFormButton) {
        whatsappSendFormButton.addEventListener('click', function() {
            // Mengambil nilai dari input formulir
            const nama = document.getElementById('nama').value;
            const whatsappUser = document.getElementById('whatsapp').value;
            const produkMinat = document.getElementById('produk-minat').value;
            const pesan = document.getElementById('pesan').value;

            // Membuat pesan WhatsApp
            let message = `*PESANAN AULINA BOUQUET (dari Website)*\n\n`;
            message += `*Nama:* ${nama || '(Tidak diisi)'}\n`; // Jika kosong, tulis (Tidak diisi)
            message += `*No. WhatsApp Pemesan:* ${whatsappUser || '(Tidak diisi)'}\n`;
            if (produkMinat) {
                message += `*Produk Diminati:* ${produkMinat}\n`;
            }
            message += `*Pesan/Detail Custom:*\n${pesan || '(Tidak diisi)'}\n\n`;
            message += `Terima kasih.`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }
});