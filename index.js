const express = require('express');
const TronWeb = require('tronweb');
const app = express();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

// Debug: cek environment variables
console.log('PRIVATE_KEY:', PRIVATE_KEY ? 'ada' : 'tidak ada');
console.log('DESTINATION_ADDRESS:', DESTINATION_ADDRESS ? 'ada' : 'tidak ada');

if (!PRIVATE_KEY || !DESTINATION_ADDRESS) {
  console.error('ERROR: Environment variables PRIVATE_KEY dan DESTINATION_ADDRESS harus diisi!');
  process.exit(1);
}

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  privateKey: PRIVATE_KEY,
});

let running = false;

async function drain() {
  if (running) return;
  running = true;

  try {
    const from = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
    const contract = await tronWeb.contract().at(USDT_CONTRACT);

    const usdt = await contract.methods.balanceOf(from).call();
    if (usdt > 0) {
      await contract.methods.transfer(DESTINATION_ADDRESS, usdt).send({ feeLimit: 1_000_000 });
      console.log(`[USDT] Dikirim ${usdt}`);
    }

    const trx = await tronWeb.trx.getBalance(from);
    if (trx > 10000) {
      const tx = await tronWeb.transactionBuilder.sendTrx(DESTINATION_ADDRESS, trx - 5000, from);
      const signed = await tronWeb.trx.sign(tx);
      await tronWeb.trx.sendRawTransaction(signed);
      console.log(`[TRX] Dikirim ${trx - 5000}`);
    }
  } catch (e) {
    console.error('[ERROR]', e);
  }

  running = false;
}

setInterval(drain, 30000); // Jalankan setiap 30 detik

// Keep-alive ping
app.get('/', (req, res) => res.send('Auto-drain wallet aktif.'));
app.listen(process.env.PORT || 3000);
