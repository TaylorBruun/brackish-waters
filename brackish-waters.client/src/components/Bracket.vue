<template>
    <div class="component">

        <div @click="selectBracket" class="col bracket my-2">
            <h6 class=p-4>
                {{ bracket.name }}
            </h6>
        </div>

    </div>
</template>


<script>
import { useRouter } from 'vue-router'

export default {
    props: { bracket: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {

            selectBracket() {
                console.log("pushing with id", props.bracket.id)
                router.push({ name: "BracketDetails", params: { id: props.bracket.competitionId, bracketId: props.bracket.id } })
            },
        }
    }
}
</script>


<style lang="scss" scoped>
.bracket {
    background-color: (#37bbd3);
    color: rgb(5, 5, 5);
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.1s linear;
    border-radius: .5%;
}

.bracket:hover {
    transform: scale(1.02);
    cursor: pointer;
    opacity: 0.9
}
</style>