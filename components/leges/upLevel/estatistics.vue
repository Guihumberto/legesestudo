<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          v-bind="attrs"
          v-on="on"
          text
          small
        >
        <v-icon left>
            mdi-calculator-variant-outline
        </v-icon>
          Estatísticas
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Artigos mais cobrados
        </v-card-title>

        <v-card-text class="my-5">
            
            <div v-for="data in lawQuestions" :key="data.id">
                <div>{{data.art}} - {{data.questions.length}}</div>
            </div>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
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
        lawQuestions: []
      }
    },
    async fetch(){
      const client = this.$apollo.getClient()
      const id = 4
      const query = {
        query: require("../../../graphql/uplevel/statistics.gql"),
        variables:{id}
      }

      await client.query(query).then(data => {
        console.log(data)
        this.lawQuestions = data.data.lawtexts
      })
    }
  }
</script>