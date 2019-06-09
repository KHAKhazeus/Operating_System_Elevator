<template>
    <html>

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
                <br/>
                <b-row style="margin-top:10px;background:black;">
                    <div class="col-sm-4 text-center no-gutter" style="color:white; font-size: 85% ;margin-left:20px">
                        1
                        <div id="outershownum1" style="font-family: 'digital-clock-font'">20</div>
                        <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" id="outershowup1"></i>
                        <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" id="outershowdown1"></i>
                    </div>
                    <div class="col-sm-4 text-center no-gutter" style="color:white; font-size: 85% ;margin-left:20px">
                        2
                        <div id="outershownum2" style="font-family: 'digital-clock-font'">20</div>
                        <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" id="outershowup2"></i>
                        <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" id="outershowdown2"></i>
                    </div>
                     <div class="col-sm-4 text-center no-gutter" style="color:white; font-size: 85% ;margin-left:20px">
                        3
                        <div id="outershownum3" style="font-family: 'digital-clock-font'">20</div>
                        <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" id="outershowup3"></i>
                        <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" id="outershowdown3"></i>
                    </div>
                     <div class="col-sm-4 text-center no-gutter" style="color:white; font-size: 85% ;margin-left:20px">
                        4
                        <div id="outershownum4" style="font-family: 'digital-clock-font'">20</div>
                        <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" id="outershowup4"></i>
                        <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" id="outershowdown4"></i>
                    </div>
                     <div class="col-sm-4 text-center no-gutter" style="color:white; font-size: 85% ;margin-left:20px">
                        5
                        <div id="outershownum5" style="font-family: 'digital-clock-font'">20</div>
                        <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" id="outershowup5"></i>
                        <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" id="outershowdown5"></i>
                    </div>
                </b-row>
            </b-col>
            <ElevatorPit
                v-for="elevator in elevatorList"
                v-bind:elevator="elevator"
                v-bind:key="elevator.id">
            </ElevatorPit>
        </b-row>
    </b-container>
    </html>
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
