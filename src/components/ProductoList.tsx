'use client'

import { useEffect, useState } from 'react'

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
  descripcion: string | null
}

interface Props {
  onAddToCart: (producto: Producto) => void
}

export default function ProductoList({ onAddToCart }: Props) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Cargando productos...</div>

  return (
    <div className="producto-list">
      <h3>Productos Disponibles</h3>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <h4>{producto.nombre}</h4>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="precio">${producto.precio.toFixed(2)}</p>
            <p className="stock">Stock: {producto.stock}</p>
            <button 
              onClick={() => onAddToCart(producto)}
              disabled={producto.stock === 0}
              className="btn-add"
            >
              {producto.stock > 0 ? 'Agregar' : 'Sin Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}