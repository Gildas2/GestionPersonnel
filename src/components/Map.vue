<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from "axios";

let map;
let selectedMarker = ref(null);

// Récupération des paramètres de la dernière session depuis la base de données
let lastLatitude = null; // Initialiser à null
let lastLongitude = null; // Initialiser à null
let lastZoom = 6;

const fetchMapSettings = async () => {
  try {
    const response = await axios.get("http://localhost/GestionPersonnel/backend/map.php?action=getCoordinates");
    if (response.data) {
      lastLatitude = parseFloat(response.data.latitude) || null; // Utiliser null si pas de valeur
      lastLongitude = parseFloat(response.data.longitude) || null; // Utiliser null si pas de valeur
      lastZoom = parseInt(response.data.zoom) || 14;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres de la carte:", error);
  }
};

onMounted(async () => {
  await fetchMapSettings(); // Récupérer les paramètres de la carte depuis la BD

  // Ne pas initialiser la carte si les coordonnées ne sont pas disponibles
  if (lastLatitude !== null && lastLongitude !== null) {
    map = leaflet.map("map").setView([lastLatitude, lastLongitude], lastZoom);

    leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Ajout des boutons de zoom et les déplacer vers le bas
    leaflet.control.zoom({
      position: 'bottomright' // Déplacement vers le bas à droite
    }).addTo(map);

    // Placer le marqueur initialement si des coordonnées existent
    selectedMarker.value = leaflet
      .marker([lastLatitude, lastLongitude], { draggable: true }) // Le marqueur est déplaçable
      .addTo(map)
      .bindPopup(
        `Marker at (<strong>${lastLatitude.toFixed(2)}, ${lastLongitude.toFixed(2)}</strong>)`
      )
      .openPopup();

    // Événement de fin de glissement du marqueur
    selectedMarker.value.on('dragend', async function(e) {
      const position = e.target.getLatLng();
      selectedMarker.value.setLatLng(position);

      // Mise à jour des coordonnées après déplacement
      try {
        await axios.post("http://localhost/GestionPersonnel/backend/map.php?action=saveCoordinates", {
          latitude: position.lat,
          longitude: position.lng,
          zoom: map.getZoom(), // Inclure le niveau de zoom
        });
        alert("Données mises à jour avec succès après le déplacement !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
      }
    });

    // Sauvegarder la position et le zoom à chaque changement
    map.on('moveend', async () => {
      const center = map.getCenter();
      const zoomLevel = map.getZoom();
      try {
        await axios.post("http://localhost/GestionPersonnel/backend/map.php?action=saveCoordinates", {
          latitude: center.lat,
          longitude: center.lng,
          zoom: zoomLevel,
        });
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des paramètres de la carte:", error);
      }
    });

    map.addEventListener("click", async (e) => {
      const { lat: latitude, lng: longitude } = e.latlng;

      // Si un marqueur est déjà présent, le supprimer
      if (selectedMarker.value) {
        map.removeLayer(selectedMarker.value);
      }

      selectedMarker.value = leaflet
        .marker([latitude, longitude], { draggable: true }) // Le marqueur est maintenant déplaçable
        .addTo(map)
        .bindPopup(
          `Selected Marker at (<strong>${latitude.toFixed(2)}, ${longitude.toFixed(2)}</strong>)`
        )
        .openPopup();

      // Événement de fin de glissement du marqueur
      selectedMarker.value.on('dragend', async function(e) {
        const position = e.target.getLatLng();
        selectedMarker.value.setLatLng(position);

        // Mise à jour des coordonnées après déplacement
        try {
          await axios.post("http://localhost/GestionPersonnel/backend/map.php?action=saveCoordinates", {
            latitude: position.lat,
            longitude: position.lng,
            zoom: map.getZoom(), // Inclure le niveau de zoom
          });
          alert("Données mises à jour avec succès après le déplacement !");
        } catch (error) {
          console.error("Erreur lors de la mise à jour des données:", error);
        }
      });

      // Envoi des coordonnées au backend pour les enregistrer
      try {
        await axios.post("http://localhost/GestionPersonnel/backend/map.php?action=saveCoordinates", {
          latitude,
          longitude,
          zoom: map.getZoom(), // Inclure le niveau de zoom
        });
        alert("Données enregistrées avec succès!");
        // Ne pas retourner à la page précédente, mais garder la position et le zoom
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des données:", error);
      }
    });
  } else {
    console.warn("Aucune coordonnée disponible pour initialiser la carte.");
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
