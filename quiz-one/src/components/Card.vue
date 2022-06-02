<template lang="pug">
div.card-mode
  ul#nav.grid.grid-cols-5.gap-4
    li(v-for="(value,key) in store.get_calculateConnectionsList" :key="key" @click="store.showLightBox(value.email)")
      img(:src="value.picture.large")
      h6 {{ String(value.name.first) +" "+ String(value.name.last) }}
      svg.is-collect-icon(@click.stop="store.collectUserAction(value)" v-if="(value.collect)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 107.41" style="enable-background:new 0 0 122.88 107.41" xml:space="preserve")
        g
          path(d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z")
      svg.no-collect-icon(@click.stop="store.collectUserAction(value)" v-if="(!value.collect)" viewBox="0 0 24 24" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(fill-rule="evenodd" clip-rule="evenodd" d="M7.95 5C5.757 5 4 6.753 4 8.889c0 1.04.414 1.985 1.093 2.686l6.907 7L18.78 11.7A3.845 3.845 0 0 0 20 8.89C20 6.753 18.243 5 16.05 5c-.476 0-1.034.267-1.654.816-.604.536-1.146 1.23-1.582 1.842a1 1 0 0 1-1.628 0c-.436-.612-.978-1.306-1.582-1.842C8.984 5.266 8.426 5 7.95 5zM2 8.889C2 5.625 4.676 3 7.95 3c1.198 0 2.218.644 2.98 1.319.392.348.752.735 1.07 1.116.319-.381.678-.768 1.07-1.116C13.832 3.644 14.852 3 16.05 3 19.324 3 22 5.625 22 8.889a5.845 5.845 0 0 1-1.805 4.224l-7.483 7.59a1 1 0 0 1-1.424 0L3.662 12.97A5.841 5.841 0 0 1 2 8.89z")
</template>
<script setup lang="ts">
// const route = useRoute();
const store = useStore();
</script>
