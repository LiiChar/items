<script setup lang="ts">
  import type { Item } from '../../../shared/types/items';
  import ListItem from './ListItem.vue';
  
  defineProps<{
    items: Item[];
  }>();
  
</script>

<template>
  <div class="flex flex-wrap flex-row gap-2 w-full">
    <div v-for="(item ,i) in items" :key="item.id" class="flex w-min items-center card p-0! grow">
      <div class="px-3 flex justify-center items-center">
        {{ i }}
      </div>
      <div class="border-l border-[#e2e8f0] p-1">
        <ListItem :item="item" />
      </div>
    </div>
  </div>
</template>