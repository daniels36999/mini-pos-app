// src/lib/types.ts
export interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}