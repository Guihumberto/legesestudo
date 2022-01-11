<template>
  <v-container>
    <v-card width="1080" class="mx-auto">
      <v-card-title>Leis para concurso</v-card-title>
      <v-card-subtitle>Faça questões estudando a lei seca.</v-card-subtitle>
      <v-card class="mx-2" flat>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" v-for="law in laws" :key="law.title">
              <v-card to="/leges">
                <v-card-title>{{law.title}}</v-card-title>
                <v-card-subtitle>{{law.subtitle}}</v-card-subtitle>
                <v-card-text class="text-justify">{{law.description | truncate(120)}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      laws:[
        {
          title: "Lei 5.172/1966",
          subtitle: "Código Tributário Nacional - CTN",
          description: "Dispõe sobre o Sistema Tributário Nacional e institui normas gerais de direito tributário aplicáveis à União, Estados e Municípios."
        },
        {
          title: "Lei 8112/90",
          subtitle: "Estatuto dos Servidores Público",
          description: "Dispõe sobre o regime jurídico dos servidores públicos civis da União, das autarquias e das fundações públicas federais."
        },
        {
          title: "CF 1988",
          subtitle: "Constituição Federal de 1988",
          description: "Nós, representantes do povo brasileiro, reunidos em Assembléia Nacional Constituinte para instituir um Estado Democrático, destinado a assegurar o exercício dos direitos sociais e individuais, a liberdade, a segurança, o bem-estar, o desenvolvimento, a igualdade e a justiça como valores supremos de uma sociedade fraterna, pluralista e sem preconceitos, fundada na harmonia social e comprometida, na ordem interna e internacional, com a solução pacífica das controvérsias, promulgamos, sob a proteção de Deus, a seguinte CONSTITUIÇÃO DA REPÚBLICA FEDERATIVA DO BRASIL."
        },
      ]
    }
  }
}
</script>
