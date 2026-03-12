# 💡 IdeaManager

![Preview](https://i.ibb.co/81gG98C/preview.png)

**IdeaManager** es una aplicación web moderna y elegante diseñada para capturar, organizar y gestionar tus ideas de manera eficiente. Con un diseño premium inspirado en las mejores herramientas de productividad, permite mantener tus pensamientos en orden tanto en escritorio como en dispositivos móviles.

🚀 **Despliegue en vivo:** [https://ideamanager-vbzv.onrender.com](https://ideamanager-vbzv.onrender.com)

---

## ✨ Características Principales

- 🔐 **Autenticación Completa**: Inicia sesión de forma segura con tu cuenta de Google o mediante correo y contraseña.
- 📁 **Organización por Carpetas**: Clasifica tus ideas en diferentes categorías para mantener tu flujo de trabajo organizado.
- 🌓 **Modo Oscuro/Claro**: Interfaz adaptable que cuida tu vista en cualquier entorno.
- 📱 **Diseño 100% Responsivo**: Experiencia de usuario optimizada para móviles con una barra de navegación dedicada.
- ⚡ **Persistencia en Tiempo Real**: Tus ideas se sincronizan al instante a través de Firebase Firestore.
- 🎨 **Interfaz Premium**: Animaciones fluidas con Framer Motion y una estética moderna y limpia.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) (Vite)
- **Estilos**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Backend / DB**: [Firebase](https://firebase.google.com/) (Auth & Firestore)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Instalación y Desarrollo Local

Si deseas ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/robermejia/IdeaManager.git
   cd IdeaManager
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura Firebase:**
   Crea un archivo `src/lib/firebase.js` (o edita el actual) con tus propias credenciales de Firebase Console:
   ```javascript
   const firebaseConfig = {
     apiKey: "TU_API_KEY",
     authDomain: "TU_AUTH_DOMAIN",
     projectId: "TU_PROJECT_ID",
     storageBucket: "TU_STORAGE_BUCKET",
     messagingSenderId: "TU_MESSAGING_SENDER_ID",
     appId: "TU_APP_ID"
   };
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

Diseñado y desarrollado por [Rober Mejia](https://github.com/robermejia).
