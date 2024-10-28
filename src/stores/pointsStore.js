
import { defineStore } from 'pinia';

export const usePointsStore = defineStore('points', {
  state: () => ({
    points: JSON.parse(localStorage.getItem('points')) || [],
    allPointsSelected: JSON.parse(localStorage.getItem('allPointsSelected')) || false,
    searchQuery: '',
    activePoint: null,
    searchResults: [],
    isLoading: false, // Добавляем состояние для имитации загрузки
  }),
  actions: {
    async generatePoints() {
      if (this.points.length > 0) {
        // Если данные уже есть, не нужно имитировать загрузку
        return;
      }

      this.isLoading = true; // Устанавливаем состояние загрузки

      const batchSize = 100;
      const totalPoints = 10000;
      for (let i = 0; i < totalPoints; i += batchSize) {
        const batch = Array.from({ length: batchSize }, (_, j) => {
          const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          const startDate = new Date(2023, 0, 1);
          const endDate = new Date(2023, 11, 31);

          const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return {
            title: "Точка",
            id: i + j + 1,
            x: Math.round(Math.random() * 100),
            y: Math.round(Math.random() * 100),
            activePoint: false,
            r: Math.round(Math.random() * 100),
            codpoints: Math.round(Math.random() * 1000000),
            selected: false,
            timeBefore: formatTime(randomDate(startDate, endDate)),
            timeLoading: formatTime(randomDate(startDate, endDate)),
            timeAfter: formatTime(randomDate(startDate, endDate)),
            timeBeforeFact: formatTime(randomDate(startDate, endDate)),
            timeAfterFact: formatTime(randomDate(startDate, endDate))
          };
        });

        this.points.push(...batch);
        this.savePointsToLocalStorage();

        await new Promise(resolve => setTimeout(resolve, 0));
      }

      this.isLoading = false; // Завершаем состояние загрузки
    },

    toggleAllPoints() {
      this.allPointsSelected = !this.allPointsSelected;

      const selectedPoints = this.points.slice(0, 100);

      selectedPoints.forEach(point => {
        point.selected = this.allPointsSelected;
        if (this.allPointsSelected) {
          point.activePoint = point.id === selectedPoints[0].id;
        } else {
          point.activePoint = false;
        }
      });

      const remainingPoints = this.points.slice(100);
      remainingPoints.forEach(point => {
        point.selected = false;
        point.activePoint = false;
      });

      this.savePointsToLocalStorage();
      localStorage.setItem('allPointsSelected', JSON.stringify(this.allPointsSelected));
    },

    setActivePoint(pointId) {
      this.points.forEach(point => {
        if (point.id === pointId && point.selected) {
          point.activePoint = true;
        } else {
          point.activePoint = false;
        }
      });
      this.savePointsToLocalStorage();
    },

    togglePointSelection(pointId) {
      const point = this.points.find(p => p.id === pointId);
      if (point) {
        point.selected = !point.selected;
        console.log(`Point ${point.id} selected:`, point.selected);

        if (point.selected) {
          this.activePoint = point;
        } else {
          if (this.activePoint?.id === point.id) {
            this.activePoint = null;
          }
          point.activePoint = false;
        }

        this.savePointsToLocalStorage();
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
      this.searchPoints();
    },

    searchPoints() {
      if (this.searchQuery) {
        const searchId = parseInt(this.searchQuery, 10);
        const foundPoint = this.points.find(point => point.id === searchId);
        this.searchResults = foundPoint ? [foundPoint] : [];
      } else {
        this.searchResults = [];
      }
    },

    updatePoint(updatedPoint) {
      const index = this.points.findIndex(point => point.id === updatedPoint.id);
      if (index !== -1) {
        this.points[index] = { ...updatedPoint };
        this.savePointsToLocalStorage();
      }
    },

    savePointsToLocalStorage() {
      localStorage.setItem('points', JSON.stringify(this.points));
    },

    addPoint(point) {
      const lastId = this.points.length > 0 ? this.points[this.points.length - 1].id : 0;
      point.id = lastId + 1;
      this.points.push(point);
      this.savePointsToLocalStorage();
    },

    deletePoint(pointId) {
      const index = this.points.findIndex(point => point.id === pointId);
      if (index !== -1) {
        this.points.splice(index, 1);
        this.savePointsToLocalStorage();
      }
    },
  }
});