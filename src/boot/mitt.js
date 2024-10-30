// src/boot/mitt.js
import mitt from 'mitt';

const emitter = mitt();

export default ({ app }) => {
    app.config.globalProperties.emitter = emitter;
};

export { emitter }; // Экспортируем emitter для использования в других модулях