import { query, PreparedQuery } from '../config/database';
import { Banner, Service } from '../types/information.types';

export async function getAllBanners(): Promise<Banner[]> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id, banner_name, banner_image, description, created_at
      FROM banners
      ORDER BY id ASC
    `,
  };

  const result = await query<Banner>(preparedQuery);
  return result.rows;
}

export async function getAllServices(): Promise<Service[]> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id, service_code, service_name, service_icon, service_tariff, created_at
      FROM services
      ORDER BY id ASC
    `,
  };

  const result = await query<Service>(preparedQuery);
  return result.rows;
}
