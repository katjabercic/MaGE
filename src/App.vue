<template>
    <p><b>{{ wdItem.title }}</b></p>
    <p>{{ wdItem.description }}</p>
  </template>

<script setup>
import { ref } from 'vue'
import { getItemInfo } from './mage';

// const itemIdToRetrieve = 'Q11518';
const wdItem = ref(null)

async function fetchWDItem() {
    wdItem.value = null

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemIdToRetrieve = urlParams.get('id')

    wdItem.value = await getItemInfo(itemIdToRetrieve);
}
fetchWDItem()

</script>
