import { query, PreparedQuery } from "../config/database";
import { User, UserProfile } from "../types/membership.types";

export async function createUser(
  email: string,
  hashedPassword: string,
  firstName: string,
  lastName: string
): Promise<User> {
  const preparedQuery: PreparedQuery = {
    text: `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, password, first_name, last_name, profile_image, created_at, updated_at
    `,
    values: [email, hashedPassword, firstName, lastName],
  };

  const result = await query<User>(preparedQuery);
  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id, email, password, first_name, last_name, profile_image, created_at, updated_at
      FROM users
      WHERE email = $1
    `,
    values: [email],
  };

  const result = await query<User>(preparedQuery);
  return result.rows[0] || null;
}

export async function findUserById(id: number): Promise<User | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id, email, password, first_name, last_name, profile_image, created_at, updated_at
      FROM users
      WHERE id = $1
    `,
    values: [id],
  };

  const result = await query<User>(preparedQuery);
  return result.rows[0] || null;
}

export async function getUserProfile(
  email: string
): Promise<UserProfile | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT email, first_name, last_name, profile_image
      FROM users
      WHERE email = $1
    `,
    values: [email],
  };

  const result = await query<UserProfile>(preparedQuery);
  return result.rows[0] || null;
}

export async function updateUserProfile(
  email: string,
  firstName: string,
  lastName: string
): Promise<UserProfile | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      UPDATE users
      SET first_name = $1, last_name = $2, updated_at = NOW()
      WHERE email = $3
      RETURNING email, first_name, last_name, profile_image
    `,
    values: [firstName, lastName, email],
  };

  const result = await query<UserProfile>(preparedQuery);
  return result.rows[0] || null;
}

export async function updateUserProfileImage(
  email: string,
  profileImage: string
): Promise<UserProfile | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      UPDATE users
      SET profile_image = $1, updated_at = NOW()
      WHERE email = $2
      RETURNING email, first_name, last_name, profile_image
    `,
    values: [profileImage, email],
  };

  const result = await query<UserProfile>(preparedQuery);
  return result.rows[0] || null;
}

// export async function emailExists(email: string): Promise<boolean> {
//   const preparedQuery: PreparedQuery = {
//     text: `
//       SELECT 1 FROM users WHERE email = $1 LIMIT 1
//     `,
//     values: [email],
//   };

//   const result = await query(preparedQuery);
//   return result.rows.length > 0;
// }
