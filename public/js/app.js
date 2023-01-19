import { OpenStreetMapProvider } from "leaflet-geosearch";

const lat = 10.60003150010103;
const lng = -71.64964139210007;
const mapa = L.map('mapa').setView([lat, lng ], 13);
let markers = new L.FeatureGroup().addTo(mapa);
let marker;

document.addEventListener('DOMContentLoaded', () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //* Seleccionar el buscador
    const buscador = document.querySelector('#formbuscador');

    buscador.addEventListener('input', buscarDireccion);
});

const buscarDireccion = e => {
    if(e.target.value.length > 5) {

        //* Si existe un pin previo
        markers.clearLayers();

        //* Utilizar el provider
        const provider = new OpenStreetMapProvider();
        
        provider.search({query: e.target.value}).then(result => {
            //* Mostrar ubicación en el mapa
            mapa.setView(result[0].bounds[0], 13);

            //* Agregar el pin
            marker = new L.marker(result[0].bounds[0], {
                draggable: true,
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(result[0].label)
            .openPopup();

            //* Asignar a su contenedor
            markers.addLayer(marker);

            //* Detectar moviemiento en el marker
            marker.on('moveend', e => {
                const {lat, lng} = e.target.getLatLng();
                mapa.panTo(new L.LatLng(lat, lng));
            })
        });
    }
}