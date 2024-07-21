import { AppState } from "../AppState.js"
import { MonetaryPicture } from "../models/MonetaryPicture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class MonetaryPictureService {
    async getMonetaryPictures(){
        const response = await api.get('api/ads')
        logger.log("Getting the ads 💸", response.data)
        const monetaryPictures = response.data.map(monetaryPictureData => new MonetaryPicture(monetaryPictureData))
        AppState.monetaryPictures = monetaryPictures
        
    }
}

export const monetaryPicturesService = new MonetaryPictureService()