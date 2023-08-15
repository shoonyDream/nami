<template lang="pug">
.content-block
  .row(:class="{ visible: isVisible }")
    .block.block-1 1
    .block.block-2 2
    .block.block-3 3
    .block.block-4 4
    button.btn(@click="onClick") 8
  .block.block-5 5
  .block.block-6
    ul.list(v-if="data.length")
      li.item(v-for="(item, index) in data", :key="item.id")
        h3 {{ item.title }}
        p {{ item.body }}
        .info
          span id: {{ item.id }}
          span userId: {{ item.userId }}
    template(v-else) 6
  .block.block-7 7
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { fetchDataApi } from "@/store/data";
  import { useStore } from "effector-vue/composition";

  export default defineComponent({
    name: "ContentBlock",
    components: {},
    setup() {
      const { fetchDataStore, getFetchDataFx } = fetchDataApi;
      const data = useStore(fetchDataStore);
      const isVisible = ref(false);

      onMounted(async () => {
        await getFetchDataFx();
      });

      const onClick = () => {
        isVisible.value = !isVisible.value;
      };

      return {
        data,
        isVisible,
        onClick,
      };
    },
  });
</script>

<style>
  @import url("../../src/assets/content-block.pcss");
</style>
