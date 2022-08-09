<template>
    <div class="component">
        <div class="matchBox">
            <p>{{ match.slot }} | {{ match.round }}</p>
            <v-stage :config="{ width: 200, height: 200 }">
                <v-layer ref="layer">
                    <v-rect :config="{
                        x: 20,
                        y: 50,
                        width: 200,
                        height: 100,
                        fill: 'aqua',
                    }" />
                    <v-text @click="popTeam(match.matchTeams[0].name)" ref="text" :config="{
                        x: 20,
                        y: 50,
                        text: match.matchTeams[0].name,
                        fill: 'black'
                    }" />
                    <v-text @click="popTeam(match.matchTeams[1].name)" ref="text" :config="{
                        x: 20,
                        y: 138,
                        text: match.matchTeams[1].name,
                        fill: 'black'
                    }" />
                </v-layer>
            </v-stage>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import Pop from '../utils/Pop';

export default {
    props: { match: { type: Object, required: true } },
    setup(props) {
        let text = 'here is some test text'
        return {
            text,
            popTeam(text) {
                Pop.toast(text, "info")
                
                let nextMatch = AppState.bracketMatches.find(m => m.slot == props.match.nextSlot)
                nextMatch.teams.push(nextMatch.id)
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.matchBox {
    width: 15vh;
    background-color: rgb(248, 248, 246);
    color: rgb(10, 10, 10);
}
</style>