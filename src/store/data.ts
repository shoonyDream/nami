import { createEffect, createStore, createEvent } from 'effector';
import type { UserData } from '@/types/data';

const fetchDataStore = createStore<UserData[]>([]);

const getFetchDataFx = createEffect(async () => {
  const data: UserData[] = [];

  if (!localStorage.getItem('NAMI_TEST_DATA')) {
    localStorage.setItem('NAMI_TEST_DATA', JSON.stringify(data));
  }

  let response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (response.ok) {
    let json = await response.json();

    data.length = 0;
    data.push(...json);

    localStorage.setItem('NAMI_TEST_DATA', JSON.stringify(data));
  } else {
    alert("Ошибка HTTP: " + response.status);
  }

  return data || [];
});

fetchDataStore.on(getFetchDataFx.doneData, (_, payload) => {
  return payload;
});

export const fetchDataApi = {
  fetchDataStore,
  getFetchDataFx,
};
