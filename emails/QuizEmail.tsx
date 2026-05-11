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

interface QuizEmailProps {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  company?: string;
  city: string;
  details?: string;
  projectType: string;
  formulaLabel: string;
  formulaPrice: string;
  formulaDelay: string;
  formulaFeatures: string[];
}

export default function QuizEmail({
  lastName,
  firstName,
  email,
  phone,
  company,
  city,
  details,
  projectType,
  formulaLabel,
  formulaPrice,
  formulaDelay,
  formulaFeatures,
}: QuizEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Nouvelle demande de devis : {formulaLabel} - {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎯 Nouvelle Demande de Devis</Heading>
            <Text style={badge}>{formulaLabel}</Text>
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
            {company && (
              <Text style={text}>
                <strong>Entreprise :</strong> {company}
              </Text>
            )}
            <Text style={text}>
              <strong>Localisation :</strong> {city}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Project Details */}
          <Section style={section}>
            <Heading style={h2}>📦 Pack Sélectionné</Heading>
            <div style={packCard}>
              <Text style={packTitle}>{formulaLabel}</Text>
              <Text style={packSubtitle}>Type de projet : {projectType}</Text>
              <div style={packInfo}>
                <div style={packInfoItem}>
                  <Text style={packInfoLabel}>💰 Prix</Text>
                  <Text style={packInfoValue}>{formulaPrice}</Text>
                </div>
                <div style={packInfoItem}>
                  <Text style={packInfoLabel}>⏱️ Délai</Text>
                  <Text style={packInfoValue}>{formulaDelay}</Text>
                </div>
              </div>
            </div>

            <Heading style={h3}>✨ Fonctionnalités incluses</Heading>
            <ul style={featuresList}>
              {formulaFeatures.map((feature, index) => (
                <li key={index} style={featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          {/* Additional Details */}
          {details && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>💬 Détails supplémentaires</Heading>
                <Text style={detailsText}>{details}</Text>
              </Section>
            </>
          )}

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Cette demande a été envoyée via le configurateur de shiftagency-siteweb
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
  margin: "0 0 16px",
  lineHeight: "1.2",
};

const badge = {
  display: "inline-block",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "600",
  padding: "6px 14px",
  borderRadius: "20px",
  margin: "0",
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

const h3 = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "600",
  margin: "24px 0 12px",
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

const packCard = {
  backgroundColor: "#F7F9FC",
  border: "2px solid #062783",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
};

const packTitle = {
  color: "#111111",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 8px",
};

const packSubtitle = {
  color: "#64748B",
  fontSize: "14px",
  margin: "0 0 20px",
};

const packInfo = {
  display: "flex",
  gap: "24px",
  marginTop: "16px",
};

const packInfoItem = {
  flex: "1",
};

const packInfoLabel = {
  color: "#64748B",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const packInfoValue = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0",
};

const featuresList = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
};

const featureItem = {
  backgroundColor: "#F7F9FC",
  color: "#334155",
  fontSize: "14px",
  lineHeight: "1.5",
  padding: "12px 16px",
  marginBottom: "8px",
  borderRadius: "8px",
  borderLeft: "3px solid #062783",
};

const detailsText = {
  color: "#334155",
  fontSize: "15px",
  lineHeight: "1.8",
  backgroundColor: "#F7F9FC",
  padding: "20px",
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
