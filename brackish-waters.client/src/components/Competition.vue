<template>

    <div class="col-md-3 my-2 p-2">
        <div @click="selectCompetition" class="competition-card">
            <h3 class="p-2">{{ competition.name }}</h3>
            <img class="p-2 img-fluid" :src="competition.img" alt="">
            <h6 class="p-2 text-muted">Begins: {{ formatDate(competition.startDate) }}</h6>
            <p class="m-0 p-2 pb-4">{{ competition.description }}</p>
        </div>
    </div>

</template>


<script>
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
    props: { competition: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {

            formatDate(rawDate) {
                return new Date(rawDate).toLocaleDateString()
            },

            selectCompetition() {
                logger.log("pushing with id", props.competition.id)
                router.push({ name: "CompetitionDetails", params: { id: props.competition.id } })
            },

        }
    }
}
</script>


<style lang="scss" scoped>
.competition-card {
    background-color: rgb(224, 236, 238);
    color: rgb(5, 5, 5);
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.1s linear;
    border-radius: .5%;
}

.competition-card:hover {
    transform: scale(1.02);
    cursor: pointer;
    opacity: 0.9
}
</style>