import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import ResetPasswordLink from "../../emails/ResetPasswordLink";

const FROM_ADDRESS = "Secure Whisper <no-reply@mail.securewhisper.ashishx.in>";
const SUBJECT = "Your Secure Whisper reset password link";

export async function sendPasswordResetLink(
  email: string,
  resetLink: string
): Promise<ApiResponse> {
  // Basic input guard (important in production)
  if (!email || !resetLink) {
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
      react: ResetPasswordLink({
        resetLink,
      }),
    });

    return {
      success: true,
      message: "Reset password email sent successfully",
    };
  } catch (error) {
    console.error(" Failed to send reset password email:", error);

    return {
      success: false,
      message: "Failed to send reset password email",
    };
  }
}
