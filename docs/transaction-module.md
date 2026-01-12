# Transaction Module

## 1. GET /balance

API Balance Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Handling Response sesuai dokumentasi Response dibawah

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Get Balance Berhasil",
  "data": {
    "balance": 1000000
  }
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

## 2. POST /topup

API Topup Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk melakukan top up balance / saldo dari User

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Setiap kali melakukan Top Up maka balance / saldo dari User otomatis bertambah
- Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0
- Pada saat Top Up set transaction_type di database menjadi TOPUP
  Handling Response sesuai dokumentasi Response dibawah

### Request Body

```json
{
  "top_up_amount": 1000000
}
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Top Up Balance berhasil",
  "data": {
    "balance": 2000000
  }
}
```

#### 400

```json
{
  "status": 102,
  "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  "data": null
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

## 3. POST /transaction

API Transaction Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk melakukan transaksi dari services / layanan yang tersedia

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi
- Pada saat Transaction set transaction_type di database menjadi PAYMENT
- Handling Response sesuai dokumentasi Response dibawah
- Response invoice_number untuk formatnya generate bebas

### Request Body

```json
{
  "service_code": "PULSA"
}
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Transaksi berhasil",
  "data": {
    "invoice_number": "INV17082023-001",
    "service_code": "PLN_PRABAYAR",
    "service_name": "PLN Prabayar",
    "transaction_type": "PAYMENT",
    "total_amount": 10000,
    "created_on": "2023-08-17T10:10:10.000Z"
  }
}
```

#### 400

```json
{
  "status": 102,
  "message": "Service ataus Layanan tidak ditemukan",
  "data": null
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

## 4. GET /transaction/history

API History Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi history transaksi

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Terdapat parameter limit yang bersifat opsional, jika limit tidak dikirim maka tampilkan semua data
- Data di order dari yang paling baru berdasarkan transaction date (created_on)
- Handling Response sesuai dokumentasi Response dibawah

### Query Parameters

- offset
  integer
  (query)
- limit
  integer
  (query)

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Get History Berhasil",
  "data": {
    "offset": 0,
    "limit": 3,
    "records": [
      {
        "invoice_number": "INV17082023-001",
        "transaction_type": "TOPUP",
        "description": "Top Up balance",
        "total_amount": 100000,
        "created_on": "2023-08-17T10:10:10.000Z"
      },
      {
        "invoice_number": "INV17082023-002",
        "transaction_type": "PAYMENT",
        "description": "PLN Pascabayar",
        "total_amount": 10000,
        "created_on": "2023-08-17T11:10:10.000Z"
      },
      {
        "invoice_number": "INV17082023-003",
        "transaction_type": "PAYMENT",
        "description": "Pulsa Indosat",
        "total_amount": 40000,
        "created_on": "2023-08-17T12:10:10.000Z"
      }
    ]
  }
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
