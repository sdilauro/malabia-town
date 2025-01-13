import { executeTask } from "@dcl/sdk/ecs"
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
import { getPlayer } from '@dcl/sdk/src/players'
import * as EthConnect from 'eth-connect'
import { abiManaArray } from "./erc20Abi"
// import { abi } from './abi/abi'


export async function makeDonation(donation: number): Promise<void> {
    console.log('Making a donation of: ' + donation)
    executeTask(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const provider = await createEthereumProvider()
        const requestManager = new EthConnect.RequestManager(provider)
        const factory = new EthConnect.ContractFactory(requestManager, abiManaArray)
        const contract = (await factory.at('0x1a1792286a870d6630a80C924B39E37eD6618082')) as any
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const player = await getPlayer()
        const address = player?.userId
        const res =  contract.transfer('0x1a1792286a870d6630a80C924B39E37eD6618082', donation, {
            from: address,
          })
        console.log(res)
      } catch (error: any) {
        console.log(error.toString())
      }
    })
  }
  