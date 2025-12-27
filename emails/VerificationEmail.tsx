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
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Secure Whisper – Email Verification</title>

        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYw.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>

      <Preview>Secure Whisper verification code: {otp}</Preview>

      <Section
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '32px',
          backgroundColor: '#ffffff',
          fontFamily: 'Roboto, Arial, sans-serif',
        }}
      >
        {/* Logo */}
        <Row style={{ textAlign: 'center', paddingBottom: '24px' }}>
          <Link href="#" style={{ display: 'inline-block', textDecoration: 'none' }}>
            <Img
              src="https://res.cloudinary.com/dku6otyj4/image/upload/v1766669943/secureWhisperLogo-Photoroom_yyinwl.png"
              alt=""
              aria-hidden="true"
              width="220"
              style={{
                display: 'block',
                margin: '0 auto',
                border: '0',
                outline: 'none',
              }}
            />
          </Link>
        </Row>

        {/* Greeting */}
        <Row>
          <Heading
            as="h2"
            style={{
              fontFamily: 'Inter, Helvetica, sans-serif',
              fontSize: '22px',
              margin: '0',
              paddingBottom: '16px',
            }}
          >
            Hello {username},
          </Heading>
        </Row>

        {/* Intro */}
        <Row>
          <Text
            style={{
              fontSize: '15px',
              lineHeight: '24px',
              margin: '0',
              paddingBottom: '16px',
            }}
          >
            Welcome to <strong>Secure Whisper</strong>. To complete your
            registration, please use the verification code below:
          </Text>
        </Row>

        {/* OTP */}
        <Row>
          <Text
            style={{
              fontFamily: 'Inter, Helvetica, sans-serif',
              fontSize: '28px',
              fontWeight: '600',
              letterSpacing: '4px',
              textAlign: 'center',
              margin: '0',
              padding: '24px 0',
            }}
          >
            {otp}
          </Text>
        </Row>

        {/* Expiry note */}
        <Row>
          <Text
            style={{
              fontSize: '14px',
              color: '#555',
              margin: '0',
              paddingBottom: '24px',
            }}
          >
            This code will expire shortly for security reasons. If you did not
            request this email, please ignore it.
          </Text>
        </Row>

        {/* Footer note */}
        <Row>
          <Text
            style={{
              fontSize: '12px',
              color: '#888',
              margin: '0',
              paddingTop: '16px',
              borderTop: '1px solid #eee',
            }}
          >
            This is an automated message from Secure Whisper. Please do not reply.
          </Text>
        </Row>

        {/* Copyright */}
        <Row>
          <Text
            style={{
              fontSize: '12px',
              color: '#aaa',
              textAlign: 'center',
              margin: '0',
              paddingTop: '16px',
            }}
          >
            © {new Date().getFullYear()} Secure Whisper. All rights reserved.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
