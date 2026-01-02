import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Img,
  Link,
} from "@react-email/components";

interface ResetPasswordLinkProps {
  resetLink: string;
}

const currentYear = new Date().getFullYear();

export default function ResetPasswordLink({
  resetLink,
}: ResetPasswordLinkProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Secure Whisper – Reset your password</title>

        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYw.woff2",
            format: "woff2",
          }}
        />
      </Head>

      <Preview>
        Reset your Secure Whisper password (expires in 10 minutes)
      </Preview>

      {/* Page background */}
      <Section
        style={{
          backgroundColor: "#f5f7fb",
          padding: "40px 0",
        }}
      >
        {/* Card */}
        <Section
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "32px",
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Row style={{ textAlign: "center", paddingBottom: "24px" }}>
            <Link href="#" style={{ textDecoration: "none" }}>
              <Img
                src="https://res.cloudinary.com/dku6otyj4/image/upload/v1766669943/secureWhisperLogo-Photoroom_yyinwl.png"
                alt="Secure Whisper"
                width="180"
                style={{ margin: "0 auto" }}
              />
            </Link>
          </Row>

          {/* Heading */}
          <Row>
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                fontWeight: "600",
                margin: "0 0 12px",
                color: "#111827",
              }}
            >
              Reset your password
            </Heading>
          </Row>

          {/* Message */}
          <Row>
            <Text
              style={{
                fontSize: "15px",
                lineHeight: "24px",
                margin: "0 0 20px",
                color: "#374151",
              }}
            >
              We received a request to reset your Secure Whisper password.
              Click the button below to choose a new password and regain access
              to your account.
            </Text>
          </Row>

          {/* Expiry Notice */}
          <Row>
            <Section
              style={{
                backgroundColor: "#eef2ff",
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "24px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  color: "#3730a3",
                  margin: "0",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                ⏳ This password reset link will expire in{" "}
                <strong>10 minutes</strong> for your security.
              </Text>
            </Section>
          </Row>

          {/* Reset Button */}
          <Row>
            <Section style={{ textAlign: "center", margin: "24px 0" }}>
              <Link
                href={resetLink}
                style={{
                  display: "inline-block",
                  backgroundColor: "#4338ca",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "600",
                  textDecoration: "none",
                  padding: "14px 36px",
                  borderRadius: "8px",
                }}
              >
                Reset Password
              </Link>
            </Section>
          </Row>

          {/* Fallback link */}
          <Row>
            <Text
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textAlign: "center",
                margin: "0 0 24px",
              }}
            >
              If the button doesn’t work, copy and paste this link into your
              browser:
              <br />
              <Link
                href={resetLink}
                style={{ color: "#4338ca", wordBreak: "break-all" }}
              >
                {resetLink}
              </Link>
            </Text>
          </Row>

          {/* Security note */}
          <Row>
            <Text
              style={{
                fontSize: "14px",
                color: "#4b5563",
                margin: "0 0 24px",
              }}
            >
              If you didn’t request a password reset, you can safely ignore
              this email. Your account will remain secure.
            </Text>
          </Row>

          {/* Footer */}
          <Row>
            <Text
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
                margin: "16px 0 0",
              }}
            >
              © {currentYear} Secure Whisper. All rights reserved.
            </Text>
          </Row>
        </Section>
      </Section>
    </Html>
  );
}
