<script setup lang="ts">
import type { Item } from '../../../shared/types/items';
defineProps<{
  item: Item;
}>();
</script>

<template>
  <div class="flex gap-4 items-center">
    <div class="flex-grow">
      <div class="text-lg font-bold">{{ item.name }}</div>
      <div class="text-sm text-gray-500">{{ item.createdAt }}</div>
    </div>
  </div>
</template>