import { AppState } from "../AppState"
import { api } from "./AxiosService"



class BracketsService{

    async getBracketById(id){
        let res = await api.get(`api/brackets/${id}`)
        console.log("here is getBracketById return", res.data)
        let bracket = res.data
        AppState.currentBracket = bracket
    }
    async getBracketMatches(id){
        let res = await api.get(`api/brackets/${id}/matches`)
        console.log("here is getBracketMatches return", res.data)
        let matches = res.data
        AppState.bracketMatches = matches
    }

}

export const bracketsService = new BracketsService