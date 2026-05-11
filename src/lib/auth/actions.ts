"use server";

import { cookies } from "next/headers";
import { User, KYCStatus } from "@/types/user";

export async function setAuthSession(user: User, token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set("session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  cookieStore.set("user-data", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("kyc-status", user.kycStatus, {
    httpOnly: false, // Accessible by client for UI
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session-token");
  cookieStore.delete("user-data");
  cookieStore.delete("kyc-status");
}

export async function updateKycStatusCookie(status: KYCStatus) {
  const cookieStore = await cookies();
  cookieStore.set("kyc-status", status, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}
