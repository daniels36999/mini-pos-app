import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clienteId, items } = body

    // Calcular subtotal (sin IVA)
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + (item.precio * item.cantidad)
    }, 0)

    // Calcular IVA (15% en Ecuador)
    const iva = subtotal * 0.15

    // Calcular total
    const total = subtotal + iva

    // Crear venta con items
    const venta = await prisma.venta.create({
      data: {
        clienteId,
        subtotal,
        iva,
        total,
        items: {
          create: items.map((item: any) => {
            const itemSubtotal = item.precio * item.cantidad
            return {
              productoId: item.productoId,
              cantidad: item.cantidad,
              precio: item.precio,
              subtotal: itemSubtotal
            }
          })
        }
      },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true
          }
        }
      }
    })

    // Actualizar stock de productos
    for (const item of items) {
      await prisma.producto.update({
        where: { id: item.productoId },
        data: {
          stock: {
            decrement: item.cantidad
          }
        }
      })
    }

    return NextResponse.json(venta)
  } catch (error) {
    console.error('Error al crear venta:', error)
    return NextResponse.json({ error: 'Error al crear venta' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            producto: true
          }
        }
      },
      orderBy: { id: 'desc' },
      take: 10
    })
    return NextResponse.json(ventas)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener ventas' }, { status: 500 })
  }
}