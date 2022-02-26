<template>
    <v-row>
        <v-switch
        class="mr-2" dense
        label="apenas favoritos"
        v-model="filter.isFilter"
        @click="$emit('filtersFav', filter.isFilter)"
        ></v-switch>
        <v-switch
        class="mr-2" dense
        label="com questões"
        v-model="filter.withQuestions"
        @click="$emit('filtersQc', filter.withQuestions)"
        ></v-switch>
    </v-row>
  
</template>

<script>
export default {
    props:{
        filter:{
            required: true
        }
    }
}
</script>