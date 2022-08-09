<template>
    <div class="component">

        <div class="m-3 p-3">
            {{ bracket.name }}
        </div>
        <div class="m-3 p-3">

            <Match class="p-2" v-for="m in matches" :key="m.id" :match="m" />
            
        </div>
        <div class="m-3 p-3">
            
            {{ display7() }}
        </div>
        <div>
            
        </div>
    </div>
</template>


<script>
import { computed, onMounted, popScopeId } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bracketsService } from '../services/BracketsService'
import { competitionsService } from '../services/CompetitionsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
    setup() {
        const route = useRoute()

        onMounted(async () => {
            try {
                console.log("here is bracketId", route.params.bracketId)
                await bracketsService.getBracketById(route.params.bracketId)
                console.log("here is on mounted sending id", route.params.bracketId)
                await bracketsService.getBracketMatches(route.params.bracketId)
                await competitionsService.getCompetitionTeams(route.params.id)
            } catch (error) {
                logger.error(error)
                Pop.toast(error, 'error')
            }
        })
        return {
            route,
            bracket: computed(() => AppState.currentBracket),
            matches: computed(() => AppState.bracketMatches),
            teams: computed(() => AppState.competitionTeams),

            display7() {
                return 7
            },

            clicked(matchId) {
                Pop.toast(matchId, "info")
            }

        }
    }
}
</script>


<style lang="scss" scoped>
</style>