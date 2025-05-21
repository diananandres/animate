"use client";
import Image from "next/image";

export default function FraccionesNiveles() {
  const niveles = [1, 2, 3, 4, 5, 6]; // puedes extender fácilmente

  return (
    <main className="min-h-screen bg-orange-50 p-6 flex flex-col items-center">
      {/* Título y flecha */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <a
          href="/estudiante/inicio"
          className="bg-orange-300 rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-orange-400"
        >
          ←
        </a>
        <h1 className="bg-orange-400 text-white text-3xl font-bold px-8 py-2 rounded-full shadow">
          NIVELES: Fracciones
        </h1>
        <div className="w-12" /> {/* Espaciador para alinear */}
      </div>

      {/* Capybara y mensaje */}
      <div className="flex items-center gap-4 mb-6">
        <Image src="/images/cuy.png" alt="Cuy" width={60} height={60} />
        <div className="bg-orange-400 text-white px-6 py-2 rounded-full font-semibold shadow">
          Es hora de practicar!
        </div>
      </div>

      {/* Niveles scrolleables */}
      <div className="overflow-y-scroll h-[500px] w-full max-w-md px-4 py-4 space-y-10">
        {niveles.map((nivel, i) => (
          <div key={nivel} className="flex flex-col items-center relative">
            <a
              href={`/fracciones/nivel${nivel}`}
              className="bg-orange-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow hover:bg-orange-500"
            >
              {nivel}
            </a>
            {i !== niveles.length - 1 && (
              <div className="w-px h-12 bg-black my-2" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
