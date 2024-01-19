<template>
    <div class="filter-wrapper">
        <div class="filter-input__wrapper">
            <label :for="props.name">{{ props.name }}</label>
            <input
                v-model="inputValue"
                readonly
                type="text"
                :id="props.name"
                class="filter-input"
                @click="showFilter = !showFilter"
            >
        </div>
        <Transition name="slide-fade">
            <ul
                v-if="showFilter"
                class="filter"
            >
                    <li
                        v-if="props.defaultOption"
                        class="filter-item"
                        @click="selectItem(props.defaultOption)"
                    >
                        {{ props.defaultOption }}
                    </li>
                <template
                    v-for="item in props.filterData"
                    :key="item"
                >
                    <li
                        class="filter-item"
                        @click="selectItem(item)"
                    >
                        {{ item }}
                    </li>
                </template>
            </ul>
        </Transition>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits(['changeData'])
const props = defineProps({
    filterData: {
        type: Array,
        require: true
    },
    defaultOption: {
        type: String,
    },
    name: {
        type: String,
        require: true,
    },
    withoutRoute: {
        type: Boolean,
        default: () => false
    }
})
const route = useRoute()
const router = useRouter()
const inputValue = ref(props.defaultOption)
const showFilter = ref(false)

const selectItem = async (val) => {
    inputValue.value = val
    showFilter.value = false
    if (!props.withoutRoute) {
        await router.replace({
            path: route.fullPath,
            query: { ...route.query, [props.name] : val}
        })
        emit('changeData')
    } else {
        emit('changeData', val)
    }
}
</script>

<style lang="scss" scoped>
.filter {
    position: absolute;
    top: 55px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &-wrapper {
        position: relative;
        width: 100%;
    }

    &-input {
        width: 100%;
        outline: none;
        cursor: pointer;
        font-weight: bold;

        &__wrapper {
            width: 100%;
        }
    }

    &-item {
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
            background-color: #e7e7e7;
        }
    }
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  height: auto;
  opacity: 0;
}
</style>