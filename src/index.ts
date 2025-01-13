import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as ui from 'dcl-ui-toolkit'

// import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  ColliderLayer,
  engine,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  TextShape,
  Transform,
  type TransformType,
  VideoPlayer
} from '@dcl/sdk/src/ecs'
// import * as eth from "eth-connect"
// import { openExternalUrl } from "~system/RestrictedActions"
import {
  blenderTransform,
  distanceIsLessThan,
  randomInt,
  randomIntExcluding,
  randomRange
} from './common'
import { createModelsAnimation, AnimationModelsSystem } from './modelsAnimation'

// import { getUserAccount } from '@decentraland/EthereumController'
// import { getProvider } from '@decentraland/web3-provider'
// import {
//   //ContractName,
//   //getContract,
//   sendMetaTransaction
// } from 'decentraland-transactions'

import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
// import { getPlayer } from '@dcl/sdk/src/players'
import { AnimationModelsComponent } from './definitions'
import { movePlayerTo, openExternalUrl } from '~system/RestrictedActions'
import {
  lav01T,
  lav02T,
  lav03T,
  rayosT,
  corazonT,
  inodorosT,
  telefonoT,
  pantallaT,
  donacionT,
  mariposaT,
  wearablesT,
  labT,
  pizarronT,
  brocheInstagramT,
  brocheMalabiaT,
  cuernoT,
  // puertaCortinaT,
  calderoT,
  fogonazoT,
  marcoCalderoT,
  malabiaUploadT,
  malabiafxT,
  caballofxT,
  tunelfxT,
  terrazafxT,
  velaT,
  exit1T,
  exit2T,
  audiosTelefono,
  wearablesFrames,
  labFrames,
  antorchasT,
  portales,
  createEntity,
  puertaCortinaT,
  createEntityWBT,
  malabiaUploadFrames,
  alfombrafxFrames,
  caballofxFrames,
  plantafxFrames,
  tunelfxFrames,
  exitFrames,
  portalfxFrames,
  terrazafxFrames,
  electricidadPasilloFrames
} from './creatorFunctions'
import { makeDonation } from './donation'
import { Board } from './board'
// import { abiManaArray } from './erc20Abi'
// import { abiMensajes } from './mensajesAbi'

