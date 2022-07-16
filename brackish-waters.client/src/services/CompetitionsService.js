import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CompetitionsService{

async getCompetitions(){
    let res = await api.get('api/competitions')
    console.log(res.data)
    AppState.competitions = res.data
}

async getCompetitionById(id){
    let res = await api.get(`api/competitions/${id}`)
    console.log('Here is the competition with Id', id, res.data)
    let competition = res.data
    AppState.currentCompetition = competition
}
async getCompetitionBrackets(id){
    let res = await api.get(`api/competitions/${id}/brackets`)
    console.log('Here are the brackets for competionId', id, res.data)
    let brackets = res.data
    AppState.competitionBrackets = brackets
}
async getCompetitionTeams(id){
    let res = await api.get(`api/competitions/${id}/teams`)
    console.log('Here are the teams in the competition with Id', id,  res.data)
    let teams = res.data
    AppState.competitionTeams = teams
}

}

export const competitionsService = new CompetitionsService()