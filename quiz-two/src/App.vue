<template lang="pug">
router-view
</template>
<script setup lang="ts">
const route = useRoute();
// test ---------

const xxxx = {
  nid: "",
  id: "root",
  parentId: "",
  text: "",
  children: [
    {
      nid: "",
      id: "aaa",
      parentId: "",
      text: "I am aaa",
      children: [
        {
          nid: "",
          id: "bbb",
          parentId: "aaa",
          text: "I am bbb",
          children: [],
        },
        {
          nid: "",
          id: "ccc",
          parentId: "aaa",
          text: "I am ccc",
          children: [
            {
              nid: "",
              id: "ddd",
              parentId: "ccc",
              text: "I am ddd",
              children: [],
            },
            {
              nid: "",
              id: "eee",
              parentId: "ccc",
              text: "I am eee",
              children: [
                {
                  nid: "",
                  id: "hhh",
                  parentId: "eee",
                  text: "I am hhh",
                  children: [
                    {
                      nid: "",
                      id: "iii",
                      parentId: "hhh",
                      text: "I am iii",
                      children: [
                        {
                          nid: "",
                          id: "jjj",
                          parentId: "iii",
                          text: "I am jjj",
                          children: [
                            {
                              nid: "",
                              id: "kkk",
                              parentId: "jjj",
                              text: "I am kkk",
                              children: [
                                {
                                  nid: "",
                                  id: "lll",
                                  parentId: "kkk",
                                  text: "I am lll",
                                  children: [
                                    {
                                      nid: "",
                                      id: "mmm",
                                      parentId: "lll",
                                      text: "I am mmm",
                                      children: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nid: "",
      id: "fff",
      parentId: "",
      text: "I am fff",
      children: [
        {
          nid: "",
          id: "ggg",
          parentId: "fff",
          text: "I am ggg",
          children: [],
        },
      ],
    },
  ],
};

const getId = (xxxx) => {
  if (xxxx.children) {
    xxxx.children.forEach((el, index) => {
      console.log(el.id);
      if (xxxx.children[index]) {
        getId(xxxx.children[index]);
      }
    });
  }
};
// getId(xxxx);
</script>
<style>
.carousel {
  background: #eee;
  padding: 1rem;
  margin-bottom: 1rem;
}
.carouselitem {
  background: rgb(67, 98, 104);
  padding: 0.5rem 1rem;
}
.text {
  background: rgb(255, 174, 99);
  padding: 0.2rem 0.5rem;
}
</style>
