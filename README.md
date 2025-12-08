POS Billing System – Next.js + Electron + Prisma

Un sistema POS (Point of Sale) moderno construido con Next.js, TypeScript, TailwindCSS, Prisma y Electron.
Diseñado como un proyecto base para crear aplicaciones de facturación local (escritorio) con UI web.

Ideal para aprender arquitectura híbrida: Next.js (frontend/backend) + Electron (desktop) + Prisma (database).

📋 Tabla de contenidos

Descripción

Tecnologías

Instalación

Scripts disponibles

Estructura del proyecto

Estado del proyecto

🧠 Descripción

Este proyecto implementa un sistema POS básico, permitiendo gestionar productos y ventas.
Usa Next.js App Router como backend interno, Prisma ORM para la base de datos y Electron para empaquetar una app de escritorio.

Características iniciales:

✔ CRUD de productos
✔ CRUD de ventas
✔ UI con TailwindCSS
✔ API interna usando Next.js (App Router)
✔ Base para transformar Next.js en software local con Electron

⚙️ Tecnologías principales

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Prisma ORM

SQLite (por defecto)

Electron 28

Electron Builder (para empaquetar)

🚀 Instalación
1. Crear proyecto Next.js con TypeScript
npx create-next-app@latest pos-sistema


Responde lo siguiente:

✓ TypeScript? → Yes
✓ ESLint? → Yes
✓ Tailwind CSS? → Yes
✓ Use src/ directory? → Yes
✓ Use App Router? → Yes
✓ Customize import alias? → No

2. Entrar al proyecto
cd pos-sistema

3. Instalar dependencias adicionales
npm install prisma @prisma/client
npm install --save-dev @types/node

4. Instalar dependencias de Electron
npm install --save-dev electron electron-builder concurrently wait-on cross-env

5. Inicializar Prisma
npx prisma init

📁 Estructura del proyecto
pos-sistema/
├── electron/              # Lógica principal de Electron
│   ├── main.ts
│   └── preload.ts
├── prisma/
│   └── schema.prisma      # Modelos de la base de datos
├── src/
│   ├── app/
│   │   ├── page.tsx       # Página principal
│   │   ├── layout.tsx
│   │   ├── productos/
│   │   │   └── page.tsx
│   │   ├── ventas/
│   │   │   └── page.tsx
│   │   └── api/           # Endpoints (backend)
│   │       ├── productos/
│   │       │   └── route.ts
│   │       └── ventas/
│   │           └── route.ts
│   ├── components/        # Componentes reutilizables
│   │   ├── ProductCard.tsx
│   │   ├── CartItem.tsx
│   │   └── Navbar.tsx
│   └── lib/               # Utilidades y conexión DB
│       ├── db.ts
│       └── types.ts
├── .env                   # Variables de entorno
├── package.json
├── tsconfig.json
└── next.config.js

🧪 Scripts disponibles (según configuración futura)
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "electron:dev": "concurrently \"next dev\" \"wait-on http://localhost:3000 && electron .\"",
  "electron:build": "electron-builder"
}

📌 Estado del proyecto

🔧 En desarrollo
Este repositorio sirve como base inicial para un sistema POS moderno basado en tecnologías actuales.