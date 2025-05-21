"use client";
import { useState } from "react";

export default function TestEntradaFracciones() {
  const [respuesta, setRespuesta] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState("30 / 15");
  const [resultado, setResultado] = useState(null);

  const opciones = ["30*15", "30 / 15", "30 - 15"];

  const verificar = (op) => {
    setRespuesta(op);
    if (op === respuestaCorrecta) {
      setResultado("correcta");
      setTimeout(() => {
        // Aquí redirigiríamos al siguiente ejercicio o al nivel detectado
        alert("¡Correcto! Vamos al siguiente ejercicio...");
        // router.push("/fracciones/nivel2") o similar
      }, 1000);
    } else {
      setResultado("incorrecta");
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 p-6 flex flex-col items-center justify-center gap-10">
      {/* Capibara y mensaje */}
      <div className="flex gap-8 items-center">
        <img src="/images/capibara.png" className="w-28" />
        <div className="bg-white border-2 border-black px-6 py-4 rounded-xl shadow text-xl font-semibold">
          Primero un pequeño test de conocimiento
        </div>
      </div>

      {/* Texto introductorio */}
      <div className="bg-orange-400 p-6 rounded-3xl shadow-lg text-white text-center max-w-md">
        <h2 className="text-2xl font-bold mb-2">Test de entrada !!</h2>
        <p className="text-lg font-semibold">Esta es solo una prueba para saber en qué nivel estás :D</p>
      </div>

      {/* Ejercicio */}
      <div className="bg-orange-400 p-6 rounded-3xl text-white max-w-md text-center font-semibold shadow-lg">
        <p>
          Sara y sus amigos planean ir al cine después de la escuela. Cada entrada cuesta S/ 15.
          <br /> Sara tiene S/ 30, ¿cuántas entradas puede comprar si lleva todo su dinero?
        </p>
      </div>

      {/* Opciones */}
      <div className="flex gap-6">
        {opciones.map((op, i) => (
          <button
            key={i}
            onClick={() => verificar(op)}
            className={`px-6 py-2 rounded-full text-white font-bold transition
              ${
                respuesta === op
                  ? op === respuestaCorrecta
                    ? "bg-green-600"
                    : "bg-red-500"
                  : "bg-orange-400 hover:bg-orange-500"
              }`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {resultado === "incorrecta" && (
        <div className="text-red-600 font-semibold mt-4">¡Vuelve a intentarlo!</div>
      )}
    </main>
  );
}
