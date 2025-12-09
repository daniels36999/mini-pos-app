'use client'

import { useState } from 'react'
import ClienteSelector from '@/components/ClienteSelector'
import ProductoList from '@/components/ProductoList'
import CarritoVenta from '@/components/CarritoVenta'

interface Cliente {
  id: number
  nombre: string
  email: string
  telefono: string | null
}

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
}

interface CarritoItem {
  productoId: number
  nombre: string
  precio: number
  cantidad: number
}

export default function Home() {
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [procesando, setProcesando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const handleAddToCart = (producto: Producto) => {
    const existente = carrito.find(item => item.productoId === producto.id)
    
    if (existente) {
      setCarrito(carrito.map(item =>
        item.productoId === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      }])
    }
  }

  const handleUpdateCantidad = (productoId: number, cantidad: number) => {
    if (cantidad < 1) return
    setCarrito(carrito.map(item =>
      item.productoId === productoId ? { ...item, cantidad } : item
    ))
  }

  const handleRemove = (productoId: number) => {
    setCarrito(carrito.filter(item => item.productoId !== productoId))
  }

  const handleFinalizarVenta = async () => {
    if (!selectedCliente) {
      setMensaje('⚠️ Debes seleccionar un cliente')
      return
    }

    if (carrito.length === 0) {
      setMensaje('⚠️ El carrito está vacío')
      return
    }

    setProcesando(true)
    setMensaje('')

    try {
      const response = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: selectedCliente.id,
          items: carrito
        })
      })

      if (response.ok) {
        const venta = await response.json()
        setMensaje(`✅ Venta #${venta.id} realizada exitosamente!`)
        setCarrito([])
        setSelectedCliente(null)
        
        // Refrescar productos
        window.location.reload()
      } else {
        setMensaje('❌ Error al procesar la venta')
      }
    } catch (error) {
      setMensaje('❌ Error de conexión')
    } finally {
      setProcesando(false)
    }
  }

  return (
    <main className="container">
      <header>
        <h1>🛒 Sistema POS - Punto de Venta</h1>
      </header>

      <div className="pos-layout">
        <div className="left-panel">
          <ClienteSelector 
            onSelect={setSelectedCliente}
            selectedCliente={selectedCliente}
          />
          <ProductoList onAddToCart={handleAddToCart} />
        </div>

        <div className="right-panel">
          <CarritoVenta
            items={carrito}
            onUpdateCantidad={handleUpdateCantidad}
            onRemove={handleRemove}
          />
          
          <button
            onClick={handleFinalizarVenta}
            disabled={procesando || !selectedCliente || carrito.length === 0}
            className="btn-finalizar"
          >
            {procesando ? 'Procesando...' : 'Finalizar Venta'}
          </button>

          {mensaje && (
            <div className={`mensaje ${mensaje.includes('✅') ? 'success' : 'error'}`}>
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}