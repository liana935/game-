// Инициализация сцены, камеры и рендерера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание полупрозрачных текстур для кубов
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('https://example.com/texture1.png'); // Замените на свою текстуру
const texture2 = textureLoader.load('https://example.com/texture2.png'); // Замените на свою текстуру

const material1 = new THREE.MeshBasicMaterial({ map: texture1, transparent: true, opacity: 0.5 });
const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, opacity: 0.5 });

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material1);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material2);

cube1.position.x = -2;
cube2.position.x = 2;

scene.add(cube1);
scene.add(cube2);

// Параметры анимации
const pointsCount = 100;
const pointsGeometry = new THREE.BufferGeometry();
const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const positions = new Float32Array(pointsCount * 3);
pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const points = new THREE.Points(pointsGeometry, pointsMaterial);
scene.add(points);

// Установка позиции камеры
camera.position.z = 5;

// Анимация
function animate() {
    requestAnimationFrame(animate);

    // Обновление позиции точек
    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * Math.PI * 2; // Примерная анимация
        positions[i * 3] = Math.sin(t) * 2; // x
        positions[i * 3 + 1] = Math.cos(t) * 2; // y
        positions[i * 3 + 2] = 0; // z
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    // Обработка вращения камеры
    camera.position.x = Math.sin(Date.now() * 0.001) * 5;
    camera.position.z = Math.cos(Date.now() * 0.001) * 5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// Подключение Telegram Web App для регистрации пользователей
window.Telegram.WebApp.onEvent('mainButtonClicked', function() {
    // Здесь можно обработать нажатие кнопки
    console.log('Кнопка нажата!');
});

// Настройка кнопки Telegram
window.Telegram.WebApp.ready();