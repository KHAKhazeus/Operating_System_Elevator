<template>
    <b-col cols='5'>
        <b-col cols='2' class="no-gutter" style="font-size: 60%">{{now}}</b-col>
        <b-row>
            <b-col cols='5'><b-button variant="outline-primary" class="no-gutter" style="font-size: 60%; padding: 0.5em" :id="'eleup' + now" >⬆️</b-button></b-col>
            <b-col cols='5'><b-button variant="outline-primary" class="no-gutter" style="font-size: 60%; padding: 0.5em" :id="'eledown' + now">⬇️</b-button></b-col>
        </b-row>
    </b-col>
</template>

<script>

export default {
    props: {
    now: {
      type: Number,
      default: null,
    }
  },
}
</script>