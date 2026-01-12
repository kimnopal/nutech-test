import * as userRepository from "../repositories/user.repository";
import { UserProfile } from "../types/membership.types";
import { deleteUploadedFile } from "../utils/file.util";
import { getImageUrl } from "../config/multer";

export interface ProfileResult {
  success: boolean;
  message: string;
  profile?: UserProfile;
}

function transformProfileWithImageUrl(profile: UserProfile): UserProfile {
  return {
    ...profile,
    profile_image: profile.profile_image
      ? getImageUrl(profile.profile_image)
      : null,
  };
}

export async function getProfile(email: string): Promise<ProfileResult> {
  const profile = await userRepository.getUserProfile(email);

  if (!profile) {
    return {
      success: false,
      message: "User tidak ditemukan",
    };
  }

  return {
    success: true,
    message: "Sukses",
    profile: transformProfileWithImageUrl(profile),
  };
}

export async function updateProfile(
  email: string,
  firstName: string,
  lastName: string
): Promise<ProfileResult> {
  const updatedProfile = await userRepository.updateUserProfile(
    email,
    firstName,
    lastName
  );

  if (!updatedProfile) {
    return {
      success: false,
      message: "Gagal update profile",
    };
  }

  return {
    success: true,
    message: "Update Pofile berhasil",
    profile: transformProfileWithImageUrl(updatedProfile),
  };
}

export async function updateProfileImage(
  email: string,
  filename: string
): Promise<ProfileResult> {
  const currentProfile = await userRepository.getUserProfile(email);
  const oldFilename = currentProfile?.profile_image;

  const updatedProfile = await userRepository.updateUserProfileImage(
    email,
    filename
  );

  if (!updatedProfile) {
    return {
      success: false,
      message: "Gagal update profile image",
    };
  }

  if (oldFilename) {
    deleteUploadedFile(oldFilename);
  }

  return {
    success: true,
    message: "Update Profile Image berhasil",
    profile: transformProfileWithImageUrl(updatedProfile),
  };
}
