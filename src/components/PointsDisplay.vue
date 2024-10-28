<!-- <template>
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
  <div v-if="isLoading">
    <LoadingList />
  </div>
  <div v-else class="scroll-container">
    <q-virtual-scroll style="max-height: 600px; width: 100%;" :items="filteredPoints" separator>
      <template v-slot:default="{ item }">
        <div :key="item.id"
          :class="['border-2 m-4 p-2  rounded-xl flex justify-between', { 'purple': item.selected, 'active': item.activePoint, 'text-neutral-500': !item.activePoint && !item.selected }]"
          @click="setActivePoint(item.id)">
          <div>
            <input type="checkbox" :id="'option' + item.id" :checked="item.selected" @change="togglePoint(item.id)" />
            <label :for="'option' + item.id" class="m-4 text-lg"><b>{{ item.title }} №{{ item.id }}</b></label>
            <p><b>Координаты</b>:</p>
            <p><b>Широта:</b> {{ item.x }}</p>
            <p><b>Долгота:</b> {{ item.y }}</p>
            <p><b>Радиус:</b> {{ item.r }}</p>
          </div>
          <div v-if="item.activePoint == true" class="flex flex-col justify-between">
            <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/delete.png"
              alt="delete" @click="deletePoint(item.id)">
            <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/update.png"
              alt="update" @click="editPoint(item)">
          </div>
        </div>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { usePointsStore } from 'src/stores/pointsStore';
import { QVirtualScroll } from 'quasar';
import LoadingList from './LoadingList.vue';

export default {
  components: {
    QVirtualScroll,
    LoadingList
  },
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
    },
    isLoading() {
      return usePointsStore().isLoading;
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
</style> -->
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
  <div v-if="isLoading">
    <LoadingList />
  </div>
  <div v-else class="content-container">
    <div class="scroll-container">
      <q-virtual-scroll style="max-height: 600px; width: 100%;" :items="filteredPoints" separator>
        <template v-slot:default="{ item }">
          <div :key="item.id"
            :class="['border-2 m-4 p-2  rounded-xl flex justify-between', { 'purple': item.selected, 'active': item.activePoint, 'text-neutral-500': !item.activePoint && !item.selected }]"
            @click="setActivePoint(item.id)">
            <div>
              <input type="checkbox" :id="'option' + item.id" :checked="item.selected" @change="togglePoint(item.id)" />
              <label :for="'option' + item.id" class="m-4 text-lg"><b>{{ item.title }} №{{ item.id }}</b></label>
              <p><b>Координаты</b>:</p>
              <p><b>Широта:</b> {{ item.x }}</p>
              <p><b>Долгота:</b> {{ item.y }}</p>
              <p><b>Радиус:</b> {{ item.r }}</p>
            </div>
            <div v-if="item.activePoint == true" class="flex flex-col justify-between">
              <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/delete.png"
                alt="delete" @click="deletePoint(item.id)">
              <img class=" cursor-pointer hover:scale-125 transition ease-in duration-300" src="../assets/update.png"
                alt="update" @click="editPoint(item)">
            </div>
          </div>
        </template>
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script>
import { usePointsStore } from 'src/stores/pointsStore';
import { QVirtualScroll } from 'quasar';
import LoadingList from './LoadingList.vue';

export default {
  components: {
    QVirtualScroll,
    LoadingList
  },
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
    },
    isLoading() {
      return usePointsStore().isLoading;
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

.content-container {
  position: relative;
  z-index: 1;
}
</style>