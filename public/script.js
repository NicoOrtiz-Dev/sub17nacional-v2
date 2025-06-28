let golesN = 0;
let golesA = 0;

const pusher = new Pusher("32360ed1be476bc06d0e", {
  cluster: "mt1"
});

const channel = pusher.subscribe("partido");

channel.bind("evento", (data) => {
  const { tipo, detalle, jugador } = data;

  if (tipo === "gol") {
    if (detalle === "Nacional") {
      golesN++;
    } else if (detalle === "América") {
      golesA++;
    }

    document.getElementById("marcadorTexto").innerText = `${golesN} - ${golesA}`;
    mostrar(`⚽ ¡Gol de ${detalle}!<br/>👟 Lo hizo: ${jugador || "Desconocido"}`, "gol");

    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  }
});

function mostrar(texto, tipo) {
  const div = document.getElementById("eventos");
  const evento = document.createElement("div");
  evento.className = tipo;
  evento.innerHTML = texto;
  div.prepend(evento);
}
