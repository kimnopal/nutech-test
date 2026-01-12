CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) UNIQUE NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_icon TEXT NOT NULL,
    service_tariff INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_code ON services(service_code);

INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES
    ('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PLN', 'PLN Prabayar', 'https://nutech-integrasi.app/dummy.jpg', 10000),
    ('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
    ('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
    ('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
    ('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000)
ON CONFLICT (service_code) DO NOTHING;