export function main(): void {
  ReactEcsRenderer.setUiRenderer(ui.render)

  // const functionTransfer = new eth.SolidityFunction(
  //   getFunction('transfer', abiManaArray)
  // )
  // const functionSetGreeting = new eth.SolidityFunction(
  //   getFunction('setGreeting', abiMensajes)
  // )

  // function getFunction(name: string, abi: eth.AbiItemGeneric[]): eth.AbiFunction {
  //   for (let n = 0; n < abi.length; n++) {
  //     if (abi[n].type === 'function' && abi[n].name === name) {

  //       return abi[n] as eth.AbiFunction
  //     }
  //   }
  //   console.log(abi)
  //   throw new Error('Function not found: ' + name)
  // }

  // const publicKeyRequest = getPlayer()?.userId

  // const maticProvider: any = new eth.HTTPProvider(
  //   'https://rpc-mainnet.maticvigil.com'
  // )
  // const metaRequestManager: any = new eth.RequestManager(maticProvider)

  // async function prepareMetaTransaction(
  //   functionSignature: any,
  //   contractConfig: any
  // ):Promise<void> {
  //   const provider = createEthereumProvider()
  //   const requestManager: any = new eth.RequestManager(provider)

  //   return sendMetaTransaction(
  //     requestManager,
  //     metaRequestManager,
  //     functionSignature.data,
  //     contractConfig
  //   )
  // }

  //

  // const canvas = new UICanvas()

  //

  const buildingCore = engine.addEntity()
  Transform.create(buildingCore, { position: Vector3.create(0, -500, 0) })

  const MAIN_TRANSFORM: Partial<TransformType> = {
    position: Vector3.create(24, 0, 24)
  }

  const bosque = engine.addEntity()
  GltfContainer.create(bosque, {
    src: 'models/bosque.gltf'
  })
  Transform.create(bosque, MAIN_TRANSFORM)

  // Static Objects
  // walls
  createEntity(buildingCore, 'models/walls.gltf', MAIN_TRANSFORM)
  // dynamic
  createEntity(buildingCore, 'models/dynamic.gltf', MAIN_TRANSFORM)
  // static
  createEntity(buildingCore, 'models/static.gltf', MAIN_TRANSFORM)
  // static2
  createEntity(buildingCore, 'models/static2.gltf', MAIN_TRANSFORM)
  // static3
  createEntity(buildingCore, 'models/static3.gltf', MAIN_TRANSFORM)
  // static4
  createEntity(buildingCore, 'models/static4.gltf', MAIN_TRANSFORM)

  // Dynamic Objects

  // Washing Machines
  createEntityWBT(buildingCore, lav01T, 'models/lavarropas.gltf')
  createEntityWBT(buildingCore, lav02T, 'models/lavarropas.gltf')
  createEntityWBT(buildingCore, lav03T, 'models/lavarropas.gltf')
  createEntityWBT(buildingCore, rayosT, 'models/lavarropas_rayos.gltf')

  // Heart, toilets
  createEntityWBT(buildingCore, corazonT, 'models/corazon.gltf')
  createEntityWBT(buildingCore, inodorosT, 'models/inodoros.gltf')
  const telefono = createEntityWBT(
    buildingCore,
    telefonoT,
    'models/telefono.gltf'
  )

  // Phone
  pointerEventsSystem.onPointerDown(
    {
      entity: telefono,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Atender' }
    },
    function () {
      AudioSource.createOrReplace(telefono, {
        audioClipUrl:
          'audio/' + audiosTelefono[randomInt(0, audiosTelefono.length)],
        playing: true
        // global:false
      })
    }
  )

  // Screen
  const pantalla = createEntityWBT(buildingCore, pantallaT, '', true)
  MeshRenderer.setPlane(pantalla)
  MeshCollider.setPlane(pantalla)

  VideoPlayer.create(pantalla, {
    src: 'textures/oraculo/video Quinteto de Academia en Malabia.mp4',
    playing: true
  })

  const videoTexture = Material.Texture.Video({ videoPlayerEntity: pantalla })

  Material.setPbrMaterial(pantalla, {
    texture: videoTexture,
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: pantalla,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Play/Pause' }
    },
    function () {
      const videoPlayer = VideoPlayer.getMutable(pantalla)
      if (videoPlayer.playing === true) {
        videoPlayer.playing = false
      } else {
        videoPlayer.playing = true
      }
    }
  )

  const mutableVideoPlayer = VideoPlayer.getMutable(pantalla)
  mutableVideoPlayer.volume = 0.1
  mutableVideoPlayer.playing = false

  /* const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => {
    console.log(Camera.instance.position)
}) */

  /* Wearables Anim */
  createEntityWBT(buildingCore, wearablesT, wearablesFrames)
  /* Lab Anim */
  createEntityWBT(buildingCore, labT, labFrames)

  // const contracts = {
  //   mana: {
  //     matic: {
  //       version: '1',
  //       abi: abiMANA,
  //       address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
  //       name: '(PoS) Decentraland MANA',
  //       chainId: 137
  //     },
  //     mumbai: {
  //       version: '1',
  //       abi: abiMANA,
  //       // address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
  //       address: '0x4dA830330048be6380f102a83d3B94ea318bc598', // Test contract
  //       name: 'Decentraland MANA (PoS)',
  //       chainId: 80001
  //     }
  //   },
  //   mensajes: {
  //     matic: {
  //       version: '1',
  //       abi: abiMensajes,
  //       address: '0x7C778dB3dF481C64178ECA0AF98E47d0D0BcD1f7',
  //       name: 'MalabiaTown',
  //       chainId: 137
  //     },
  //     mumbai: {
  //       version: '1',
  //       abi: abiMensajes,
  //       address: '0xF8BD449956430e903253cFBc6E25A7ff9310ef8B',
  //       name: 'MalabiaTown',
  //       chainId: 80001
  //     }
  //   }
  // }
  // const sign = engine.addEntity()

  // Transform.create(sign, {
  //   position: Vector3.create(10.14, 1.88, 28.27),
  //   rotation: Quaternion.fromEulerDegrees(0, 90, 0),
  //   scale: Vector3.create(0.2, 0.2, 0.2)
  // })

  // TextShape.create(sign, {
  //   text: 'Hello World',
  //   textColor: Color4.Red(),
  //   fontSize: 5,
  //   font: Font.F_SANS_SERIF
  // })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const board = new Board()
  board.fillSingFromDb()
  const donacion = engine.addEntity()
  GltfContainer.create(donacion, { src: 'models/expendedora.gltf' })
  Transform.create(donacion, blenderTransform(donacionT, buildingCore))
  AudioSource.create(donacion, {
    audioClipUrl: 'audio/gaseosa.mp3',
    playing: false,
    loop: false
    // global:false
  })

  // Vending machine for donations

  const donateBox = engine.addEntity()
  // MeshRenderer.setBox(donateBox)
  MeshCollider.setBox(donateBox)
  Transform.create(donateBox, {
    position: Vector3.create(5.54, 0.88, 29.46),
    scale: Vector3.create(1.75, 3.25, 2.25)
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: donateBox,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Donate Here!',
        maxDistance: 5
      }
    },
    function () {
      console.log('here')
      void makeDonation(10)
    }
  )
  // pointerEventsSystem.onPointerDown(
  // 	{
  // 		entity: donacion,
  // 		opts: { button: InputAction.IA_ANY, hoverText: 'Donar 10 PolygonMANA' },
  // 	},
  // 	async ():Promise<void> => {
  //             const addedValue = eth.toWei(10, 'ether')
  //             const functionSignature = functionTransfer.toPayload([
  //               //fromAddress,
  //               '0x1a1792286a870d6630a80C924B39E37eD6618082',
  //               String(addedValue)
  //             ])
  //             const conf = contracts.mana.matic
  //             console.log(functionSignature)
  //             console.log(conf)
  //             prepareMetaTransaction(functionSignature, conf)
  //               .then((tx) => {
  //                 AudioSource.getMutable(donacion).playing = true
  //                 console.log('Donación Ok ', tx)
  //                 donacionOk.show()
  //                 donacionError.hide()
  //               })
  //               .catch((e) => {
  //                 console.log('Error enviando donación', e)
  //                 donacionError.show()
  //                 donacionOk.hide()
  //               })
  // 	}
  // )

  /* Messages */
  // const donacionOk = ui.createComponent(ui.Announcement, { value: '¡Gracias por la donación!', duration: 10, startHidden: true })
  // const donacionError = ui.createComponent(ui.Announcement, { value: 'Error al donar ¿Está conectado MetaMask?', duration: 10, startHidden: true, yOffset: -20 })
  // const mensajeOk = ui.createComponent(ui.Announcement, { value: '¡Mensaje en camino! Aparecerá en unos segundos', duration: 10, startHidden: true, yOffset: -40 })
  // const mensajeError = ui.createComponent(ui.Announcement, { value: 'Error al enviar mensaje ¿Está conectado MetaMask?', duration: 10, startHidden: true, yOffset: -60 })

  for (let n = 0; n < antorchasT.length; n++) {
    const antorcha = engine.addEntity()
    GltfContainer.create(antorcha, { src: 'models/antorcha.gltf' })
    Transform.create(antorcha, blenderTransform(antorchasT[n], buildingCore))
  }

  /* Mariposa */
  createEntityWBT(buildingCore, mariposaT, 'models/mariposa.gltf')

  /* Mariposas Bosque */
  for (let n = 0; n < 10; n++) {
    createEntity(bosque, 'models/mariposa.gltf', {
      position: Vector3.create(
        randomRange(-16, 16),
        randomRange(0.5, 2.5),
        randomRange(-16, 16)
      ),
      rotation: Quaternion.fromEulerDegrees(0, randomRange(0, 170), 0),
      scale: Vector3.create(1.5, 1.5, 1.5)
    })
  }

  /* Puerta principal */

  const mainDoor = engine.addEntity()
  // MeshRenderer.setBox(mainDoor)
  Transform.create(mainDoor, {
    position: Vector3.create(16 + 8, 1, 16 + 8),
    parent: bosque
  })

  for (let n = 0; n < portales.length; n++) {
    const electricidad = engine.addEntity()
    AudioSource.createOrReplace(electricidad, {
      audioClipUrl: 'audio/Electricidad.mp3',
      playing: true
      // global:false
    })
    Transform.create(electricidad, {
      position: portales[n].in,
      parent: buildingCore
    })
    const mutableSource = AudioSource.getMutable(electricidad)
    mutableSource.playing = true
    mutableSource.loop = true
    mutableSource.volume = 0.1
  }

  const tmp = engine.addEntity()
  AudioSource.createOrReplace(tmp, {
    audioClipUrl: 'audio/Teletransporte.mp3',
    playing: true,
    loop: false,
    volume: 0.6
    // global:false
  })
  Transform.create(tmp, { position: Vector3.create(0, 0, 0.5) })
  AvatarAttach.create(tmp, {
    anchorPointId: AvatarAnchorPointType.AAPT_HEAD
  })

  // async function getMensajes():Promise<void> {
  //   return getFactory(contracts.mensajes.matic).then(async (contract) => {
  //     return await contract.getMessages()
  //   })
  // }

  let buildingVisible: boolean = false
  let justTeleported: boolean = false
  let teleportTime: number = 0
  let teleporting: boolean = false
  let teleportingFrom: number = 0
  function AnimSystem(dt: number): void {
    if (!buildingVisible) {
      if (
        distanceIsLessThan(
          Transform.get(mainDoor).position,
          Transform.get(engine.PlayerEntity).position,
          1
        )
      ) {
        buildingVisible = true
        justTeleported = true
        Transform.getMutable(buildingCore).position.y = 0
        Transform.getMutable(mainDoor).position.y = -20
        const mutableBosqueT = Transform.getMutableOrNull(bosque)
        if (mutableBosqueT !== null) {
          mutableBosqueT.position.y = -500
        }
        void movePlayerTo({
          newRelativePosition: Vector3.create(37, 0, 45),
          cameraTarget: Vector3.create(46, 1, 45)
        })
      }
      return
    } else {
      if (
        distanceIsLessThan(
          Vector3.create(35, 0, 45),
          Transform.get(engine.PlayerEntity).position,
          1.5
        )
      ) {
        if (!justTeleported) {
          buildingVisible = false
          Transform.getMutable(buildingCore).position.y = -500
          // engine.removeEntity(static2)
          // engine.removeEntity(static3)
          // engine.removeEntity(static4)

          Transform.getMutable(mainDoor).position.y = 1
          const mutableBosqueT = Transform.getMutableOrNull(bosque)
          if (mutableBosqueT !== null) {
            mutableBosqueT.position.y = 0
          }
          void movePlayerTo({
            newRelativePosition: Vector3.create(16, 0, 16),
            cameraTarget: Vector3.create(16 + 8, 2, 16 + 8)
          })
          // AudioSource.getMutable(tunelfx).playing = true
          // pasillo_source.playOnce()
        }
      } else {
        justTeleported = false
      }
    }

    // Check Portales

    if (teleporting) {
      teleportTime -= 0.5
      console.log(teleportTime)
      if (teleportTime <= 0) {
        teleporting = false

        const port =
          portales[randomIntExcluding(0, portales.length, teleportingFrom)]
        void movePlayerTo({
          newRelativePosition: port.out[0],
          cameraTarget: port.out[1]
        })
      }
    } else {
      for (let n = 0; n < portales.length; n++) {
        if (
          distanceIsLessThan(
            portales[n].in,
            Transform.get(engine.CameraEntity).position,
            portales[n].dist
          )
        ) {
          console.log('on', n)
          if (n === 3) {
            // Inodoros
            // Si no está en la terraza, ignorar
            if (Transform.get(engine.CameraEntity).position.y < 4) break
          }
          teleportTime = 1
          teleporting = true
          teleportingFrom = n
          AudioSource.getMutable(tmp).playing = true
          break
        }
      }
    }
  }

  engine.addSystem(AnimSystem)

  //   async function getFactory(contractConfig: any):Promise<any> {
  //     const requestManager: any = new eth.RequestManager(maticProvider)

  //     const factory = new eth.ContractFactory(requestManager, contractConfig.abi)
  //     const contract = await factory.at(contractConfig.address)

  //     return contract
  //   }

  /* Electricidad */

  // Puerta principal (Bosque)
  createEntity(bosque, electricidadPasilloFrames, {
    position: Vector3.create(1.2, 0.2, 1.2),
    scale: Vector3.create(3, 10, 3),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })

  // Vulva
  createEntity(buildingCore, electricidadPasilloFrames, {
    position: Vector3.create(14, 0.1, 14.5),
    scale: Vector3.create(1, 0.7, 1)
  })

  // Inodoros
  createEntity(buildingCore, electricidadPasilloFrames, {
    position: Vector3.create(9, 6.92, 11.54),
    scale: Vector3.create(1.5, 2, 1.5)
  })

  // Lavadero
  createEntity(buildingCore, electricidadPasilloFrames, {
    position: Vector3.create(38.64, 0.05, 11.42),
    scale: Vector3.create(1, 0.6, 1)
  })

  // Pasillo
  createEntity(buildingCore, electricidadPasilloFrames, {
    position: Vector3.create(46.17, 0.05, 30.97),
    scale: Vector3.create(1, 0.9, 1)
  })

  engine.addSystem(AnimationModelsSystem)

  /* Agregar nota */

  const pizarron = engine.addEntity()
  MeshCollider.setBox(pizarron)
  GltfContainer.create(pizarron, { src: 'models/pizarron.gltf' })
  Transform.create(pizarron, blenderTransform(pizarronT, buildingCore))
  const mutablePizarronTransform = Transform.getMutable(pizarron)

  pointerEventsSystem.onPointerDown(
    {
      entity: pizarron,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Agrega una nota' }
    },
    function () {
      enviarMensajePrompt.show()
    }
  )

  // function pizarronSystem(dt: number): void {
  //   if (enviarMensajePrompt.isVisible()) return
  //   if (
  //     !distanceIsLessThan(
  //       Transform.get(pizarron).position,
  //       Transform.get(engine.CameraEntity).position,
  //       4
  //     )
  //   ) {
  //     enviarMensajePrompt.hide()
  //   }
  // }

  // engine.addSystem(pizarronSystem)

  const messageTexts: string[] = []
  let textColors = [
    Color4.create(0.9, 0.1, 0.1),
    Color4.create(0.0, 0.5, 0.0),
    Color4.create(0.1, 0.1, 0.9),
    Color4.create(0.0, 0.5, 0.5),
    Color4.create(0.5, 0.5, 0.0),
    Color4.create(0.9, 0.1, 0.9)
  ]
  textColors = textColors.concat(textColors)

  for (let n = 0; n < 16; n++) {
    const pizarronTextE = engine.addEntity()
    messageTexts.push('')
    TextShape.create(pizarronTextE, {
      text: messageTexts[n],
      fontSize: 1,
      textAlign: 0,
      textColor: textColors[n]
    })
    Transform.create(pizarronTextE, blenderTransform(pizarronT, buildingCore))
    const mutableTransformPizarronTextE = Transform.getMutable(pizarronTextE)
    mutableTransformPizarronTextE.position = Vector3.add(
      mutablePizarronTransform.position,
      Vector3.create(-0.085, 1.9 - n * 0.1, 1.5 - randomRange(0, 0.1))
    )
    // mutablePizarronTransform.rotation = Quaternion.fromEulerDegrees(
    //   0,
    //   90,
    //   -5 + randomRange(0, 10)
    // )
    // mutablePizarronTransform.scale = Vector3.create(0.8, 0.8, 0.8)
  }

  const enviarMensajePrompt = ui.createComponent(ui.FillInPrompt, {
    title: 'Agregar nota en el pizarrón:',
    placeholder: 'Escribe tu nota aquí...',
    acceptLabel: 'Dejar nota',
    onAccept: (value: string): void => {
      enviarMensajePrompt.hide()
    }
    //   async (value: string) => {
    //     const functionSignature = functionSetGreeting.toPayload([value])
    //     const conf = contracts.mensajes.matic
    //     console.log(functionSignature)
    //     console.log(conf)
    //     enviarMensajePrompt.hide()
    //     prepareMetaTransaction(functionSignature, conf)
    //       .then((tx) => {
    //         console.log('Agrega nota Ok ', tx)
    //         refrescarMensajes(10000)
    //         mensajeOk.show()
    //         mensajeError.hide()
    //       })
    //       .catch((e) => {
    //         console.log('Error agregando nota', e)
    //         mensajeOk.hide()
    //         mensajeError.show()
    //       })
    //   }
  })

  /* Refrescar notas */
  // function refrescarMensajes(delay: number = 0):void {
  //   executeTask(async () => {
  //     await sleep(delay)
  //     const messages = await getMensajes()
  //     console.log(messages)
  //     console.log('Mensajes')
  //     for (let n = 0; n < messages.length; n++) {
  //       messageTexts[n].value = messages[n]
  //     }
  //   })
  // }
  // refrescarMensajes()

  /* Broche Instagram */

  const brocheInstagram = engine.addEntity()
  GltfContainer.create(brocheInstagram, { src: 'models/broche_instagram.gltf' })
  Transform.create(
    brocheInstagram,
    blenderTransform(brocheInstagramT, buildingCore)
  )
  MeshCollider.setBox(brocheInstagram)
  pointerEventsSystem.onPointerDown(
    {
      entity: brocheInstagram,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Nuestro Instagram' }
    },
    function () {
      void openExternalUrl({ url: 'https://www.instagram.com/malabiatown/' })
    }
  )

  /* Broche Malabia */

  const brocheMalabia = engine.addEntity()
  GltfContainer.create(brocheMalabia, { src: 'models/broche_malabia.gltf' })
  Transform.create(
    brocheMalabia,
    blenderTransform(brocheMalabiaT, buildingCore)
  )
  MeshCollider.setBox(brocheMalabia)

  pointerEventsSystem.onPointerDown(
    {
      entity: brocheMalabia,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Nuestra web' }
    },
    function (): void {
      void openExternalUrl({ url: 'https://www.malabiatown.org/' })
    }
  )

  /* Cuerno Recepcion */

  const cuerno = engine.addEntity()
  GltfContainer.create(cuerno, {
    src: 'models/cuerno.gltf',
    invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })
  Transform.create(cuerno, blenderTransform(cuernoT, buildingCore))
  MeshCollider.setBox(cuerno)
  AudioSource.createOrReplace(cuerno, {
    audioClipUrl: 'audio/cuerno.mp3',
    playing: false,
    loop: false
    // global:false
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: cuerno,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Tocar' }
    },
    function () {
      AudioSource.getMutable(cuerno).playing = true
    }
  )

  /* Puerta Cortina */

  createEntityWBT(buildingCore, puertaCortinaT, 'models/puerta_cortina.gltf')

  /* Caldero */

  const caldero = createEntityWBT(
    buildingCore,
    calderoT,
    'models/caldero.gltf',
    true
  )
  AudioSource.create(caldero, {
    audioClipUrl: 'audio/caldero.mp3',
    playing: true,
    loop: true
    // global:false
  })
  pointerEventsSystem.onPointerDown(
    {
      entity: caldero,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Sabiduría del caldero'
      }
    },
    function () {
      calderoRandom()
    }
  )

  /* Fogonazo Anim */
  const fogonazoFrames = [
    'models/fogonazo-001.gltf',
    'models/fogonazo-002.gltf',
    'models/fogonazo-003.gltf',
    'models/fogonazo-004.gltf',
    'models/fogonazo-005.gltf',
    'models/fogonazo-006.gltf',
    'models/fogonazo-007.gltf',
    'models/fogonazo-008.gltf',
    'models/fogonazo-009.gltf',
    'models/fogonazo-010.gltf'
  ]

  const fogonazo = createModelsAnimation(fogonazoFrames)
  AnimationModelsComponent.getMutable(fogonazo).playing = true
  AnimationModelsComponent.getMutable(fogonazo).looping = false
  Transform.create(fogonazo, blenderTransform(fogonazoT, buildingCore))
  AudioSource.create(fogonazo, {
    audioClipUrl: 'audio/fogonazo.mp3',
    playing: false,
    loop: false
    // global:false
  })

  /* Marco caldero */

  const marcoCaldero = engine.addEntity()
  GltfContainer.create(marcoCaldero, { src: 'models/marco_caldero.gltf' })
  Transform.create(marcoCaldero, blenderTransform(marcoCalderoT, buildingCore))

  const canvasCaldero = engine.addEntity()
  MeshRenderer.setPlane(canvasCaldero)
  Transform.create(canvasCaldero, blenderTransform(marcoCalderoT, buildingCore))
  const mutableCanvasTransform = Transform.getMutable(canvasCaldero)
  mutableCanvasTransform.position = Vector3.add(
    mutableCanvasTransform.position,
    Vector3.create(-0.01, 0.77, 0)
  )
  mutableCanvasTransform.scale = Vector3.create(1.5, 1.5, 0)
  Material.setPbrMaterial(canvasCaldero, {
    texture: {
      tex: {
        $case: 'texture',
        texture: {
          src: 'textures/rays.png'
          // TODO Wraping mode??
        }
      }
    }
  })

  function calderoRandom(): void {
    const mutable = VideoPlayer.getMutableOrNull(canvasCaldero)
    if (mutable !== null) {
      mutable.playing = false
      mutable.position = 0
    }
    Material.deleteFrom(canvasCaldero)

    const obras = [
      'textures/oraculo/ Daniela Sciata  @danisciata .jpg',
      'textures/oraculo/DSC_5473.jpg',
      'textures/oraculo/DSC_4994.jpg',
      'textures/oraculo/DSC_5567 (1).jpg',
      'textures/oraculo/WhatsApp Image 2021-05-04 at 12.28.19.jpg',
      'textures/oraculo/WhatsApp Image 2021-05-03 at 06.20.12.jpg',
      'textures/oraculo/WhatsApp Image 2021-05-03 at 06.23.33.jpg',
      'textures/oraculo/WhatsApp Image 2021-05-03 at 06.25.15.jpg',
      'textures/oraculo/WhatsApp Image 2021-05-03 at 06.28.50.jpg',
      'textures/oraculo/video Quinteto de Academia en Malabia.mp4',
      'textures/oraculo/Lucia 01.mp4',
      'textures/oraculo/lucia.jpg',
      'textures/oraculo/Lucia 02.mp4',
      'textures/oraculo/lucia02.jpg',
      'textures/oraculo/Juana Varela.jpg',
      'textures/oraculo/@juanavarela_.jpg',
      'textures/oraculo/Karen Magali Romero.jpg',
      //
      'textures/oraculo/IMG-20181010-WA0015~2.jpg',
      'textures/oraculo/IMG_20170227_131716_232.jpg',
      'textures/oraculo/IMG_20170227_225534_708.jpg',
      'textures/oraculo/IMG_20170217_210709_332.jpg',
      'textures/oraculo/IMG_20180227_125637_478.jpg',
      'textures/oraculo/IMG_20180822_123205_370.jpg',
      'textures/oraculo/IMG_20180829_225647_142.jpg',
      'textures/oraculo/IMG_20181101_203711_885.jpg',
      'textures/oraculo/IMG_20190404_193342_728.jpg',
      'textures/oraculo/WP_20160126003 (2).jpg',
      'textures/oraculo/20200621_130659.jpg',
      'textures/oraculo/20200706_133025.jpg',
      'textures/oraculo/IMG_20170531_120753_541.jpg',
      'textures/oraculo/IMG_20180617_215709_HDR.jpg',
      'textures/oraculo/IMG_20180814_185543_HDR.jpg',
      'textures/oraculo/IMG_20180911_221100_823.jpg',
      'textures/oraculo/Picsart2016-15-4--22-43-40.jpg'
    ]
    const textureUrl = obras[randomInt(0, obras.length - 1)]
    console.log(textureUrl)
    if (textureUrl.endsWith('.mp4')) {
      if (
        textureUrl === 'textures/oraculo/Lucia 01.mp4' ||
        textureUrl === 'textures/oraculo/Lucia 02.mp4'
      ) {
        Transform.getMutable(canvasCaldero).scale = Vector3.create(0.8, 1.5, 0)
      } else {
        Transform.getMutable(canvasCaldero).scale = Vector3.create(1.5, 0.9, 0)
      }
      Transform.getMutable(canvasCaldero).rotation =
        Quaternion.fromEulerDegrees(0, 90, 0)

      VideoPlayer.createOrReplace(canvasCaldero, {
        src: textureUrl,
        playing: true,
        position: 0,
        volume: 0.2
      })

      const videoTexture = Material.Texture.Video({
        videoPlayerEntity: canvasCaldero
      })

      Material.setBasicMaterial(canvasCaldero, {
        texture: videoTexture
      })
    } else {
      Transform.getMutable(canvasCaldero).scale = Vector3.create(1.5, 1.5, 0)
      Transform.getMutable(canvasCaldero).rotation =
        // Quaternion.fromEulerDegrees(0, 90, 180)
        Quaternion.fromEulerDegrees(0, 90, 0)

      Material.setBasicMaterial(canvasCaldero, {
        texture: Material.Texture.Common({
          src: textureUrl
        })
      })
      AudioSource.getMutable(fogonazo).playing = true
      AnimationModelsComponent.getMutable(fogonazo).playing = true
    }
  }

  calderoRandom()

  const malabiaUpload = createModelsAnimation(malabiaUploadFrames, true, true)
  Transform.create(
    malabiaUpload,
    blenderTransform(malabiaUploadT, buildingCore)
  )

  const alfombrafx = createModelsAnimation(alfombrafxFrames, true, true)
  Transform.create(alfombrafx, blenderTransform(malabiafxT, buildingCore))

  const plantafx = createModelsAnimation(plantafxFrames, true, true)
  Transform.create(plantafx, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  const caballofx = createModelsAnimation(caballofxFrames, true, true)
  Transform.create(caballofx, blenderTransform(caballofxT, buildingCore))

  const tunelfx = createModelsAnimation(tunelfxFrames, true, true)
  Transform.create(tunelfx, blenderTransform(tunelfxT, buildingCore))

  /* Portal Anim */

  const portalfx = createModelsAnimation(portalfxFrames, true, true)
  Transform.create(portalfx, {
    position: Vector3.create(0, 0, 0),
    parent: bosque
  })

  /* Terraza Anim */

  const terrazafx = createModelsAnimation(terrazafxFrames, true, true)
  Transform.create(terrazafx, blenderTransform(terrazafxT, buildingCore))

  /* Vela Anim */

  const velafx = engine.addEntity()
  GltfContainer.create(velafx, { src: 'models/vela.gltf' })
  Transform.create(velafx, blenderTransform(velaT, buildingCore))

  /* Exit Anim */

  const exit1 = createModelsAnimation(exitFrames, true, true)
  Transform.create(exit1, blenderTransform(exit1T, buildingCore))

  const exit2 = createModelsAnimation(exitFrames)
  Transform.create(exit2, blenderTransform(exit2T, buildingCore))
}
