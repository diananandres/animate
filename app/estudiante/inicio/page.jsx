export default function InicioEstudiante() {
    return (
      <main className="min-h-screen bg-orange-50 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold bg-orange-400 text-white px-10 py-2 rounded-full mb-8 shadow-md">
          MATEMÁTICAS
        </h1>
  
        <div className="space-y-4 w-full max-w-md">
          {[
            { label: "FRACCIONES", link: "/fracciones" },
            { label: "TEMA 2", link: "#" },
            { label: "TEMA 3", link: "#" },
          ].map((tema, i) => (
            <a
              key={i}
              href={tema.link}
              className="flex items-center justify-between bg-orange-400 text-white px-6 py-3 rounded-full shadow hover:bg-orange-500"
            >
              <span className="text-xl font-bold">{tema.label}</span>
              <span className="text-2xl">➡️</span>
            </a>
          ))}
        </div>
  
        <div className="mt-12 flex gap-16 items-center">
          <img src="/images/cuy.png" alt="cuy" className="w-24" />
          <img src="/images/capibara.png" alt="capibara" className="w-24" />
        </div>
      </main>
    );
  }
  