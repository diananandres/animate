export default function Nivel1() {
    return (
      <main className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-xl font-bold mb-2">Ejercicio 1 - Fracciones</h2>
        <p className="mb-4">Juan tiene 12 canicas y gana 3 por cada partida. ¿Cuál es la ecuación?</p>
        <div className="space-y-2">
          <button className="bg-white px-4 py-2 border rounded hover:bg-gray-100">Ec = 12 + 3x</button>
          <button className="bg-white px-4 py-2 border rounded hover:bg-gray-100">Ec = 12x + 3</button>
          <button className="bg-white px-4 py-2 border rounded hover:bg-gray-100">Ec = 12 * 3</button>
        </div>
      </main>
    );
  }
  