<template lang="pug">
div.lighbox-container(@click="store.hideLightBox()" v-show="store.get_lightBoxState")
  //- img(src="/img/close-circle.svg")
  div.user-content.bg-white(@click.stop)
    svg.close-btn(@click="store.hideLightBox()" fill="#000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24")
      path(d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
    h4.user-name {{store.get_actionUserInfo.name.first + store.get_actionUserInfo.name.last}}
    h4.user-mail {{store.get_actionUserInfo.email}}
</template>
<script setup lang="ts">
const store = useStore();

// const route = useRoute();

// const VERSION = import.meta.env.VITE_APP_VERSION;
// const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
//   ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
//   : undefined;
// const thisYear = new Date().getFullYear();
</script>
