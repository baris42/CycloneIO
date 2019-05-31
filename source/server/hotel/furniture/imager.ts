import fs from 'fs'
import Environment from '../../environment'

interface FurnitureData {
    roomitemtypes: roomItemType
};

interface roomItemType {
    furnitype: any
};

export default class FurnitureImager {

    private async load(filename: string): Promise {
        
        return new Promise((resolve, reject) => {

            fs.readFile(filename, (error: Error, data: any) => {
                
                if (error) {
                    reject(error)
                }   
                
                resolve(JSON.parse(data))
            })
        })
    }

    public async getFurniture(id: number): Promise {

        return new Promise((resolve, reject) => {
            this.load('web-gallery/gamedata/furnidata.json').then((furnidata: any) => {

                let item = furnidata.roomitemtypes.furnitype.find(item => {
                    return id == item.id
                })

                if (item === undefined) {
                    reject(`Item ${id} not found`)
                }

                resolve(item)
            })
        })
    }
    
    //     await ItemImager.load('web-build/gamedata/furnidata.json').then((furnidata) => {

    //         return new Promise((resolve, reject) => {

    //             let item = furnidata.roomitemtypes.furnitype.find(item => {
    //                 return id == item.id
    //             })

    //             if (item === undefined) {
    //                 reject(`Item ${id} not found`)
    //             }

    //             resolve(item)

    //         }).catch(error => {
    //             Environment.instance.logger.error(error)
    //         })
    //     })
    //}
}