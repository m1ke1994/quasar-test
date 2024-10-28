<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import * as maptalks from 'maptalks';
import { usePointsStore } from '../stores/pointsStore';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,
      markersLayer: null,
      pointsStore: usePointsStore()
    };
  },
  mounted() {

    this.map = new maptalks.Map(this.$refs.mapContainer, {
      center: [37.6173, 55.7558],
      zoom: 13,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      })
    });

    this.markersLayer = new maptalks.VectorLayer('markers').addTo(this.map);


    this.updateMarkers(this.pointsStore.points);


    this.$watch(
      () => this.pointsStore.points,
      (newPoints) => {
        this.updateMarkers(newPoints);
      }
    );
  },
  methods: {
    updateMarkers(points) {
      if (!this.markersLayer) return;


      this.markersLayer.clear();


      points.forEach(point => {
        if (point.selected) {
          const marker = new maptalks.Marker([point.x, point.y], {
            symbol: {
              'markerType': 'ellipse',
              'markerWidth': 10,
              'markerHeight': 10,
              'markerFill': point.activePoint ? 'red' : 'purple',
              'markerFillOpacity': 0.8
            }
          }).addTo(this.markersLayer);


          this.$watch(
            () => point.activePoint,
            (isActive) => {
              marker.updateSymbol({
                'markerFill': isActive ? 'red' : 'purple'
              });
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  width: 98%;
  height: 800px;
}
</style>