<template>
    <section class="login">
        <LoginForm />
    </section>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>