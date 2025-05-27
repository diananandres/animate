"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginEstudiante() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usuario, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar token en localStorage (o cookie segura)
      localStorage.setItem("token", data.token);

      // Redirigir al inicio del alumno
      router.push("/estudiante/inicio");
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative bg-orange-400 rounded-[2rem] p-10 w-full max-w-md shadow-xl">
        <a href="/" className="absolute -left top-8 bg-orange-300 rounded-full w-14 h-14 flex items-center justify-center shadow-md hover:bg-orange-500">
          <span className="text-3xl text-white">←</span>
        </a>

        <div className="flex justify-center mb-6">
          <img src="/images/libros.png" alt="Login" className="w-24 h-24 rounded-full shadow-md" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white font-bold block mb-1">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 rounded-full bg-orange-100 focus:outline-none text-black"
            />
          </div>
          <div>
            <label className="text-white font-bold block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-full bg-orange-100 focus:outline-none text-black"
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
