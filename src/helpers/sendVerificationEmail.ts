import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

const FROM_ADDRESS = "Secure Whisper <no-reply@mail.securewhisper.ashishx.in>";
const SUBJECT = "Your Secure Whisper verification code";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  // Basic input guard (important in production)
  if (!email || !username || !verifyCode) {
    return {
      success: false,
      message: "Missing required email parameters",
    };
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: SUBJECT,
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error(" Failed to send verification email:", error);

    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
