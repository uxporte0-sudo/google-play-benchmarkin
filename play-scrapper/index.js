import gplay from "google-play-scraper";
import fs from "fs";

const apps = [
  "com.strava",                  // Strava
  "com.apitador.app",              // Appito
  "com.airbnb.android",         // Airbnb
  "br.com.webquadras",          // WebQuadras
  "com.playtomic"               // Playtomic
];

async function pegarReviewsTodos() {
  const resultado = {};

  for (const appId of apps) {
    console.log(`Buscando reviews de ${appId}...`);

    try {
      const reviews = await gplay.reviews({
        appId,
        lang: "pt",
        country: "br",
        num: 500,
        throttle: 5
      });

      resultado[appId] = reviews.data.map(r => ({
        user: r.userName,
        rating: r.score,
        comment: r.text
      }));

    } catch (err) {
      console.log(`Erro em ${appId}:`, err.message);
    }
  }

  fs.writeFileSync("reviews.json", JSON.stringify(resultado, null, 2));

  console.log("Finalizado! reviews.json criado 🚀");
}

pegarReviewsTodos();