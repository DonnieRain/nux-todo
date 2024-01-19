<template>
    <label for="search">Search</label>
    <input
        v-model="searchText"
        type="text"
        id="search"
        placeholder="Search"
        class="search"
        @input="handlerSearch"
    >
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits(['search'])

const route = useRoute()
const router = useRouter()
const searchText = ref(route.query?.search || '')

const handlerSearch = async () => {
    await router.replace({
        path: route.fullPath,
        query: { ...route.query, search : searchText.value}
    })
    emit('search')
}
</script>

<style lang="scss" scoped>
.search {
    width: 100%;
}
</style>