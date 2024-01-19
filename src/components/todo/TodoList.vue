<template>
    <div>
        <AddTodo
            v-if="showModal"
            :users="uniqueIds"
            title="Add new task"
            @addTodo="addTodo"
            @close="showModal = false"
        />
        <div class="todo-filters">
            <vSelect
                :filter-data="statuses"
                defaultOption="All"
                name="status"
                @changeData="filterData"
            />
            <vSelect
                :filter-data="uniqueIds"
                defaultOption="All users"
                name="user"
                @changeData="filterData"
            />
            <div class="todo-filters__search">
                <vSearch @search="filterData" />
            </div>
        </div>
        <div>
            <button
                @click="showModal = !showModal"
                class="todo-list__add"
            >
                + Add
            </button>
        </div>
        <div
            v-if="list?.length"
            class="todo-wrapper"
        >
            <TodoCard
                v-for="item in list"
                :key="item.id"
                :data="item"
            />
        </div>
        <div v-else>
            <img
                src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
                alt="not found"
                class="empty-list"
            />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getTodoList } from '@/services/api.js'
import { favoritesTodos } from '@/services/storage.js'
import TodoCard from '@/components/todo/TodoCard.vue'
import vSelect from "@/components/common/vSelect.vue"
import vSearch from "@/components/common/vSearch.vue"
import AddTodo from '@/components/modals/AddTodo.vue'

const route = useRoute()
const list = ref(null)
const showModal = ref(false)
const backupList = ref(null)
const filterList = ref(null)
const uniqueIds = ref(null)
const statuses = ['Completed', 'Uncompleted', 'Favorites']

const completedList = () => {
    return backupList.value.filter(item => item.completed)
}

const uncompletedList = () => {
    return backupList.value.filter(item => !item.completed)
}

const favoritesList = () => {
    const favorites = favoritesTodos() ? favoritesTodos() : []
    if (favorites) {
        return backupList.value.filter(item => favorites.includes(item.id))
    }
    return backupList.value
}

const changeStatus = (status) => {
    switch (status) {
        case 'All':
            return backupList.value
        case 'Completed':
            return completedList()
        case 'Uncompleted':
            return uncompletedList()
        case 'Favorites':
            return favoritesList()
        default:
            return backupList.value
    }
}

const changeUser = (user, array) => {
    if (user === 'All users') return array
    return array.filter(item => item.userId === +user )
}

const filterData = () => {
    const { status, user, search } = route.query
    filterList.value = backupList.value

    if (status) {
        filterList.value = changeStatus(status)
    }
    if (user) {
        filterList.value = changeUser(user, filterList.value)
    }
    if (search) {
        filterList.value = searchTodo(search, filterList.value)
    }
    list.value = filterList.value
}

const searchTodo = (text, array) => {
    if (text === '') return array
    return array.filter(item => item.title.includes(text))
}

const addTodo = (todo) => {
    const newTodo = {
        ...todo,
        id: backupList.value.length + 1,
        completed: false,
    }
    backupList.value.push(newTodo)
}

onMounted(async() => {
    try {
        backupList.value = await getTodoList()
        uniqueIds.value = [...new Set(backupList.value.map(obj => obj.userId))];
        filterData()
    } catch (e) {
        console.log(e);
    }
})
</script>

<style lang="scss" scoped>
.todo-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}
.todo-filters {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    width: 100%;
    margin: 20px 0;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
    
    &__search {
        width: 100%;
    }
}
.todo-list__add {
    margin: 10px 0 20px;
    font-size: 18px;
}
.empty-list {
    display: block;
    max-width: 100%;
    margin: 0 auto;
}
</style>