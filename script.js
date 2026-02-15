const url = "https://script.google.com/macros/s/AKfycbwKdfwftlqefkK8iSH_zSFN83fBGdTlIFeFWoL0eIca-AzUscdnNVSeBAI-CydooFwTAw/exec";

function toggleKontak() {
    const metode = document.getElementById('metode').value;
    const box = document.getElementById('inputKontakBox');
    const label = document.getElementById('labelKontak');
    const input = document.getElementById('kontak');

    if (metode === 'Flashdisk') {
        box.style.display = 'none';
    } else {
        box.style.display = 'block';
        label.innerText = (metode === 'WhatsApp') ? 'Nomor WhatsApp' : 'Alamat Email';
        input.placeholder = (metode === 'WhatsApp') ? '0812...' : 'contoh@gmail.com';
    }
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
    const cetak = document.getElementById('opsiCetak').value;
    const metode = document.getElementById('metode').value;
    const kontak = document.getElementById('kontak').value || "-";
    const btn = document.getElementById('btnOrder');

    if(!nama || !paket) { alert("Isi nama dan pilih paket dulu!"); return; }

    btn.disabled = true;
    btn.innerText = "⏳ Memproses...";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ action: "tambah", nama, paket, cetak, metode, kontak }),
        headers: { "Content-Type": "text/plain" }
    })
    .then(() => {
        confetti({ borderRadius: 10, particleCount: 150, spread: 70, origin: { y: 0.6 } });
        document.querySelectorAll('.package-list, .form-container, .header p').forEach(el => el.style.display = 'none');
        document.getElementById('strukArea').style.display = 'block';
        document.getElementById('strukContent').innerHTML = `
            ---------------------------<br>
            NAMA     : ${nama.toUpperCase()}<br>
            PAKET    : ${paket}<br>
            CETAK    : ${cetak}<br>
            KIRIM VIA: ${metode}<br>
            KONTAK   : ${kontak}<br>
            ---------------------------
        `;
    });
}
