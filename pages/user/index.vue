<template>
    <v-container>
        <v-card width="1080" class="mx-auto mb-3" flat>
            <v-card-title> <v-icon>mdi-tools</v-icon> Perfil e Favoritos</v-card-title>
        </v-card>
    </v-container>
</template>

<script>
export default {
    middleware:'auth'
}
</script>