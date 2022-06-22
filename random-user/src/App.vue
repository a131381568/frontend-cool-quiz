<template lang="pug">
router-view
AlertBox
LoadingSpinners
</template>
<script setup lang="ts">
const route = useRoute();
useHead({
  bodyAttrs: {
    title: route.meta.title,
  },
  meta: [
    {
      property: "og:title",
      content: route.meta.title,
    },
    {
      name: "twitter:title",
      content: route.meta.title,
    },
  ],
});
</script>
