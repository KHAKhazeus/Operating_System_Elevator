import Vue from 'vue'
// import VueWorker from 'vue-worker'
import App from './App'
// Vue.use(VueWorker)
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import VueNesCss from 'vuenes.css'

Vue.use(VueNesCss)
new Vue({
  render: h => h(App),
}).$mount('#app')
import anime from 'animejs'


let DIRECTION= {
  'UP' : 1,
  'DOWN': -1,
  'WAIT' : 0
}
let USE = {
  'BROKEN': 1,
  'OK': 0,
}
let CALLTYPE = {
  'FETCH' : 1,
  'ARRIVE' : 2
}
var pitLength = document.getElementById('eleBox').offsetHeight
var space = (pitLength)/22
var space_duration = 500
var requestPool = []

window.addCall = addCall

class Call{
  constructor(callType, floor, direction){
    this.callType = callType
    this.floor = floor
    this.direction = direction
    this.assigned = false
  }
}
window.Call = Call

class Lift{
  constructor(lift_id){
    this.id = lift_id
    this.picid = 'elepic' + lift_id
    this.numid = 'needsfittyelepic' + lift_id
    this.doorid = 'elepiccover' + lift_id
    this.upiconid = 'upicon' + lift_id
    this.downiconid = 'downicon' + lift_id
    this.outnumid = 'outershownum' + lift_id
    this.outupiconid = 'outershowup' + lift_id
    this.outdowniconid = 'outershowdown' + lift_id
    this.door = true
    this.floor = 1
    this.direction = DIRECTION.WAIT
    this.picWidth = document.getElementById(this.doorid).offsetWidth
    this.destPool = []
    this.currentdestArray = []
    this.fetchtarget = null
    this.fetchdirection = null
    this.fetchrunningdirection = null
    this.needReopen = false;
    this.status = true

    this.activatedownicon = {
      targets:[document.getElementById(this.downiconid), document.getElementById(this.outdowniconid)],
      easing: 'linear',
      opacity: 1,
      duration: 1
    }
    this.deactivatedownicon = {
      targets:[document.getElementById(this.downiconid), document.getElementById(this.outdowniconid)],
      easing: 'linear',
      opacity: 0.3,
      duration: 1
    }
    this.activateupicon = {
      targets:[document.getElementById(this.upiconid), document.getElementById(this.outupiconid)],
      easing: 'linear',
      opacity: 1,
      duration: 1
    }
    this.deactivateupicon = {
      targets:[document.getElementById(this.upiconid), document.getElementById(this.outupiconid)],
      easing: 'linear',
      opacity: 0.3,
      duration: 1
    }

    this.completeAniOnce = {
      complete: function(anim){
        oneAni(lift_id - 1)
      },
      duration : 1
    }

    this.upOnePicAni = {
      targets: document.getElementById(this.picid),
      easing: 'linear',
      translateY: '-=' + space,
      duration: space_duration
    }
    this.upOneNumAni = {
      targets: [document.getElementById(this.numid), document.getElementById(this.outnumid)],
      easing: 'linear',
      innerText: '+=1',
      round: 1,
      duration: space_duration
    }

    this.upOneDoorAni = {
      targets: document.getElementById(this.doorid),
      easing: 'linear',
      translateY: '-=' + space,
      duration: space_duration
    }
  
    this.downOnePicAni = {
      targets: document.getElementById(this.picid),
      easing: 'linear',
      translateY: '+=' + space,
      duration: space_duration
    }
  
    this.downOneNumAni = {
      targets: [document.getElementById(this.numid), document.getElementById(this.outnumid)],
      easing: 'linear',
      innerText: '-=1',
      round: 1,
      duration: space_duration
    }

    this.downOneDoorAni = {
      targets: document.getElementById(this.doorid),
      easing: 'linear',
      translateY: '+=' + space,
      duration: space_duration
    }
    
    this.openDoorAni = {
      targets: document.getElementById(this.doorid),
      easing: 'linear',
      width: '0%',
      duration: space_duration
    }

    this.closeDoorAni = {
      targets: document.getElementById(this.doorid),
      easing: 'linear',
      width: '100%',
      duration: space_duration
    }
    
    this.alertingAni = {
      targets: document.getElementById(this.doorid),
      easing: 'spring(1, 80, 10, 0)',
      scale: 1.5,
      duration: space_duration
    }
    this.backalertingAni = {
      targets: document.getElementById(this.doorid),
      easing: 'spring(1, 80, 10, 0)',
      scale: 1,
      duration: space_duration
    }

  }
}

