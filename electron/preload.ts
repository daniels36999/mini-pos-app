import { contextBridge } from 'electron';

// Expone APIs seguras a tu aplicación Next.js
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  // Puedes agregar más funciones aquí si necesitas
  // Por ejemplo: acceso a archivos, impresora, etc.
});