import * as informationRepository from '../repositories/information.repository';
import { BannerResponse, ServiceResponse } from '../types/information.types';

export interface GetBannersResult {
  success: boolean;
  message: string;
  data?: BannerResponse[];
}

export interface GetServicesResult {
  success: boolean;
  message: string;
  data?: ServiceResponse[];
}

export async function getBanners(): Promise<GetBannersResult> {
  try {
    const banners = await informationRepository.getAllBanners();

    const bannerResponses: BannerResponse[] = banners.map((banner) => ({
      banner_name: banner.banner_name,
      banner_image: banner.banner_image,
      description: banner.description,
    }));

    return {
      success: true,
      message: 'Sukses',
      data: bannerResponses,
    };
  } catch (error) {
    console.error('Get banners error:', error);
    return {
      success: false,
      message: 'Gagal mengambil data banner',
    };
  }
}

export async function getServices(): Promise<GetServicesResult> {
  try {
    const services = await informationRepository.getAllServices();

    const serviceResponses: ServiceResponse[] = services.map((service) => ({
      service_code: service.service_code,
      service_name: service.service_name,
      service_icon: service.service_icon,
      service_tariff: service.service_tariff,
    }));

    return {
      success: true,
      message: 'Sukses',
      data: serviceResponses,
    };
  } catch (error) {
    console.error('Get services error:', error);
    return {
      success: false,
      message: 'Gagal mengambil data services',
    };
  }
}
