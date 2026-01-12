export interface Banner {
  id: number;
  banner_name: string;
  banner_image: string;
  description: string;
  created_at: Date;
}

export interface BannerResponse {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface Service {
  id: number;
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
  created_at: Date;
}

export interface ServiceResponse {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}
