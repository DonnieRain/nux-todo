<template>
    <div class="profile">
        <img
            :src="randomImage || 'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png'"
            alt="photo"
            class="profile-image"
        >
        <div class="profile-info">
            <p class="name">{{ user.name }}</p>
            <p class="username">{{ user.username }}</p>
            <div class="contacts">
                <p class="contacts-item">
                    <img
                        src="@/assets/img/email.svg"
                        alt="email"
                        class="contacts-icon"
                    >
                    <a :href="`mailto:${user.email}`">{{ user.email }}</a>
                    
                </p>
                <p class="contacts-item">
                    <img
                        src="@/assets/img/city.svg"
                        alt="city"
                        class="contacts-icon"
                    >
                    {{ user.address.city }}
                </p>
                <p class="contacts-item">
                    <img
                        src="@/assets/img/phone.svg"
                        alt="phone"
                        class="contacts-icon"
                    >
                    <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
                </p>
                <p class="contacts-item">
                    <img
                        src="@/assets/img/web.svg"
                        alt="web"
                        class="contacts-icon"
                    >
                    <a :href="`https://${user.website}`">{{ user.website }}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getPhoto } from '@/services/api';

const { user } = defineProps(['user'])

const randomImage = ref(null)

onMounted(async () => {
    console.log(user);
    randomImage.value = await getPhoto()
})
</script>

<style lang="scss" scoped>
.profile {
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
    &-image {
        display: block;
        width: 150px;
        height: 150px;
        margin: 10px auto 20px;
        border-radius: 50%;
        object-fit: cover;
    }

    &-info {
        font-size: 18px;
    }
    .name {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 10px 0;
    }
    .username {
        text-align: center;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ccc;
        &-item {
            display: flex;
            align-items: center;
        }
        &-icon {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
        a {
            color: #000;
        }
    }
}
</style>