import { DADATATOKEN, URLDADATAGEO } from "../GLOBAL"

export const requestDadataCoordinates = async (el:any, setValue?:any) => {
    try {
        const request = await fetch(URLDADATAGEO, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + DADATATOKEN
            },
            body: JSON.stringify(el)
        })
        const response = await request.json()
        if (request.status === 200){                        
            response?.suggestions?.length > 0 && setValue(response.suggestions[0])
        }
    }catch (e) {
        console.log(e)
    }
}