import { NextResponse } from "next/server";
import { Resend } from "resend";
import QuizEmail from "@/emails/QuizEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
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
    } = body;

    // Validation basique
    if (!lastName || !firstName || !email || !phone || !city) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    if (!formulaLabel) {
      return NextResponse.json(
        { error: "Aucun pack sélectionné." },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: process.env.EMAIL_TO || "contact@arthur-dev.eu",
      replyTo: email,
      subject: `🎯 Nouvelle demande de devis : ${formulaLabel} - ${firstName} ${lastName}`,
      react: QuizEmail({
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
      { success: true, message: "Devis envoyé avec succès !", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API /api/quiz:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
