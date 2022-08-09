<template>
    <div class="component">

        <div class="m-3 p-3">
            {{ bracket.name }}
        </div>
        <div class="m-3 p-3">
            {{ matches[0]?.round }}
            {{ matches[1]?.round }}
        </div>
        <div class="m-3 p-3">
            {{ teams[0]?.name }}
            {{ teams[1]?.name }}
            {{ teams[2]?.name }}
            {{ display7() }}
        </div>
        <div>
            <v-stage :config="{ width: 200, height: 200 }">
                <v-layer>
                    <v-text></v-text>
                    <v-rect :config="{
                        x: 20,
                        y: 50,
                        width: 100,
                        height: 100,
                        fill: 'red',
                    }" />
                </v-layer>
            </v-stage>
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
                return '7'
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