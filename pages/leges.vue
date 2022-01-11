<template>
  <v-container>
    <v-card width="1080" class="mx-auto" flat>
      <layout-breadcrumbs />
      <leges-config @fontSize="fontSizeProp = $event"/>
      <v-card-title>Lei 5.172/1966 </v-card-title>
      <v-card-subtitle class="text-justify">Código Tributário Nacional <br> Dispõe sobre o Sistema Tributário Nacional e institui normas gerais de direito tributário aplicáveis à União, Estados e Municípios.</v-card-subtitle>
      <v-card-text>
        <p class="text-justify">
         O PRESIDENTE DA REPÚBLICA Faço saber que o Congresso Nacional decreta e eu sanciono a seguinte lei:
        </p>
    
        <div class="mb-2"> <strong>DISPOSIÇÃO PRELIMINAR</strong></div>
        <div>
          <p class="text-justify textLaw" :style="{ fontSize: fontSizeProp + 'px'}">
          <v-badge color="success" bordered left content="1" overlap><v-btn x-small @click="show = !show"><strong>  
          Art. 1º</strong></v-btn></v-badge> Esta Lei regula, com fundamento na Emenda Constitucional n. 18, de 1º de dezembro de 1965, o sistema tributário nacional e estabelece, com fundamento no artigo 5º, inciso XV, alínea b, da Constituição Federal as normas gerais de direito tributário aplicáveis à União, aos Estados, ao Distrito Federal e aos Municípios, sem prejuízo da respectiva legislação complementar, supletiva ou regulamentar.
          </p>
         </div>
         <transition name="question">
          <v-card v-show="show">
            <v-card-title class="text-h5 grey lighten-2">Questões</v-card-title>
              <v-card-text>
                <v-card-subtitle>Analista Tributário - Receita Federal - ESAF - 2012</v-card-subtitle>
                <p :style="{ fontSize: fontSizeProp + 'px'}" class="text-justify">1) Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste nesciunt, corrupti ad pariatur eos excepturi neque libero dolorum dignissimos officia corporis doloribus ullam atque enim exercitationem nemo autem aperiam expedita.</p>
              </v-card-text>
              <v-card-actions v-if="resolution">
                    <v-btn small color="success" @click="resolution = !resolution">Certo</v-btn>
                    <v-btn small outlined color="success" @click="resolution = !resolution">Errado</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon color="error" @click="show = !show"> <v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
              <v-card-actions v-else>
                    <v-btn @click="resolution = !resolution" small text color="error"> <v-icon>mdi-star</v-icon> Você errou/acertou</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon color="error" @click="show = !show"> <v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
            </v-card>
         </transition>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      show: false,
      resolution: true,
      fontSizeProp: 12
    }
  }
}
</script>

<style scoped>
.textLaw{
  font-family: 'Century Gothic', Courier, monospace;
  line-height: 2
}

.question-enter, .question-leave-to{
  opacity: 0
}

.question-enter-active{
  transition: opacity .3s ease;
}

.question-leave-active{
  transition: opacity .3s ease-out;
}

</style>
