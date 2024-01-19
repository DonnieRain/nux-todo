<template>
    <div class="login-form">
        <h1 class="login-form__title">Login</h1>
        <form @submit.prevent="handlerForm">
            <input
                v-model="form.username"
                type="text"
                placeholder="Username"
            />
            <input
                v-model="form.phone"
                type="text"
                placeholder="Phone"
                @input="form.phone = form.phone.replace(/[^0-9x()-. ]/g, '')"
            />

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getUsers } from '@/services/api.js'
import useEventsBus from '@/helpers/eventBus.js'

const router = useRouter()
const { emitEvent } = useEventsBus()
const form = ref({
    username: null,
    phone: null
})
const handlerForm = async() => {
    const users = await getUsers()
    const user = users.find((item) => item.username === form.value.username && item.phone === form.value.phone)
    if (user) {
        localStorage.setItem('userid', user.id)
        router.push('/')
    } else {
        emitEvent('show-snackbar', { message: 'This user does not exist', type: 'error' })
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
}

.login-form h1 {
  margin-bottom: 20px;
  color: #333;
}

.login-form form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  text-align: left;
  margin-bottom: 8px;
  color: #555;
}

input {
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}
</style>