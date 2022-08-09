<template>
    <div class="component">

        <div class="m-3 p-3">
            {{ bracket.name }}
        </div>
        <div class="m-3 p-3">
            {{ matches[0].round }}
            {{ matches[1].round }}
        </div>
        <div class="m-3 p-3">
            {{ teams[0].name }}
            {{ teams[1].name }}
            {{ teams[2].name }}
            {{ display7() }}
        </div>

    </div>
</template>


<script>
import { computed, onMounted } from 'vue'
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
                await bracketsService.getBracketById(route.params.bracketId)
                console.log("here is on mounted sending id", id)
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
                return '7'
            }

        }
    }
}
</script>


<style lang="scss" scoped>
</style>