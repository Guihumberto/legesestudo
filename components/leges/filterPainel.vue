<template>
    <v-btn-toggle>
        <v-btn x-small @click="order = !order" >
            <v-icon v-if="order" small>mdi-sort-numeric-ascending</v-icon>
            <v-icon v-else small>mdi-sort-numeric-descending</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>
export default {
    data(){
        return{
            order: true
        }
    }
}
</script>