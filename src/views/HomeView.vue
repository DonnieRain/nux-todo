<template>
    <main>
        <section>
            <HeaderSection />
            <UserCard v-if="user" :user="user"/>
            <TodoList />
        </section>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUsers } from '@/services/api.js';
import { authID } from '@/services/storage.js'
import HeaderSection from '@/components/header/HeaderSection.vue'
import TodoList from '@/components/todo/TodoList.vue'
import UserCard from '@/components/user/UserCard.vue';

const user = ref(null)

onMounted(async () => {
    const data = await getUsers()
    user.value = data.find((item) => item.id === +authID())
})
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.tab {
    width: 200px;
    padding: 10px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    &.active {
        font-weight: bold;
        // background-color: bisque;
        border-bottom: 2px solid #ccc;
    }
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-up-enter,
.fade-up-leave-to {
  height: 0;
  transform: translateY(30px);
  opacity: 0;
}

</style>@/services/storage