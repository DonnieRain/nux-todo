<template>
    <header>
        <img src="https://nuxgame.com/img/logo_Nuxgame_2023.webp" alt="logo">
        <button @click="logout">
            Log out
        </button>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
    localStorage.removeItem('userid')
    router.push('/login')
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
}

button {
    padding: 20px 30px;
    border-radius: 4px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>