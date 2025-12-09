'use client'

interface CarritoItem {
  productoId: number
  nombre: string
  precio: number
  cantidad: number
}

interface Props {
  items: CarritoItem[]
  onUpdateCantidad: (productoId: number, cantidad: number) => void
  onRemove: (productoId: number) => void
}

export default function CarritoVenta({ items, onUpdateCantidad, onRemove }: Props) {
  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  const iva = subtotal * 0.15
  const total = subtotal + iva

  return (
    <div className="carrito">
      <h3>Carrito de Venta</h3>
      {items.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío</p>
      ) : (
        <>
          <div className="carrito-items">
            {items.map(item => (
              <div key={item.productoId} className="carrito-item">
                <div className="item-info">
                  <strong>{item.nombre}</strong>
                  <span className="item-precio">${item.precio.toFixed(2)}</span>
                </div>
                <div className="item-actions">
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => onUpdateCantidad(item.productoId, Number(e.target.value))}
                    className="cantidad-input"
                  />
                  <button 
                    onClick={() => onRemove(item.productoId)}
                    className="btn-remove"
                  >
                    ✕
                  </button>
                </div>
                <div className="item-subtotal">
                  Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="carrito-totales">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>IVA (15%):</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="total-row total-final">
              <strong>TOTAL:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  )
}