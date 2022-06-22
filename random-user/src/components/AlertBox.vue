<template lang="pug">
div.alertbox-container(@click="store.hideAlertBox()" v-show="alertBoxShow")
  div.user-content.bg-white(@click.stop)
    svg.close-btn(@click="store.hideAlertBox()" fill="#000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24")
      path(d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
    h2.text-2xl.font-semibold.mb-6 提示訊息
    span.block.mb-6 {{alertBoxMsgShow}}
    button.text-sm.bg-slate-500.text-white.px-8.py-1(@click="store.hideAlertBox()") 確定
</template>
<script setup lang="ts">
const store = useStore();
const alertBoxShow = computed(() => store.get_alertBoxState);
const alertBoxMsgShow = computed(() => store.get_alertBoxMsg);
</script>
