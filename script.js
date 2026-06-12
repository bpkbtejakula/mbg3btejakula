// Gantilah tautan di bawah ini dengan URL Web App dari Google Apps Script Anda
const scriptURL = 'URL_WEB_APP_APPS_SCRIPT_ANDA';

const form = document.getElementById('pwaForm');
const btnSubmit = document.getElementById('btnSubmit');
const statusMessage = document.getElementById('statusMessage');

// Logika Pengiriman Form
form.addEventListener('submit', e => {
    e.preventDefault();
    
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Mengirim...';
    statusMessage.className = 'hidden';

    // Mengambil data dari input form
    const data = {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        pesan: document.getElementById('pesan').value
    };

    // Mengirim data ke Google Apps Script menggunakan fetch API
    fetch(scriptURL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.result === 'success') {
            statusMessage.innerText = 'Data Berhasil Dikirim!';
            statusMessage.className = 'success';
            form.reset();
        } else {
            throw new Error(result.error);
        }
    })
    .catch(error => {
        statusMessage.innerText = 'Gagal Mengirim Data. Coba lagi.';
        statusMessage.className = 'error';
        console.error('Error!', error.message);
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Kirim Data';
    });
});

// Registrasi Service Worker untuk fungsionalitas PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar successfully.', reg.scope))
            .catch(err => console.log('Service Worker gagal didaftarkan:', err));
    });
}
