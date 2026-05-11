import { cookies } from "next/headers";
import { Session } from "@/types/auth";
import { KYCStatus } from "@/types/user";

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token");

  if (!sessionToken) {
    return null;
  }

  // In a real app, we would verify the token. 
  // For this mock, we'll store user info in another cookie or parse the token if it's a JWT.
  const userCookie = cookieStore.get("user-data");
  const kycStatus = (cookieStore.get("kyc-status")?.value as KYCStatus) || "Unverified";

  if (!userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie.value);
    return {
      user,
      isAuthenticated: true,
      kycStatus,
    };
  } catch {
    return null;
  }
}
