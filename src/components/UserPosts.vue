<template>
    <el-table :data="userPosts" v-loading="isLoading">
        <el-table-column prop="title" label="Заголовок" width="200" />
        <el-table-column prop="body" label="Текст" />
    </el-table>
</template>

<script lang="ts" setup>
import type { UserPost } from '~/types/index.ts'

defineProps<{
    userPosts: UserPost[]
    isLoading: boolean
}>()
</script>