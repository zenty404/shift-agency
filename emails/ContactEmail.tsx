import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  message: string;
}

export default function ContactEmail({
  lastName,
  firstName,
  email,
  phone,
  company,
  sector,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Nouveau message de contact : {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>📩 Nouveau Message de Contact</Heading>
          </Section>

          {/* Contact Info */}
          <Section style={section}>
            <Heading style={h2}>👤 Informations Client</Heading>
            <Text style={text}>
              <strong>Nom :</strong> {lastName}
            </Text>
            <Text style={text}>
              <strong>Prénom :</strong> {firstName}
            </Text>
            <Text style={text}>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
            <Text style={text}>
              <strong>Téléphone :</strong>{" "}
              <a href={`tel:${phone}`} style={link}>
                {phone}
              </a>
            </Text>
            <Text style={text}>
              <strong>Entreprise :</strong> {company}
            </Text>
            <Text style={text}>
              <strong>Secteur :</strong> {sector}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Message */}
          <Section style={section}>
            <Heading style={h2}>💬 Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Ce message a été envoyé via le formulaire de contact de shiftagency-siteweb
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 40px",
  backgroundColor: "#062783",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0",
  lineHeight: "1.2",
};

const section = {
  padding: "32px 40px",
};

const h2 = {
  color: "#111111",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const text = {
  color: "#334155",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "8px 0",
};

const link = {
  color: "#062783",
  textDecoration: "none",
  fontWeight: "500",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "0",
};

const messageText = {
  color: "#334155",
  fontSize: "15px",
  lineHeight: "1.8",
  backgroundColor: "#F7F9FC",
  padding: "24px",
  borderRadius: "8px",
  borderLeft: "4px solid #062783",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "24px 40px",
  backgroundColor: "#f6f9fc",
  borderRadius: "0 0 8px 8px",
};

const footerText = {
  color: "#64748B",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
};
