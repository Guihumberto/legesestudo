<template>
  <div class="text-center">
    <v-menu transition="scale-transition" :close-on-content-click="false">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="error"
              dark
              icon
              small
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <span>Opçoes de estudo</span>
        </v-tooltip>
      </template>
     <v-list>
       <v-list-item>
         <leges-upLevel-estatistics />
       </v-list-item>
     </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      filterMenu:{
        required: true
      }
    },
    methods:{
      sendOptions(){
        this.$emit("filterSelect", this.filterMenu.onlyTextFav)
      }
    }
  }
</script>
