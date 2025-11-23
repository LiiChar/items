<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { getItems } from '../shared/api/items';
import type { Item } from '../shared/types/items';
import List from '../components/ui/list/List.vue';
import { wait } from '../shared/helper/time';

const requestsCount = ref(0);
const items = ref<Item[]>([]);
const successfulRequests = ref(0);
const faildedRequests = ref(0);
const count = ref(0);
const concurrency = ref(10);
const reqTime = ref(0);concurrency

const offset = ref(0);
const LIMIT = 10;
const delay = ref(300);

const userScroll = ref(false);

onMounted(() => {
   const container = document.querySelector('.item-list-wrapper');
   if (container) {
    container.addEventListener('wheel', () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        userScroll.value = !(scrollTop + clientHeight > scrollHeight - scrollHeight * 0.10);
      });
  }
});

const performSingleRequest = async () => {
  offset.value += LIMIT;
  
  const start = Date.now();
  let itemsBatch: Item[] = [];
  
  try {
    itemsBatch = await getItems({ offset: offset.value, limit: LIMIT });
    successfulRequests.value += 1;
  } catch (e) {
    faildedRequests.value += 1;
  }

  const end = Date.now();
  reqTime.value = end - start;
  
  if (itemsBatch.length) {
    items.value.push(...itemsBatch);
  }
  
  requestsCount.value += 1;

  nextTick(() => {
    const container = document.querySelector('.item-list-wrapper');
    if (container && !userScroll.value) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

const floodAttack = async () => {
  requestsCount.value = 0;
  
  const worker = async () => {
    while (true) {
      if (count.value <= 0) break;
      count.value -= 1;

      performSingleRequest(); 

      if (delay.value > 0) {
        await wait(delay.value);
      } else {
        await nextTick(); 
      }
    }
  };

  const workers = Array.from({ length: concurrency.value }, () => worker());
  
  await Promise.all(workers);
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center flex-col gap-2 ">
    <div class=" flex justify-center items-center flex-col min-w-[60%] gap-2">
      <div class="w-full flex flex-row">
        <input placeholder="Введите количество запросов" v-model.number="count" class="w-full rounded-br-none! rounded-tr-none!" type="number"/>
        <button class="rounded-bl-none! rounded-tl-none!" @click="floodAttack">Отправить</button>
      </div>
      <input placeholder="Введите задержку (мс)" class="w-full" v-model.number="delay" type="number"/>
      <input placeholder="Введите количества параллельных запросов" class="w-full" v-model.number="concurrency" type="number"/>
      <div class="w-full">
        <div>Завершено запросов: {{ requestsCount }}</div>
        <div>Успешных: {{ successfulRequests }}</div>
        <div>Неудачных: {{ faildedRequests }}</div>
        <div>Время последнего: {{ reqTime }} мс</div>
      </div>
    </div>
    <div class="item-list-wrapper h-[50%] overflow-auto min-w-[60%] max-w-[60%] w-[60%]">
      <List :items="items"/>
    </div>
  </div>
</template>