var eleList = []
for (var i=1; i < 6; i++){
  eleList.push(new Lift(i))
}

function addCall(call){
  if(call.callType == 'fetch'){
    //console.log(call)
    if(call.direction == 'up'){
      call.direction = DIRECTION.UP
    }
    else{
      call.direction = DIRECTION.DOWN
    }
    var insert = true
    for( var requestIndex in requestPool){
      var request = requestPool[requestIndex]
      if(request.callType == call.callType && request.direction == call.direction && request.floor == call.floor){
        insert = false
      }
    }
    if(insert){
      requestPool.push(call)
    }
    // //console.log(requestPool)
  }
  else if(call.callType == 'arrive'){
    var insert = true
    for( var requestIndex in eleList[call.direction - 1].destPool){
      var request = eleList[call.direction - 1].destPool[requestIndex]
      if(request.callType == call.callType && request.direction == call.direction && request.floor == call.floor){
        insert = false
      }
    }
    if(insert){
      eleList[call.direction - 1].destPool.push(call)
    }
    //console.log(call)
  }
  else if(call.callType == 'alert'){
    //delete from queue
    eleList[call.direction - 1].status = false
    //console.log("alert")
  }
  else if(call.callType == 'open'){
    eleList[call.direction - 1].needReopen = true;
  }
  else if(call.callType == 'close'){
    eleList[call.direction - 1].needReopen = false;
  }
}

var outerbuttonList = []
for(var i = 1; i < 21; i++){
  outerbuttonList.push('eleup' + i)
  outerbuttonList.push('eledown' + i)
}
var innerbuttonList = []
for(var i = 1; i < 21; i++){
  innerbuttonList.push('ele' + '1' + i)
  innerbuttonList.push('ele' + '2' + i)
  innerbuttonList.push('ele' + '3' + i)
  innerbuttonList.push('ele' + '4' + i)
  innerbuttonList.push('ele' + '5' + i)
  innerbuttonList.push('ele' + '1' + 'alert')
  innerbuttonList.push('ele' + '2' + 'alert')
  innerbuttonList.push('ele' + '3' + 'alert')
  innerbuttonList.push('ele' + '4' + 'alert')
  innerbuttonList.push('ele' + '5' + 'alert')
  innerbuttonList.push('ele' + '1' + 'OPEN')
  innerbuttonList.push('ele' + '1' + 'CLOSE')
  innerbuttonList.push('ele' + '2' + 'OPEN')
  innerbuttonList.push('ele' + '2' + 'CLOSE')
  innerbuttonList.push('ele' + '3' + 'OPEN')
  innerbuttonList.push('ele' + '3' + 'CLOSE')
  innerbuttonList.push('ele' + '4' + 'OPEN')
  innerbuttonList.push('ele' + '4' + 'CLOSE')
  innerbuttonList.push('ele' + '5' + 'OPEN')
  innerbuttonList.push('ele' + '5' + 'CLOSE')
}
window.outerbuttonList = outerbuttonList
window.innerbuttonList = innerbuttonList

