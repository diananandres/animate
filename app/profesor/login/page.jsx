"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginProfesor() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario && password) {
      router.push("/profesor/inicio");
    } else {
      alert("Completa los campos");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative bg-orange-400 rounded-[2rem] p-10 w-full max-w-md shadow-xl">
        {/* Botón atrás */}
        <a href="/" className="absolute -left top-8 bg-orange-300 rounded-full w-14 h-14 flex items-center justify-center shadow-md hover:bg-orange-500">
          <span className="text-3xl text-white">←</span>
        </a>

        {/* Imagen central */}
        <div className="flex justify-center mb-6">
          <img src="/images/libros.png" alt="Login" className="w-24 h-24 rounded-full shadow-md" />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white font-bold block mb-1">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 rounded-full bg-orange-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-white font-bold block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-full bg-orange-100 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-100 text-black font-semibold py-3 rounded-full mt-4 hover:bg-orange-200"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </main>
  );
}
