import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear clientes
  const cliente1 = await prisma.cliente.create({
    data: {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '0998765432'
    }
  })

  const cliente2 = await prisma.cliente.create({
    data: {
      nombre: 'María García',
      email: 'maria@example.com',
      telefono: '0987654321'
    }
  })

  const cliente3 = await prisma.cliente.create({
    data: {
      nombre: 'Carlos López',
      email: 'carlos@example.com',
      telefono: '0976543210'
    }
  })

   // Crear productos (uno por uno para incluir descripcion)
  const productos = [
    {
      nombre: 'Laptop HP',
      precio: 850.00,
      stock: 15,
      descripcion: 'Laptop HP Core i5, 8GB RAM'
    },
    {
      nombre: 'Mouse Logitech',
      precio: 25.50,
      stock: 50,
      descripcion: 'Mouse inalámbrico Logitech M185'
    },
    {
      nombre: 'Teclado Mecánico',
      precio: 89.99,
      stock: 30,
      descripcion: 'Teclado mecánico RGB'
    },
    {
      nombre: 'Monitor Samsung 24"',
      precio: 180.00,
      stock: 20,
      descripcion: 'Monitor Full HD 24 pulgadas'
    },
    {
      nombre: 'Auriculares Sony',
      precio: 45.00,
      stock: 40,
      descripcion: 'Auriculares con cancelación de ruido'
    },
    {
      nombre: 'Webcam Logitech',
      precio: 65.00,
      stock: 25,
      descripcion: 'Webcam 1080p para videoconferencias'
    }
  ]

  for (const prod of productos) {
    await prisma.producto.create({ data: prod })
  }

  console.log('✅ Base de datos poblada con clientes y productos')
}

//   // Crear productos
//   await prisma.producto.createMany({
//     data: [
//       {
//         nombre: 'Laptop HP',
//         precio: 850.00,
//         stock: 15,
//         descripcion: 'Laptop HP Core i5, 8GB RAM'
//       },
//       {
//         nombre: 'Mouse Logitech',
//         precio: 25.50,
//         stock: 50,
//         descripcion: 'Mouse inalámbrico Logitech M185'
//       },
//       {
//         nombre: 'Teclado Mecánico',
//         precio: 89.99,
//         stock: 30,
//         descripcion: 'Teclado mecánico RGB'
//       },
//       {
//         nombre: 'Monitor Samsung 24"',
//         precio: 180.00,
//         stock: 20,
//         descripcion: 'Monitor Full HD 24 pulgadas'
//       },
//       {
//         nombre: 'Auriculares Sony',
//         precio: 45.00,
//         stock: 40,
//         descripcion: 'Auriculares con cancelación de ruido'
//       },
//       {
//         nombre: 'Webcam Logitech',
//         precio: 65.00,
//         stock: 25,
//         descripcion: 'Webcam 1080p para videoconferencias'
//       }
//     ]
//   })

//   console.log('✅ Base de datos poblada con clientes y productos')
// }

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })