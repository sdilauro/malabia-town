import {
  type Entity,
  Font,
  TextShape,
  Transform,
  engine,
  executeTask
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
// import { Vector3 } from '@dcl/sdk/math'

export class Board {
  private readonly sign1: Entity
  private readonly sing2: Entity
  private readonly sing3: Entity

  constructor() {
    this.sign1 = engine.addEntity()
    this.sing2 = engine.addEntity() // Crear entidad para sing2
    this.sing3 = engine.addEntity() // Crear entidad para sing3

    // Configuración inicial para sign1
    Transform.create(this.sign1, {
      position: Vector3.create(10.14, 1.88, 28.27),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    TextShape.create(this.sign1, {
      text: 'Sign One',
      textColor: Color4.Red(),
      fontSize: 5,
      font: Font.F_SANS_SERIF
    })

    // Configuración inicial para sing2 (idéntica a sign1 pero con +10 cm en Y)
    Transform.create(this.sing2, {
      position: Vector3.create(10.14, 2.1, 28.0), // +0.1 (10 cm) en Y
      rotation: Quaternion.fromEulerDegrees(0, 90, -10),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    TextShape.create(this.sing2, {
      text: 'Sing Two',
      textColor: Color4.Blue(),
      fontSize: 2,
      font: Font.F_SANS_SERIF
    })

    // Configuración inicial para sing3 (idéntica a sign1 pero con +20 cm en Y)
    Transform.create(this.sing3, {
      position: Vector3.create(10.14, 2.38, 27.37), // +0.2 (20 cm) en Y
      rotation: Quaternion.fromEulerDegrees(0, 90, 16),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    TextShape.create(this.sing3, {
      text: 'Sing Three',
      textColor: Color4.Yellow(),
      fontSize: 4,
      font: Font.F_SANS_SERIF
    })
  }

  fillSingFromDb(): void {
    executeTask(async () => {
      try {
        const response = await fetch(
          'https://thecodingcave.com/random-malabia-signs',
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
          }
        )
        const json = await response.json()

        // Asegurarse de que el JSON contenga al menos 3 elementos
        if (Array.isArray(json) && json.length >= 3) {
          // Asignar textos a cada entidad
          TextShape.createOrReplace(this.sign1, {
            text: json[0],
            textColor: Color4.Red(),
            fontSize: 5,
            font: Font.F_SANS_SERIF
          })
          TextShape.createOrReplace(this.sing2, {
            text: json[1],
            textColor: Color4.Blue(),
            fontSize: 5,
            font: Font.F_SANS_SERIF
          })
          TextShape.createOrReplace(this.sing3, {
            text: json[2],
            textColor: Color4.Yellow(),
            fontSize: 5,
            font: Font.F_SANS_SERIF
          })
        } else {
          console.log('Error: la respuesta no contiene suficientes textos')
        }
      } catch (error) {
        console.log('failed to reach URL', error)
      }
    })
  }
}
