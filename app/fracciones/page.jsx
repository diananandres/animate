"use client";

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

  // Al montar, consultamos si el alumno ya hizo el test
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
          setNivelGeneral(data.nivel_general);
        } else {
          setTestRealizado(false);
        }
      })
      .catch(() => {
        // En caso de error, consideramos que no hizo el test
        setTestRealizado(false);
      });
  }, [userId]);

  // Cuando el TestDiagnostico llama a onTerminar
  const onTerminar = ({ preguntas, respuestas }) => {
    // Calculamos score
    const score = preguntas.reduce((sum, p) => {
      const respuesta = respuestas[p.id]?.trim().toLowerCase();
      const correcta = p.respuesta_correcta.trim().toLowerCase();
      return sum + (respuesta === correcta ? p.valor : 0);
    }, 0);

    // Determinamos nivel general y desbloqueos
    const claveNivel =
      score <= 7 ? "básico" : score <= 14 ? "intermedio" : "avanzado";
    const desbloqueados = rangosNiveles[claveNivel];

    // Guardamos en backend
    fetch("/user/guardar_test_diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        tema: "fracciones",
        score,
        niveles_desbloqueados: desbloqueados,
        nivel_general: claveNivel,
      }),
    })
      .then(() => {
        setTestRealizado(true);
        setNivelesDesbloqueados(desbloqueados);
        setNivelGeneral(claveNivel);
      })
      .catch((err) => {
        console.error("Error guardando diagnóstico:", err);
      });
  };

  // --- RENDERIZADO ---

  if (testRealizado === null) {
    return <div>Cargando…</div>;
  }

  if (testRealizado === false) {
    return (
      <TestDiagnostico tema="fracciones" onTerminar={onTerminar} />
    );
  }

  return (
    <div>
      <h2>Nivel general: {nivelGeneral}</h2>
      <h3>Niveles desbloqueados:</h3>
      <ul>
        {nivelesDesbloqueados.map((n) => (
          <li key={n}>Nivel {n}</li>
        ))}
      </ul>
    </div>
  );
}
