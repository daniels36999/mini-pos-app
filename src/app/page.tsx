// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Producto, ItemCarrito, ApiResponse } from '@/lib/types'

export default function VentasPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      const res = await fetch('/api/productos')
      const data: ApiResponse<Producto[]> = await res.json()
      if (data.success && data.data) {
        setProductos(data.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const agregarAlCarrito = (producto: Producto) => {
    const itemExistente = carrito.find(item => item.producto.id === producto.id)
    
    if (itemExistente) {
      if (itemExistente.cantidad < producto.stock) {
        setCarrito(carrito.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ))
      } else {
        alert('Stock insuficiente')
      }
    } else {
      if (producto.stock > 0) {
        setCarrito([...carrito, { producto, cantidad: 1 }])
      }
    }
  }

  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(carrito.filter(item => item.producto.id !== productoId))
  }

  const cambiarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId)
      return
    }

    setCarrito(carrito.map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ))
  }

  const subtotal = carrito.reduce((sum, item) => 
    sum + (item.producto.precio * item.cantidad), 0
  )
  const iva = subtotal * 0.15
  const total = subtotal + iva

  const procesarVenta = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío')
      return
    }

    // Aquí procesarías la venta con tu API
    alert(`Venta procesada!\n\nTotal: $${total.toFixed(2)}`)
    setCarrito([])
    fetchProductos() // Refrescar productos
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Mini POS</h1>
      </div>

      {/* Navegación */}
      <div className="flex border-b bg-white">
        <Link 
          href="/"
          className="flex-1 py-3 text-center font-semibold bg-blue-500 text-white"
        >
          Nueva Venta
        </Link>
        <Link 
          href="/productos"
          className="flex-1 py-3 text-center font-semibold hover:bg-gray-50"
        >
          Productos
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Productos */}
          <div>
            <h2 className="text-xl font-bold mb-4">Productos</h2>
            <div className="grid grid-cols-2 gap-3">
              {productos.map(producto => (
                <div 
                  key={producto.id}
                  className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{producto.nombre}</h3>
                  <p className="text-lg font-bold text-green-600">
                    ${producto.precio.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={producto.stock === 0}
                    className={`w-full mt-2 py-2 rounded font-medium ${
                      producto.stock === 0
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {producto.stock === 0 ? 'Sin Stock' : 'Agregar'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div>
            <h2 className="text-xl font-bold mb-4">Carrito ({carrito.length})</h2>
            
            {carrito.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-white rounded-lg">
                <p>Carrito vacío</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4">
                {/* Items */}
                <div className="space-y-2 mb-4">
                  {carrito.map(item => (
                    <div key={item.producto.id} className="flex items-center gap-3 p-2 border rounded">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.producto.nombre}</p>
                        <p className="text-xs text-gray-500">${item.producto.precio.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                          className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                          className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <div className="w-20 text-right">
                        <p className="font-bold">${(item.producto.precio * item.cantidad).toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => eliminarDelCarrito(item.producto.id)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (15%):</span>
                    <span className="font-semibold">${iva.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>TOTAL:</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={procesarVenta}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg"
                >
                  Procesar Venta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}