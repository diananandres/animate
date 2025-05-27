import { useState, useEffect } from "react";
import TestDiagnostico from "@/app/fracciones/test-inicial/test_diagnostico";

const rangosNiveles = {
  básico: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  intermedio: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  avanzado: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
};

export default function Fracciones({ userId }) {
  const [testRealizado, setTestRealizado] = useState(null);
  const [nivelesDesbloqueados, setNivelesDesbloqueados] = useState([]);
  const [nivelGeneral, setNivelGeneral] = useState("");
  const [mostrarTest, setMostrarTest] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    fetch("/user/test-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alumno_id: userId, tema: "fracciones" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.test_realizado) {
          setTestRealizado(true);
          setNivelesDesbloqueados(data.niveles_desbloqueados);
          setNivelGeneral(data.nivel_general || "");
          setMostrarTest(false);
        } else {
          setTestRealizado(false);
          setMostrarTest(true);
        }
      });
  }, [userId]);

  function calcularPuntaje() {
    let correctas = 0;
    for (const id in respuestas) {
      if (respuestas[id].esCorrecta) correctas++;
    }
    setPuntaje(correctas);
    return correctas;
  }

  function determinarNiveles(score) {
    let nivel;
    if (score <= 7) nivel = "básico";
    else if (score <= 14) nivel = "intermedio";
    else nivel = "avanzado";
    return rangosNiveles[nivel];
  }

  function enviarResultados({ respuestas, preguntas }) {
    let score = 0;
    preguntas.forEach((p) => {
      if (
        respuestas[p.id] &&
        respuestas[p.id].trim().toLowerCase() === p.respuesta_correcta.trim().toLowerCase()
      ) {
        score += p.valor;
      }
    });
  
    const niveles = determinarNiveles(score);
  
    fetch("/user/guardar_test_diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        tema: "fracciones",
        score,
        niveles_desbloqueados: niveles,
        nivel_general: score <= 7 ? "básico" : score <= 14 ? "intermedio" : "avanzado",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setNivelesDesbloqueados(niveles);
        setNivelGeneral(score <= 7 ? "básico" : score <= 14 ? "intermedio" : "avanzado");
        setMostrarTest(false);
        setTestRealizado(true);
      });
  }  

  {mostrarTest && <TestDiagnostico tema="fracciones" onTerminar={enviarResultados} />}

  if (testRealizado) {
    return (
      <div>
        <h2>Nivel general: {nivelGeneral}</h2>
        <h3>Niveles desbloqueados</h3>
        <ul>
          {nivelesDesbloqueados.map((n) => (
            <li key={n}>Nivel {n}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>Cargando...</div>;
}
