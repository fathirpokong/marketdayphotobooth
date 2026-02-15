const url = "https://script.google.com/macros/s/AKfycbwJBfxBH_MroTeO7z-96RY-voneo7awzODNjGRpqsdds-ymrnHcH0akDZFun5ZL2uc-Kg/exec";

function toggleEmail() {
    const metode = document.getElementById('metode').value;
    document.getElementById('inputEmailBox').style.display = (metode === 'Email') ? 'block' : 'none';
}

function selectPkg(val, price, el) {
    document.getElementById('selectedPackage').value = val;
    document.querySelectorAll('.package-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
}

function kirimData() {
    const nama = document.getElementById('nama').value;
    const telp = document.getElementById('telepon').value;
    const paket = document.getElementById('selectedPackage').value;
    const metode = document.getElementById('metode').value;
    const email = document.getElementById('email').value || "-";
    const btn = document.getElementById('btnOrder');

    if(!nama || !paket || !telp) return alert("Isi data lengkap & pilih paket!");

    btn.disabled = true;
    btn.innerText = "⏳ Mengirim...";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
            action: "tambah", 
            nama, 
            paket, 
            metode: `${metode} (${telp})`, 
            email 
        }),
    }).then(() => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        document.getElementById('orderForm').style.display = 'none';
        document.querySelector('.package-list').style.display = 'none';
        
        document.getElementById('strukArea').style.display = 'block';
        document.getElementById('strukContent').innerHTML = `
            <div class="line">-----------------------</div>
            <b>NAMA:</b> ${nama.toUpperCase()}<br>
            <b>WA:</b> ${telp}<br>
            <b>PAKET:</b> ${paket}<br>
            <b>METODE:</b> ${metode}<br>
            <div class="line">-----------------------</div>
            <b>TOTAL BAYAR:</b> Rp ${paket == 'Paket A' ? '5.000' : paket == 'Paket B' ? '8.000' : '10.000'}
        `;
    });
}
