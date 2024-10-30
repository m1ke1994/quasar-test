<script>
import PointsDisplay from './components/PointsDisplay.vue';
import MapComponent from './components/MapComponent.vue';
import UpdatePoint from './components/UpdatePoint.vue';
import CreatePoint from './components/CreatePoint.vue';
import { usePointsStore } from 'src/stores/pointsStore';

export default {
  components: {
    PointsDisplay,
    MapComponent,
    UpdatePoint,
    CreatePoint,
  },
  data() {
    return {
      selectedPoint: {},
      editingPoint: null,
      isEditing: false,
      isCreating: false,
    };
  },
  methods: {
    handleEditPoint(point) {
      this.selectedPoint = { ...point };
      this.isEditing = true;
    },
    handlePointSelected(pointId) {
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
    AllhandlePointSelected() {
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
    handlePointActive() {
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
    handleSaveChanges(updatedPoint) {
      const pointsStore = usePointsStore();
      pointsStore.updatePoint(updatedPoint);
      this.selectedPoint = null;
      this.isEditing = false;
    },
    handleCancelChanges() {
      this.selectedPoint = null;
      this.isEditing = false;
    },
    handleCreatePoint() {
      this.isCreating = true;
    },
    handleCancelCreate() {
      this.isCreating = false;
    },
    handleSavePoint() {
      this.isCreating = false;
    },
    handlePointDeleted() {
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    }
  },
  mounted() {
    const pointsStore = usePointsStore();
    pointsStore.generatePoints();
  }
};
</script>

<template>
  <div class="w-full flex gap-10 m-10 max-md:flex-col max-md:text-md">
    <div class="w-1/4 max-md:w-11/12 max-md:mx-auto">
      <PointsDisplay @point-selected="handlePointSelected" @point-selectedAll="AllhandlePointSelected"
        @edit-point="handleEditPoint" @create-point="handleCreatePoint" @point-deleted="handlePointDeleted" />
    </div>
    <div class="w-2/3 mx-auto max-md:w-full max-md:mx-auto" v-if="!isEditing && !isCreating">
      <MapComponent ref="mapComponent" @pointActive="handlePointActive" />
    </div>
    <div v-else-if="isEditing">
      <UpdatePoint :point="selectedPoint" v-if="selectedPoint" @save-changes="handleSaveChanges"
        @cancel-changes="handleCancelChanges" />
    </div>
    <div v-else-if="isCreating">
      <CreatePoint @cancel-create="handleCancelCreate" @save-point="handleSavePoint" :isCreating="isCreating" />
    </div>
  </div>
</template>

<style scoped></style>