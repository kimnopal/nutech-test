# Information Module

## 1. GET /banner

API Banner Public (tidak memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan list banner

Ketentuan :

- Buat data list banner sesuai dokumentasi Response dibawah, usahakan banner ini tidak di hardcode, melainkan ambil dari database
- Tidak perlu membuatkan module CRUD banner
- Handling Response sesuai dokumentasi Response dibawah

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "banner_name": "Banner 1",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 2",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 3",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 4",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 5",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    {
      "banner_name": "Banner 6",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    }
  ]
}
```

## 2. GET /services

API Services Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan list Service/Layanan PPOB

Ketentuan :

- Buat data list Service/Layanan sesuai dokumentasi Response dibawah, usahakan data list Service atau Layanan ini tidak di hardcode, melainkan ambil dari database
- Tidak perlu membuatkan module CRUD Service/Layanan
- Handling Response sesuai dokumentasi Response dibawah

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "service_code": "PAJAK",
      "service_name": "Pajak PBB",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PLN",
      "service_name": "Listrik",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 10000
    },
    {
      "service_code": "PDAM",
      "service_name": "PDAM Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PULSA",
      "service_name": "Pulsa",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    {
      "service_code": "PGN",
      "service_name": "PGN Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "MUSIK",
      "service_name": "Musik Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "TV",
      "service_name": "TV Berlangganan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "PAKET_DATA",
      "service_name": "Paket data",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 50000
    },
    {
      "service_code": "VOUCHER_GAME",
      "service_name": "Voucher Game",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 100000
    },
    {
      "service_code": "VOUCHER_MAKANAN",
      "service_name": "Voucher Makanan",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 100000
    },
    {
      "service_code": "QURBAN",
      "service_name": "Qurban",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 200000
    },
    {
      "service_code": "ZAKAT",
      "service_name": "Zakat",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 300000
    }
  ]
}
```

#### 401

```json
{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
```
