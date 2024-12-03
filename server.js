const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi Midtrans
const core = new midtransClient.CoreApi({
  isProduction: false, // Ubah ke 'true' saat menggunakan mode produksi
  serverKey: 'YOUR_SERVER_KEY', // Server Key Anda
  clientKey: 'YOUR_CLIENT_KEY', // Client Key Anda
});

// Endpoint untuk membuat transaksi
app.post('/create-transaction', async (req, res) => {
  const { order_id, amount, email } = req.body;

  const chargeParams = {
    payment_type: 'credit_card', // Jenis pembayaran
    transaction_details: {
      order_id: order_id,
      gross_amount: amount,
    },
    customer_details: {
      email: email,
    },
  };

  try {
    const chargeResponse = await core.charge(chargeParams);
    res.status(200).json(chargeResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
