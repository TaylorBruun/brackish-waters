<template>
  <div class="container-fluid">
    <div class="row justify-content-around">

      <Competition v-for="c in competitions" :key="c.id" :competition="c" />
    </div>
  </div>


</template>


<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { competitionsService } from '../services/CompetitionsService'
import Competition from '../components/Competition.vue'

export default {
    setup() {
        onMounted(async () => await competitionsService.getCompetitions());
        return {
            competitions: computed(() => AppState.competitions)
        };
    },
    components: { Competition }
}
</script>


<style lang="scss" scoped>

</style>