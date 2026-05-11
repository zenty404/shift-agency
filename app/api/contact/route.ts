import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { lastName, firstName, email, phone, company, sector, message } = body;

    // Validation basique
    if (!lastName || !firstName || !email || !phone || !company || !sector || !message) {
      return NextResponse.json(
        { error: "Tous les champs doivent être remplis." },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: process.env.EMAIL_TO || "contact@arthur-dev.eu",
      replyTo: email,
      subject: `📩 Nouveau message de contact : ${firstName} ${lastName}`,
      react: ContactEmail({
        lastName,
        firstName,
        email,
        phone,
        company,
        sector,
        message,
      }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès !", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API /api/contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
