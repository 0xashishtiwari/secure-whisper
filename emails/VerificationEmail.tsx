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

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const currentYear = new Date().getFullYear();

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Secure Whisper – Verify your email</title>

        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYw.woff2",
            format: "woff2",
          }}
          fontWeight={400}
        />
      </Head>

      <Preview>Your Secure Whisper verification code: {otp}</Preview>

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
              Verify your email
            </Heading>
          </Row>

          {/* Greeting */}
          <Row>
            <Text
              style={{
                fontSize: "15px",
                lineHeight: "24px",
                margin: "0 0 16px",
                color: "#374151",
              }}
            >
              Hi <strong>{username}</strong>, <br />
              Use the code below to finish setting up your Secure Whisper
              account.
            </Text>
          </Row>

          {/* OTP Box */}
          <Row>
            <Section
              style={{
                backgroundColor: "#eef2ff",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                margin: "24px 0",
              }}
            >
              <Text
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  letterSpacing: "6px",
                  margin: "0",
                  color: "#4338ca",
                }}
              >
                {otp}
              </Text>
            </Section>
          </Row>

          {/* Expiry */}
          <Row>
            <Text
              style={{
                fontSize: "14px",
                color: "#4b5563",
                margin: "0 0 24px",
              }}
            >
              This code expires shortly for your security. If you didn’t request
              this email, you can safely ignore it.
            </Text>
          </Row>

          {/* Trust note */}
          <Row>
            <Text
              style={{
                fontSize: "13px",
                color: "#6b7280",
                margin: "0",
                paddingTop: "16px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              🔒 Secure Whisper never shares or stores sender identities.
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
