# Auto-Drain Wallet (TRX + USDT) - Railway Deployment

Skrip ini secara otomatis mengirim seluruh TRX & USDT dari wallet kamu ke alamat tujuan setiap 30 detik. Cocok untuk anti-hack emergency wallet recovery.

## 🚀 Cara Deploy ke Railway

1. Masuk ke https://railway.app
2. Pilih "New Project" > "Deploy from GitHub repo" atau "Deploy from ZIP"
3. Masukkan Environment Variables:
   - `PRIVATE_KEY`: Private key TRON wallet kamu
   - `DESTINATION_ADDRESS`: Alamat tujuan aman

## ⚠️ Penting
- Jangan pernah menyimpan private key di file `.js` langsung.
- Gunakan `.env` dan Railway secret manager.