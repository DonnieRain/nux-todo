<template>
    <div class="modal-blur">
        <div class="modal">
            <div class="modal-header">
                <h2>{{ props.title }}</h2>
                <img
                    src="@/assets/img/close-icon.svg"
                    alt="close"
                    class="close-icon"
                    @click="emit('close')"
                >
            </div>
            <form @submit.prevent="handlerForm">
                <vSelect
                    :filter-data="props.users"
                    :withoutRoute="true"
                    name="status"
                    @changeData="selectUser"
                />
                <input
                    v-model="form.title"
                    type="text"
                    placeholder="Title"
                    class="modal-input"
                />

                <button
                    type="submit"
                    class="modal-btn"
                >
                    Add to list
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import vSelect from "@/components/common/vSelect.vue"

const emit = defineEmits(['close', 'addTodo'])
const props = defineProps({
    users: Array,
    title: String,
})
const form = ref({
    userId: null,
    title: null,
})

const selectUser = (val) => {
    form.value.userId = val
}

const handlerForm = () => {
    emit('addTodo', form.value)
    emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;

    &-blur {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        z-index: 10;
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    &-input {
        margin: 15px 0;
    }

    &-btn {
        display: block;
        margin: 0 auto;
        font-size: 18px;
    }
    
    .close-icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}
</style>