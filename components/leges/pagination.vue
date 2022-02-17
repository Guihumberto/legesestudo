<template>
    <v-row justify="center">
        <v-col cols="12" align="center">
          <v-btn color="orange" icon dense @click="firstPage"><v-icon>mdi-rewind</v-icon></v-btn>
          <v-btn color="orange" icon dense @click="prev"><v-icon>mdi-arrow-left-drop-circle-outline</v-icon></v-btn>
          <v-btn color="orange" text>{{pagination.page}} - {{Math.ceil(pageTot/dispositiveScreen)}}</v-btn>
          <v-btn color="orange" icon dense @click="next"> <v-icon>mdi-arrow-right-drop-circle-outline</v-icon></v-btn>
          <v-btn color="orange" icon dense @click="lastPage"> <v-icon>mdi-fast-forward</v-icon></v-btn>
        </v-col>
      </v-row>
</template>

<script>
export default {
    data(){
      return{
      }
    },
    props:{
        pagination: {
            required: true
        },
        dispositiveScreen: {
            required: true
        },
        pageTot:{
            required: true
        },
    },
    computed:{
      countPage(){
        return this.total
      }
    },
    methods: {
      next(){
        this.pagination.page++
        let totalPage = Math.ceil(this.pageTot / this.dispositiveScreen)
        if(this.pagination.page > totalPage) {
          this.pagination.page = totalPage
        }     
        this.$emit('onTopPage', 1)
      },
      prev(){
        this.pagination.page--
        let totalPage = Math.ceil(this.pageTot / this.dispositiveScreen)
        if(this.pagination.page < 1){
          this.pagination.page++
        } else if (this.pagination.page > totalPage){
          this.pagination.page = totalPage
        }
        this.$emit('onTopPage', 1)

      },
      firstPage(){
        this.pagination.page = 1
        this.$emit('onTopPage', 1)
      },
      lastPage(){
        let totalPage = Math.ceil(this.pageTot / this.dispositiveScreen)
        this.pagination.page = totalPage
        this.$emit('onTopPage', 1)
      },
      goTo(page){
        let totalPage = Math.ceil(this.pageTot/ this.dispositiveScreen)
        if(page < 1 || page > totalPage){
        return this.pagination.page = 1
        }
        
        this.pagination.page = page

      }
  },
}
</script>