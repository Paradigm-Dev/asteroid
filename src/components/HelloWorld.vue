<template>
  <div class="desktop-wrapper">
    <div class="app-display" v-ripple>
      <img src="./../assets/logo.png">
      <span>Write</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
};
</script>

<style scoped>
.desktop-wrapper {
  background: url('./../assets/default_backdrop.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center; 
  height: 100%;
  width: 100%;
  padding: 24px;
}

.app-display {
  width: 99px;
  border-radius: 12px;
  text-align: center;
  vertical-align: middle;
  padding: 12px;
}

.app-display img {
  height: 75px;
  width: 75px;
}

.app-display span {
  margin: auto;
}
</style>