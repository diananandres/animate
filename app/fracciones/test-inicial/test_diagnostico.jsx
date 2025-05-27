import { useEffect, useState } from "react";

export default function TestDiagnostico({ tema, onTerminar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({}); // { idPregunta: respuestaUsuario }

  useEffect(() => {
    fetch("/test/test-diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tema }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.preguntas) setPreguntas(data.preguntas);
      });
  }, [tema]);

  function manejarCambio(id, valor) {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  }

  function enviar() {
    onTerminar({ respuestas, preguntas });
  }

  if (!preguntas.length) return <p>Cargando preguntas...</p>;

  return (
    <div>
      <h3>Test diagnóstico - {tema}</h3>
      {preguntas.map((p) => (
        <div key={p.id} style={{ marginBottom: "15px" }}>
          <p>{p.enunciado}</p>
          <input
            type="text"
            placeholder="Tu respuesta"
            value={respuestas[p.id] || ""}
            onChange={(e) => manejarCambio(p.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={enviar}>Enviar respuestas</button>
    </div>
  );
}
