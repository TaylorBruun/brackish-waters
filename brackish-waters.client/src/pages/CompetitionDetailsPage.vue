<template>
    <div class="container-fluid">
        <div class="row d-flex flex-column">
            <div class="col">
                <div>
                    <h3 class="m-2 p-2">{{ competition.name }}
                        <img class="competition-img p-2 img-fluid" :src="competition.img" alt="">
                    </h3>
                </div>
                <div>
                    <h5 class="m-2 p-2">Brackets for this Competition:</h5>
                    <div class="row">
                        <Bracket v-for="b in brackets" :key="b.id" :bracket="b" />
                        <div>
                            <div class="col button my-2">
                                <h6 class="p-4">
                                    Create New Bracket
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { competitionsService } from '../services/CompetitionsService'
import Pop from '../utils/Pop'

export default {
    setup() {
        const route = useRoute()


        onMounted(async () => {
            try {
                await competitionsService.getCompetitionById(route.params.id)
                await competitionsService.getCompetitionBrackets(route.params.id)
            } catch (error) {
                console.error(error)
                Pop.error(error)
            }
        })
        return {
            competition: computed(() => AppState.currentCompetition),
            brackets: computed(() => AppState.competitionBrackets),
           


        }
    }
}
</script>


<style lang="scss" scoped>
.competition-img {
    max-width: 15vh;
}

.button {
    border: 1px;
    border-style: solid;
    border-color: (#37bbd3);
    transition: all 0.1s linear;
    border-radius: .5%;
}

.button:hover {
    transform: scale(1.02);
    cursor: pointer;
    opacity: 0.9
}
</style>