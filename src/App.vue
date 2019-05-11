<template>
    <b-container id="app" fluid class="text-center">
        <b-row>
            <b-col class="nes-container is-rounded">
                <span class="nes-text is-primary" style="font-size:1vw;">Control Panel</span>
                <b-row style="margin-top: 10px">
                <ElevatorControl
                    v-for="now in numberList"
                    v-bind:now="now"
                    v-bind:key="now">
                </ElevatorControl>
                </b-row>
                <br />
                <b-button variant="danger" onclick="reloadpage()">Reload</b-button>
            </b-col>
            <ElevatorPit
                v-for="elevator in elevatorList"
                v-bind:elevator="elevator"
                v-bind:key="elevator.id">
            </ElevatorPit>
        </b-row>
    </b-container>
</template>

<script>
import ElevatorPit from './components/ElevatorPit.vue'
import ElevatorControl from './components/ElevatorControl.vue'
let nextTodoId = 1
var number= []
for (var i=1;i < 21; i++){
    number.push(i)
}
export default {
    components: {
        ElevatorPit,
        ElevatorControl
    },
    data () {
        return {
        elevatorList: [
                {
                    id: nextTodoId++
                },
                {
                    id: nextTodoId++
                },
                {
                    id: nextTodoId++
                },
                {
                    id: nextTodoId++
                },
                {
                    id: nextTodoId++
                },
            ],
        numberList: number
        }
    },
}
</script>