window.onload=function(){
  for(var index in outerbuttonList){
    var id = outerbuttonList[index]
    document.getElementById(id).disabled = true
  }
  for(var index in innerbuttonList){
    var id = innerbuttonList[index]
    document.getElementById(id).disabled = true
  }

  var restart = function(){
    var tl = anime.timeline({
      easing: 'linear',
      // duration: space_duration,
    });
    var number_tl = anime.timeline({
      easing: 'linear',
      // duration: space_duration,
    });
    var offset = 5000
    for (var eleindex in eleList){
      var ele = eleList[eleindex]
      for (var i=1;i<20;i++){
        if(i == 19 && eleindex == 4){
          var downOneUpdate = {
            complete: function(anim){
              for(index in outerbuttonList){
                var id = outerbuttonList[index]
                var but = document.getElementById(id)
                but.disabled = false
                if(id[3] == 'u'){
                  var floor = id.substr(5)
                  but.setAttribute("onclick", "addCall(new Call('fetch'," + floor + ", 'up'))")
                }
                else{
                  var floor = id.substr(7)
                  but.setAttribute("onclick", "addCall(new Call('fetch'," + floor + ", 'down'))")
                }
              }
              for(index in innerbuttonList){
                var id = innerbuttonList[index]
                var but = document.getElementById(id)
                but.disabled = false
                var elenumber = id[3]
                var floor = id.substr(4)
                if(floor == 'alert'){
                  but.setAttribute("onclick", "addCall(new Call('alert'," + floor + ", "+ elenumber + "))")
                }
                else if(floor == 'OPEN'){
                  but.setAttribute("onclick", "addCall(new Call('open'," + "open" + ", "+ elenumber + "))")
                }
                else if(floor == "CLOSE"){
                  but.setAttribute("onclick", "addCall(new Call('close'," + "close" + ", "+ elenumber + "))")
                }
                else{
                  but.setAttribute("onclick", "addCall(new Call('arrive'," + floor + ", "+ elenumber + "))")
                }
              }
              setInterval(beat, 100)
              oneAni(0)
              oneAni(1)
              oneAni(2)
              oneAni(3)
              oneAni(4)
            }
          }
          tl.add(ele.downOnePicAni, offset + (i - 1) * space_duration)
          tl.add(ele.downOneNumAni, offset + (i - 1) * space_duration)
          tl.add(ele.downOneDoorAni, offset + (i - 1) * space_duration)
          tl.add(downOneUpdate, offset + 19 * space_duration)
          // tl.add(ele.openDoorAni, offset + 19 * space_duration)
        }
        else{
          tl.add(ele.downOnePicAni, offset + (i - 1) * space_duration)
          tl.add(ele.downOneNumAni, offset + (i - 1) * space_duration)
          tl.add(ele.downOneDoorAni, offset + (i - 1) * space_duration)
        }
      }
    }
    tl.restart()
  }
  restart()

  //start cycles
}

var beat = () => {
  // //console.log(requestPool)
  wholeDispatch();
  individualDispatch();
};

var wholeDispatch = () => {
  if( requestPool.length){
    for (var index in requestPool){
      var request = requestPool[index]
      var floor = request.floor
      var direction = request.direction
      var possibleEle = []
      var minDis = 21
      var minIndex = 6
      var posDis = 21
      var posIndex = 6
      for(var eleindex in eleList){
        var ele = eleList[eleindex]
        if(!ele.status){
          continue
        }
        if(ele.floor == floor || ele.currentdestArray.indexOf(floor) != -1){
          minDis = 0
          minIndex = eleindex
          requestPool.splice(index, 1)
          if(ele.floor == floor){
            ele.destPool.push(request)
          }
          break;
        }
        else if(direction == ele.direction && Math.abs(floor - ele.floor) < minDis){
          if( (direction == DIRECTION.UP && floor - ele.floor > 0) || (direction == DIRECTION.DOWN && floor - ele.floor < 0) ){
            minDis = Math.abs(floor - ele.floor)
            minIndex = eleindex
          }
        }
        else if(ele.direction == DIRECTION.WAIT && Math.abs(floor - ele.floor) < posDis){
          if(ele.fetchtarget == null){
            posDis = Math.abs(floor - ele.floor)
            posIndex = eleindex
            ele.fetchtarget = floor
            ele.fetchdirection = direction
            if(floor - ele.floor){
              ele.fetchrunningdirection = DIRECTION.UP
            }
            else{
              ele.fetchrunningdirection = DIRECTION.DOWN
            }
          }
          else if(ele.fetchdirection == direction){
            if(ele.fetchrunningdirection == DIRECTION.UP && floor - ele.floor > 0){
              if(floor - ele.fetchtarget){
                ele.fetchtarget = floor
              }
              posIndex = eleindex
              posDis = 0
            }
            else if(ele.fetchrunningdirection == DIRECTION.DOWN && floor - ele.floor < 0){
              if(floor - ele.fetchtarget < 0){
                ele.fetchtarget = floor
              }
              posIndex = eleindex
              posDis = 0
            }
          }
        }
      }
      if(minIndex != 6 && minDis != 0){
        var insert = true
        for( var requestIndex in eleList[minIndex].destPool){
          var request_old = eleList[minIndex].destPool[requestIndex]
          if(request_old.callType == request.callType && request_old.direction == request.direction && request_old.floor == request.floor){
            insert = false
          }
        }
        if(insert){
          eleList[minIndex].destPool.push(request)
        }
        //console.log("pushed")
        requestPool.splice(index, 1)
      }
      else if(minIndex == 6 && posIndex != 6 && minDis !=0 ){
        var insert = true
        for( var requestIndex in eleList[posIndex].destPool){
          var request_old = eleList[posIndex].destPool[requestIndex]
          if(request_old.callType == request.callType && request_old.direction == request.direction && request_old.floor == request.floor){
            insert = false
          }
        }
        if(insert){
          eleList[posIndex].destPool.push(request)
        }
        //console.log("pushed")
        requestPool.splice(index, 1)
      }
    } 
  }
  // //console.log("one whole")
  if(requestPool.length){
    //console.log(requestPool)
  }
  for(ele in eleList){
    var elevator = eleList[ele]
    if(elevator.destPool.length){
      // console.log(elevator.destPool)
    }
  }
}

