<template>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          dense
          small
          text   
        >
          Estrutura
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          ESTRUTURA
        </v-card-title>

        <v-card-text class="card-structura white--text">
          <p v-if="$fetchState.pending">Carregando...</p>
          <p v-else-if="$fetchState.error">Error 400</p>
            <v-list flat v-else class="list-group">
                <v-list-item-group
                  class="list-structura"
                  v-for="(law, i) in laws"
                  :key="i">
                    <v-list-item  @click="goTo(law.art)" class="item-structura">
                        <v-list-item-content >
                            <v-list-item-title v-text="law.text" class="white--text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        selectedItem: 1,
        laws: []
      }
    },
    props:{
      law:{
        required: true
      }
    },
    methods:{
        goTo(index){
            this.$emit('seletcArt', index)
            this.dialog = false
        }
    },
    async fetch(){
      const client = this.$apollo.getClient()
      const id = this.law
      const query = {
        query: require("../../graphql/lawTextSingle.gql"),
        variables:{id}
      }

      await client.query(query).then(data => {
        console.log(data)
        this.laws = data.data.lawtexts
      })
    }
  }
</script>

<style scoped>
.card-structura{
  background:#796d6d;
}
.list-group{
	padding:0.1rem 3rem 1.2rem;
	background:#796d6d;
  color:#FFF;
}
.list-structura{
  margin-top:2.6rem;
	list-style:none;
}
.item-structura{
  padding:0.1rem 3rem;
  margin: 0 -3rem -35px;
  justify-content:space-between;
  align-items:center;
  background:rgba(255,255,255,0.1);
  font-weight:normal;
  font-size:2.6rem;
  letter-spacing:0.03em;
}
</style>