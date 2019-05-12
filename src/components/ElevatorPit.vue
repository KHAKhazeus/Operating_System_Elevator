<template>
    <b-col class="nes-container is-rounded">
        <span class="nes-text is-primary" style="font-size:1vw;">No. {{elevator.id}} elevator</span>
        <b-row style="height: 90vh;">
            <div class="col-sm-5 text-center container-fluid no-gutter" style="height: 95%;margin-top:3vh; background: black" id="eleBox">
              <div style="height: 100%; width:100%">
                <img src="@/assets/elevator.png" style="position: absolute; top: 0;left:0; width: 100%; margin-top:0vh;z-index:0;" :id="'elepic'+elevator.id" />
                <img src="@/assets/elevatorcover.png" style="position: absolute; top: 0;left:0; width: 100%;margin-top:0vh;z-index:1;" :id="'elepiccover'+elevator.id" />
                <!-- class="animated bounceIn delay-2s" -->
              </div>
            </div>
            <div class="col-sm-6 text-center no-gutter" style="margin-top:3vh"> 
              <div style="background: black; width:100%">
                <div class="row">
                  <div class="col-sm-4 text-center no-gutter" style="color: white;">
                      
                  </div>
                  <div class="col-sm-2 text-center no-gutterr" style="color: white; font-size:100%;" :id="'needsfittyelepic' + elevator.id">20</div>
                </div>
                <br/>
                <i class="fas fa-arrow-circle-up" style="width: 100%; color: white; opacity: 0.3;" :id="'upicon' + elevator.id"></i>
                <br/>
                <i class="fas fa-arrow-circle-down" style="width: 100%; color: white;opacity: 0.3;" :id="'downicon' + elevator.id"></i>
              </div>
              <div style="backgroud: blue; margin-top:3vh">
                <b-button variant="outline-primary" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + 'OPEN'" >OPEN</b-button>
                <b-button variant="outline-primary" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + 'CLOSE'" >CLOSE</b-button>
                <b-button variant="outline-warning" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + 'alert'" >ALERT</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '1'" >1</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '2'" >2</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em ;margin: 0.1em;" :id="'ele' + elevator.id + '3'" >3</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '4'" >4</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '5'" >5</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '6'">6</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '7'" >7</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '8'" >8</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '9'" >9</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '10'" >10</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '11'" >11</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '12'" >12</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '13'" >13</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '14'" >14</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '15'" >15</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '16'" >16</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '17'" >17</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '18'" >18</b-button>
                <br/>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '19'" >19</b-button>
                <b-button variant="outline-dark" style="font-size: 60%; padding: 0.1em; margin: 0.1em;" :id="'ele' + elevator.id + '20'" >20</b-button>
              </div>
            </div>
        </b-row>
    </b-col>
</template>

<script>

export default {
    props: {
    elevator: {
      type: Object,
      default: null,
    }
  },
}
</script>