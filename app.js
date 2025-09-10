const form = document.getElementById("citaForm");
const startInput = document.getElementById("startLocal");
const endInput = document.getElementById("endLocal");
const errorsDiv = document.getElementById("errors");
const resultDiv = document.getElementById("result");

function localDatetimeToUTCiso(localDatetime) {
  if (!localDatetime) return null;
  const d = new Date(localDatetime);
  return d.toISOString(); // UTC
}

function formatForUTC(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return (
    d.toLocaleString("en-GB", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) + " UTC"
  );
}

function formatForPeru(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString("es-PE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  errorsDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  const startLocal = startInput.value;
  const endLocal = endInput.value;
  const errors = [];

  if (!startLocal) errors.push("El inicio es obligatorio");
  if (!endLocal) errors.push("El fin es obligatorio");

  if (startLocal && endLocal) {
    const s = new Date(startLocal);
    const e = new Date(endLocal);
    if (e <= s) errors.push("La hora fin debe ser posterior al inicio");
  }

  if (errors.length) {
    errorsDiv.innerHTML = errors.join("<br>");
    return;
  }

  const startUTC = localDatetimeToUTCiso(startLocal);
  const endUTC = localDatetimeToUTCiso(endLocal);

  const payload = {
    sala: "Sala 3",
    startTime: startUTC,
    endTime: endUTC
  };

  // Mostrar resultado
  resultDiv.innerHTML = `
    <h3>Payload enviado (UTC)</h3>
    <pre>${JSON.stringify(payload, null, 2)}</pre>

    <h4>Visualización de la cita</h4>
    <div><strong>Inicio (UTC):</strong> ${formatForUTC(startUTC)}</div>
    <div><strong>Inicio (Hora Perú):</strong> ${formatForPeru(startUTC)}</div>
    <div style="margin-top:8px;"><strong>Fin (UTC):</strong> ${formatForUTC(endUTC)}</div>
    <div><strong>Fin (Hora Perú):</strong> ${formatForPeru(endUTC)}</div>
  `;
});
