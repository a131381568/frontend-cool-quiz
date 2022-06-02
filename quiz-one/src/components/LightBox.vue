<template lang="pug">
div.lighbox-container(@click="store.hideLightBox()" v-show="lightBoxShow")
  div.user-content.bg-white(@click.stop)
    svg.close-btn(@click="store.hideLightBox()" fill="#000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24")
      path(d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
    img.logo(:src="userPicture")
    ul
      li.user-info-item.user-name
          img(src="/img/human.svg")
          span {{userFullName}}
      li.user-info-item.user-phone
          img(src="/img/phone.svg")
          span {{userPhone}}
      li.user-info-item.user-mail
          img(src="/img/email.svg")
          span {{userMail}}
      li.user-info-item.user-location
          img(src="/img/home.svg")
          span {{userLocation}}
</template>
<script setup lang="ts">
const store = useStore();
const lightBoxShow = computed(() => store.get_lightBoxState);
const userFullName = computed(
  () => store.get_actionUserInfo.name.first + store.get_actionUserInfo.name.last
);
const userPicture = computed(() => store.get_actionUserInfo.picture.large);
const userPhone = computed(() => store.get_actionUserInfo.cell);
const userMail = computed(() => store.get_actionUserInfo.email);
const userLocation = computed(() => store.get_actionUserInfo.location.city);
</script>
