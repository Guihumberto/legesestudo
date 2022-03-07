<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      color="secondary"
      class=" white--text text-center"
      width="100%"
    >
      <v-card-text>
        <v-btn small text to="/">Home</v-btn>
        <v-btn small text to="/blog">Blog</v-btn>
        <v-btn small text to="/searchAll">Busca</v-btn>
        <v-btn small text to="/about">Sobre</v-btn>
        <v-btn small text to="/favorites" v-if="$auth.loggedIn">Favoritos</v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — ESTUDO DA LEI<br>
        <v-btn x-small icon to="/about">João Humberto Silva Ribeiro Júnior</v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>