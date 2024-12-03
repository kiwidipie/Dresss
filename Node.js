const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti sesuai username MySQL Anda
    password: '', // Ganti sesuai password MySQL Anda
    database: 'penjualan_baju'
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
    } else {
        console.log('Koneksi ke database berhasil!');
    }
});

// Endpoint untuk mendapatkan data produk
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint untuk menyimpan data transaksi
app.post('/add-transaction', (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    const sql = 'INSERT INTO transactions (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, product_id, quantity, total_price], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Transaksi berhasil disimpan!' });
    });
});

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
