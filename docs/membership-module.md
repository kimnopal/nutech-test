# Membership module

## 1. POST /registration

API Registration Public (Tidak perlu Token untuk mengaksesnya)
Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi
Ketentuan :

- Parameter request email harus terdapat validasi format email
- Parameter request password Length minimal 8 karakter
- Handling Response sesuai dokumentasi Response dibawah

### Request Body

```json
{
  "email": "user@nutech-integrasi.com",
  "first_name": "User",
  "last_name": "Nutech",
  "password": "abcdef1234"
}
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Registrasi berhasil silahkan login",
  "data": null
}
```

#### 400

```json
{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}
```

## 2. POST /login

API Login Public (Tidak perlu Token untuk mengaksesnya)

Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)

Ketentuan :

- Parameter request email harus terdapat validasi format email
- Parameter request password Length minimal 8 karakter
- JWT yang digenerate harus memuat payload email dan di set expiration selama 12 jam dari waktu di generate
- Handling Response sesuai dokumentasi Response dibawah

### Request Body

```json
{
  "email": "user@nutech-integrasi.com",
  "password": "abcdef1234"
}
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Login Sukses",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U"
  }
}
```

#### 400

```json
{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}
```

#### 401

```json
{
  "status": 103,
  "message": "Username atau password salah",
  "data": null
}
```

## 3. GET /profile

API Profile Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mendapatkan informasi profile User

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Handling Response sesuai dokumentasi Response dibawah

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Sukses",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User",
    "last_name": "Nutech",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
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

## 4. PUT /profile/update

API Update Profile Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mengupdate data profile User

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Handling Response sesuai dokumentasi Response dibawah

### Request Body

```json
{
  "first_name": "User Edited",
  "last_name": "Nutech Edited"
}
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Update Pofile berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
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

## 5. PUT /profile/image

API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)

Digunakan untuk mengupdate / upload profile image User

Ketentuan :

- Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
- Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
- Format Image yang boleh di upload hanya jpeg dan png
- Handling Response sesuai dokumentasi Response dibawah

### Request Body

```json
multipart/form-data

file
string($binary)
```

### Responses

#### 200

```json
{
  "status": 0,
  "message": "Update Profile Image berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile-updated.jpeg"
  }
}
```

#### 400

```json
{
  "status": 102,
  "message": "Format Image tidak sesuai",
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