var individualDispatch = () => {
  //update currentdestArray
  for(var eleIndex in eleList){
    var ele = eleList[eleIndex]
    var direction = ele.direction
    var floor = ele.floor
    //console.log(ele.destPool)
    //console.log("indivi")
    ele.currentdestArray = []
    if(ele.destPool.length > 0){
      // round 1: check direction currentFloor fetch arrive and others
      for(var destIndex in ele.destPool){
        var destCall = ele.destPool[destIndex]
        ele.currentdestArray.push(destCall.floor)
        console.log("dispatched")
      }
    }
  }
}

var oneAni = (eleIndex) => {

  var ele = eleList[eleIndex]
  // console.log(ele)
  var new_timeline = anime.timeline({
    easing: 'linear',
    duration: space_duration,
  });
  if(ele.currentdestArray.length && ele.status){
    ele.needReopen = false;
    console.log("inOnce")
    ele.currentdestArray = ele.currentdestArray.sort((a,b) => a-b)
    if(ele.currentdestArray.length){
      console.log(ele.currentdestArray)
    }
    var first = ele.currentdestArray[0]
    var last = ele.currentdestArray[ele.currentdestArray.length - 1]
    if(ele.direction == DIRECTION.WAIT){
      for(var destIndex in ele.currentdestArray){
        var dest = ele.currentdestArray[destIndex]
        var min = 21
        if(dest == ele.floor){
          new_timeline.add(ele.openDoorAni)
          ele.door = false
          for(var innerdestIndex in ele.destPool){
            var destCall = ele.destPool[innerdestIndex]
            if(destCall.floor == ele.floor){
              ele.destPool.splice(innerdestIndex, 1)
            }
          }
          ele.currentdestArray.splice(destIndex,1)
          continue
        }
        else if(dest > ele.floor){
          min = Math.abs(ele.floor - dest)
        }
        if(min == 21){
          if(!ele.door){
            new_timeline.add(ele.closeDoorAni)
          }
          document.getElementById(ele.downiconid).style.opacity = 1
          document.getElementById(ele.outdowniconid).style.opacity = 1
          new_timeline.add(ele.downOneNumAni).add(ele.downOnePicAni, "-=" + space_duration).add(ele.downOneDoorAni,"-=" + space_duration)
          ele.floor -= 1
          ele.direction = DIRECTION.DOWN
          ele.door = true
          break;
        }
        else if(ele.currentdestArray.length >= 2 && min > Math.abs(ele.floor - ele.currentdestArray[destIndex - 1])){
          if(!ele.door){
            new_timeline.add(ele.closeDoorAni)
          }
          document.getElementById(ele.downiconid).style.opacity = 1
          document.getElementById(ele.outdowniconid).style.opacity = 1
          new_timeline.add(ele.downOneNumAni).add(ele.downOnePicAni, "-=" + space_duration).add(ele.downOneDoorAni,"-=" + space_duration)
          ele.floor -= 1
          ele.direction = DIRECTION.DOWN
          ele.door = true
          break;
        }
        else{
          if(!ele.door){
            new_timeline.add(ele.closeDoorAni)
          }
          document.getElementById(ele.upiconid).style.opacity = 1
          document.getElementById(ele.outupiconid).style.opacity = 1
          new_timeline.add(ele.upOneNumAni).add(ele.upOnePicAni, "-=" + space_duration).add(ele.upOneDoorAni,"-=" + space_duration)
          ele.floor += 1
          ele.direction = DIRECTION.UP
          ele.door = true
          break;
        }
      }
    }
    else if(ele.direction == DIRECTION.UP){
      if(ele.currentdestArray[ele.currentdestArray.length - 1] < ele.floor){
        if(!ele.door){
          new_timeline.add(ele.closeDoorAni)
        }
        // new_timeline.add(ele.deactivatedownicon).add(ele.deactivateupicon)
        document.getElementById(ele.upiconid).style.opacity = 0.3
        document.getElementById(ele.downiconid).style.opacity = 0.3
        document.getElementById(ele.outdowniconid).style.opacity = 0.3
        document.getElementById(ele.outupiconid).style.opacity = 0.3
        ele.direction = DIRECTION.WAIT
        ele.fetchtarget = null
      }
      else{
        for(var destIndex in ele.currentdestArray){
          var dest = ele.currentdestArray[destIndex]
          var min = 21
          if(dest == ele.floor){
            new_timeline.add(ele.openDoorAni)
            ele.door = false
            for(var innerdestIndex in ele.destPool){
              var destCall = ele.destPool[innerdestIndex]
              if(destCall.floor == ele.floor){
                ele.destPool.splice(innerdestIndex, 1)
              }
            }
            ele.currentdestArray.splice(destIndex,1)
            continue
          }
          else if(dest > ele.floor){
            if(!ele.door){
              new_timeline.add(ele.closeDoorAni)
            }
            document.getElementById(ele.upiconid).style.opacity = 1
            document.getElementById(ele.outupiconid).style.opacity = 1
            new_timeline.add(ele.upOneNumAni).add(ele.upOnePicAni, "-=" + space_duration).add(ele.upOneDoorAni,"-=" + space_duration)
            ele.floor += 1
            ele.door = true
            ele.direction = DIRECTION.UP
            break;
          }
        }
      }
    }
    else if(ele.direction == DIRECTION.DOWN){
      if(ele.currentdestArray[0] > ele.floor){
        if(!ele.door){
          new_timeline.add(ele.closeDoorAni)
        }
        // new_timeline.add(ele.deactivatedownicon).add(ele.deactivateupicon)
        document.getElementById(ele.upiconid).style.opacity = 0.3
        document.getElementById(ele.downiconid).style.opacity = 0.3
        document.getElementById(ele.outdowniconid).style.opacity = 0.3
        document.getElementById(ele.outupiconid).style.opacity = 0.3
        ele.direction = DIRECTION.WAIT
        ele.fetchtarget = null
      }
      else{
        for(var destIndex = ele.currentdestArray.length - 1; destIndex >=0; destIndex--){
          var dest = ele.currentdestArray[destIndex]
          var min = 21
          if(dest == ele.floor){
            new_timeline.add(ele.openDoorAni)
            ele.door = false
            for(var innerdestIndex in ele.destPool){
              var destCall = ele.destPool[innerdestIndex]
              if(destCall.floor == ele.floor){
                ele.destPool.splice(innerdestIndex, 1)
              }
            }
            ele.currentdestArray.splice(destIndex,1)
            continue
          }
          else if(dest < ele.floor){
            if(!ele.door){
              new_timeline.add(ele.closeDoorAni)
            }
            document.getElementById(ele.downiconid).style.opacity = 1
            document.getElementById(ele.outdowniconid).style.opacity = 1
            new_timeline.add(ele.downOneNumAni).add(ele.downOnePicAni, "-=" + space_duration).add(ele.downOneDoorAni,"-=" + space_duration)
            ele.floor -= 1
            ele.door = true
            ele.direction = DIRECTION.DOWN
            break;
          }
        }
      }
    }
  }
  else if(ele.status){
    console.log(ele.needReopen)
    if(ele.needReopen){
      new_timeline.add(ele.openDoorAni);
      ele.door = false;
    }
    else if(!ele.door){
      new_timeline.add(ele.closeDoorAni)
      ele.door = true
    }
    ele.direction = DIRECTION.WAIT
    // new_timeline.add(ele.deactivatedownicon).add(ele.deactivateupicon)
    document.getElementById(ele.upiconid).style.opacity = 0.3
    document.getElementById(ele.downiconid).style.opacity = 0.3
    document.getElementById(ele.outdowniconid).style.opacity = 0.3
    document.getElementById(ele.outupiconid).style.opacity = 0.3
    ele.fetchtarget = null
  }
  else{
    new_timeline.add(ele.alertingAni).add(ele.backalertingAni)
  }
  new_timeline.add(ele.completeAniOnce)
}

window.reloadpage = function(){
  window.location.reload()
}

