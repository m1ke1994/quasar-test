<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</template>

<script>
</script>

<style scoped>
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 2;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #0fdb3b;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>