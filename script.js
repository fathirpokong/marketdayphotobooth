const url = "https://script.google.com/macros/s/AKfycbzB7lk-wCZx7nasMklNLh1lcc1U_i-rHiHDMOFmOPdPpFBV-HvxTBRYX-mDYqP7hwoW7g/exec";

function updateInputMetode() {
    const metode = document.getElementById('metode').value;
    document.getElementById('inputEmailBox').style.display = (metode === 'Email') ? 'block' : 'none';
    document.getElementById('inputWABox').style.display = (metode === 'WhatsApp') ? 'block' : 'none';
}

function selectPkg(val, price, el) {
    document.getElementById('selectedPackage').value = val;
    document.getElementById('selectedPrice').value = price;
    document.querySelectorAll('.package-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
}

function kirimData() {
    const nama = document.getElementById('nama').value;
    const paket = document.getElementById('selectedPackage').value;
    const metode = document.getElementById('metode').value;
    const email = document.getElementById('email').value || "-";
    const wa = document.getElementById('whatsapp').value || "-";
    const btn = document.getElementById('btnOrder');

    if(!nama || !paket) { 
        alert("Isi nama dan pilih paket dulu!"); 
        return; 
    }

    // Validasi khusus WhatsApp
    if(metode === 'WhatsApp' && wa === "-") {
        alert("Harap isi nomor WhatsApp kamu!");
        return;
    }

    btn.disabled = true;
    btn.innerText = "⏳ Memproses...";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ action: "tambah", nama, paket, metode, email, wa }),
        headers: { "Content-Type": "text/plain" }
    })
    .then(() => {
        confetti({ borderRadius: 10, particleCount: 150, spread: 70, origin: { y: 0.6 } });
        document.querySelectorAll('.package-list, .form-container, .header p').forEach(el => el.style.display = 'none');
        
        const strukArea = document.getElementById('strukArea');
        const strukContent = document.getElementById('strukContent');
        
        strukArea.style.display = 'block';
        
        // Tampilkan info kontak sesuai metode yang dipilih
        let kontakInfo = (metode === 'WhatsApp') ? `WA       : ${wa}` : `EMAIL    : ${email}`;
        if(metode === 'Flashdisk') kontakInfo = `INFO     : Pakai Flashdisk`;

        strukContent.innerHTML = `
            ---------------------------<br>
            ORDER ID : #MB-${Math.floor(Math.random() * 9000) + 1000}<br>
            NAMA     : ${nama.toUpperCase()}<br>
            PAKET    : ${paket}<br>
            METODE   : ${metode}<br>
            ${kontakInfo}<br>
            STATUS   : MENUNGGU PEMBAYARAN<br>
            ---------------------------
        `;
    });
}

