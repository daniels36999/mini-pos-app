# **MiniPOS – Sistema de Facturación Electrónica tipo POS**

MiniPOS es un sistema ligero de facturación electrónica tipo POS, pensado para demostraciones, pequeños negocios, proyectos personales y aprendizaje. Incluye frontend en Next.js, base de datos con Prisma y empaquetado como aplicación de escritorio mediante Electron.

---

## 🚀 **Tecnologías utilizadas**
- **Next.js + TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **PostgreSQL / SQLite**
- **Electron + electron-builder**
- **API Routes (App Router)**

---

# 📦 **Instalación y Configuración**

## **PASO 1: Crear proyecto Next.js con TypeScript**
```bash
npx create-next-app@latest pos-sistema
Selecciona:

yaml
Copiar código
✓ TypeScript: Yes
✓ ESLint: Yes
✓ Tailwind CSS: Yes
✓ Use src/: Yes
✓ App Router: Yes
✓ Customize alias: No
PASO 2: Entrar al proyecto
bash
Copiar código
cd pos-sistema
PASO 3: Instalar dependencias necesarias
🔹 Prisma y base de datos
bash
Copiar código
npm install prisma @prisma/client
npm install --save-dev @types/node
🔹 Electron
bash
Copiar código
npm install --save-dev electron electron-builder concurrently wait-on cross-env
🔹 Inicializar Prisma
bash
Copiar código
npx prisma init
PASO 4: CONFIGURAR BASE DE DATOS 🗄️
A. Configurar .env
Crea o edita el archivo .env en la raíz del proyecto:

env
Copiar código
# Base de datos PostgreSQL
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/pos_db?schema=public"
Recuerda: reemplaza
tu_password → por la contraseña que pusiste al instalar PostgreSQL.

📁 PASO 5: Estructura del Proyecto recomendada
lua
Copiar código
pos-sistema/
├── electron/              
│   ├── main.ts
│   └── preload.ts
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── productos/
│   │   │   └── page.tsx
│   │   ├── ventas/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── productos/
│   │       │   └── route.ts
│   │       └── ventas/
│   │           └── route.ts
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── CartItem.tsx
│   │   └── Navbar.tsx
│   └── lib/
│       ├── db.ts
│       └── types.ts
├── .env
├── package.json
├── ts