// game.js

// 1. Ambil semua elemen HTML yang dibutuhkan
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const container = document.querySelector('.container');

// Tombol reset akan dibuat secara dinamis, tapi kita sediakan variabelnya
let resetButton;

// 2. Variabel utama game
let randomNumber = Math.floor(Math.random() * 100) + 1; // Angka acak antara 1 sampai 100
let guessCount = 1;

// 3. Fungsi utama untuk memeriksa tebakan
function checkGuess() {
    // Ambil nilai tebakan dari input dan konversi ke integer
    const userGuess = Number(guessField.value);

    // Tampilkan tebakan sebelumnya
    if (guessCount === 1) {
        guesses.textContent = 'Tebakan Sebelumnya: ';
    }
    guesses.textContent += userGuess + ' ';

    // Cek apakah tebakan sudah benar (Game Over - Menang)
    if (userGuess === randomNumber) {
        lastResult.textContent = '🎉 Selamat! Anda Berhasil Menebak Angka Rahasia!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } 
    // Cek apakah tebakan sudah mencapai batas (Game Over - Kalah)
    else if (guessCount === 10) {
        lastResult.textContent = '😢 GAME OVER! Anda kehabisan kesempatan.';
        lowOrHi.textContent = `Angka rahasianya adalah ${randomNumber}.`;
        setGameOver();
    } 
    // Jika tebakan salah (Lanjutkan Game)
    else {
        lastResult.textContent = 'Salah!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Terlalu Rendah! Coba lagi.';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Terlalu Tinggi! Coba lagi.';
        }
    }

    // Persiapan untuk tebakan berikutnya
    guessCount++;
    guessField.value = ''; // Kosongkan input
    guessField.focus(); // Fokuskan kembali ke input
}

// 4. Tambahkan event listener ke tombol "Tebak"
guessSubmit.addEventListener('click', checkGuess);

// 5. Fungsi untuk mengakhiri dan me-reset game
function setGameOver() {
    // Nonaktifkan input dan tombol tebak
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // Tampilkan tombol reset
    // Kita gunakan elemen yang sudah ada di HTML dan hanya menampilkannya
    resetButton = document.querySelector('.resetButton'); 
    resetButton.style.display = 'block';

    // Tambahkan event listener untuk tombol reset
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    // Reset hitungan tebakan dan konten teks
    guessCount = 1;
    const resultParas = document.querySelectorAll('.result-area p');
    for (const resultPara of resultParas) {
        resultPara.textContent = '';
    }

    // Hilangkan tombol reset dan aktifkan input/tombol tebak
    resetButton.style.display = 'none';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    // Reset warna background
    lastResult.style.backgroundColor = 'inherit';

    // Buat angka acak baru
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
