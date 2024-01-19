<template>
    <div class="card">
        <div class="card-header">
            <h2 class="card-title">{{ todo.title }}</h2>
            <img
                :src="favorite ? StarIcon : StarOutlineIcon"
                alt="favorite-icon"
                class="card-icon"
                @click="setFavorite"
            >
        </div>
        <div class="card-footer">
            <p>User: {{ todo.userId }}</p>
            <div>
                <img
                    v-if="todo.completed"
                    :src="CheckIcon"
                    alt="completed-icon"
                    class="card-icon"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { favoritesTodos } from '@/services/storage.js'
import CheckIcon from '@/assets/img/check.svg'
import StarIcon from '@/assets/img/star.svg'
import StarOutlineIcon from '@/assets/img/star-outline.svg'

const { data } = defineProps(['data'])
const todo = ref(data)

const favorite = ref(false)

const setFavorite = () => {
    const selectedFavorites = favoritesTodos()

    let favorites = []
    if (selectedFavorites && selectedFavorites.includes(todo.value.id)) {
        favorites = selectedFavorites.filter(fav => fav !== todo.value.id)
        favorite.value = false
    } else {
        favorites = selectedFavorites ? [...selectedFavorites, todo.value.id] : [todo.value.id]
        favorite.value = true
    }
    
    localStorage.setItem('todos', JSON.stringify(favorites))
}

onMounted(() => {
    const selectedFavorites = favoritesTodos()
    if (selectedFavorites && selectedFavorites.includes(todo.value.id)) {
        favorite.value = true
    }
})
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    
    &-title {
        font-size: 24px;
    }

    &-header, &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    &-header {
        align-items: flex-start;
        margin-bottom: 20px;
    }

    &-icon {
        width: 30px;
        height: 30px;
    }
}
</style>