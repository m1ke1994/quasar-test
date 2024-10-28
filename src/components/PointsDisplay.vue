<template>
  <div class="flex justify-between items-center">
    <p class="text-3xl m-4 p-2 font-bold">Точки</p>
    <div class="flex items-center">
      <input type="text" class="border border-gray-300 rounded-l-lg p-2" placeholder="Поиск по точкам"
        v-model="searchQuery" @keyup.enter="searchPoint" />
      <img class="cursor-pointer border border-gray-300 rounded-r-lg p-2" src="../assets/icons.png" alt="search"
        @click="searchPoint" />
    </div>
  </div>
  <div class="flex justify-between p-2 items-center">
    <div class="flex gap-4 m-4 p-2 items-center">
      <p><input type="checkbox" id="option2" :checked="allPointsSelected" @change="togglePointAll"></p>
      <label for="option2">Выбрать первые 100 ({{ lengthPointsTrue }})</label>
    </div>
    <div>
      <img class="cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/create.png"
        alt="create" @click="createPoint">
    </div>
  </div>
  <div class="scroll-container">
    <div v-for="point in filteredPoints" :key="point.id"
      :class="['border-2 m-4 p-2  rounded-xl flex justify-between', { 'purple': point.selected, 'active': point.activePoint, 'text-neutral-500': !point.activePoint && !point.selected }]"
      @click="setActivePoint(point.id)">
      <div>
        <input type="checkbox" :id="'option' + point.id" :checked="point.selected" @change="togglePoint(point.id)" />
        <label :for="'option' + point.id" class="m-4 text-lg"><b>{{ point.title }} №{{ point.id }}</b></label>
        <p><b>Координаты</b>:</p>
        <p><b>Широта:</b> {{ point.x }}</p>
        <p><b>Долгота:</b> {{ point.y }}</p>
        <p><b>Радиус:</b> {{ point.r }}</p>
      </div>
      <div v-if="point.activePoint == true" class="flex flex-col justify-between">
        <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/delete.png"
          alt="delete" @click="deletePoint(point.id)">
        <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/update.png"
          alt="update" @click="editPoint(point)">
      </div>
    </div>
  </div>
</template>

<script>
import { usePointsStore } from 'src/stores/pointsStore';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    points() {
      return usePointsStore().points;
    },
    filteredPoints() {
      if (this.searchQuery) {
        const id = parseInt(this.searchQuery, 10);
        return this.points.filter(point => point.id === id);
      }
      return this.points;
    },
    lengthPointsTrue() {
      return this.points.filter(point => point.selected).length;
    },
    allPointsSelected() {
      return usePointsStore().allPointsSelected;
    }
  },
  methods: {
    searchPoint() {
      this.searchQuery = '';
    },
    togglePointAll() {
      usePointsStore().toggleAllPoints();
      this.$emit('point-selectedAll');
    },
    togglePoint(pointId) {
      console.log('togglePoint', pointId);
      usePointsStore().togglePointSelection(pointId);
      this.$emit('point-selected', pointId);
    },
    setActivePoint(pointId) {
      usePointsStore().setActivePoint(pointId);
    },
    editPoint(point) {
      this.$emit('edit-point', point);
    },
    createPoint() {
      this.$emit('create-point');
    },
    deletePoint(pointId) {
      usePointsStore().deletePoint(pointId);
      this.$emit('point-deleted', pointId);
    }
  },
  mounted() {
    console.log('mounted');
    usePointsStore().generatePoints();
  }
};
</script>

<style scoped>
.point {
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
}

.purple {
  color: #A275B2
}

.active {
  border-color: #B70DF2;
  color: #B70DF2;
}

.scroll-container {
  max-height: 600px;
  overflow-y: auto;
}
</style>