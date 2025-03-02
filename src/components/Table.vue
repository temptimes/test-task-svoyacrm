<template>
  <div>
    <span style="margin-right: 20px">Фільтр за іменами</span>
    <el-select v-model="selectedNames" multiple clearable collapse-tags :max-collapse-tags="2"
      placeholder="Виберіть імена" style="width: 350px">
      <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-table :data="filteredTableData" style="width: 100%" size="small">
      <el-table-column prop="id" label="ID" min-width="100" />
      <el-table-column prop="name" label="Ім'я" min-width="120" />
      <el-table-column prop="email" label="Email" min-width="150" />
      <el-table-column prop="address.city" label="Місто" min-width="120" />
      <el-table-column fixed="right" label="Дії" min-width="180">
        <template #default="user">
          <el-button @click="$emit('userPosts', user.row.id)" link type="primary" size="small">
            Переглянути пости
          </el-button>
          <el-button @click="$emit('createUserPosts', user.row.id)" link type="primary" size="small">
            Створити пост
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/index.ts'
import { computed, ref } from 'vue'

const props = defineProps<{
  tableData: User[]
}>()

defineEmits<{
  (e: 'userPosts', id: number): void
  (e: 'createUserPosts', id: number): void
}>()

const selectedNames = ref<string[]>([])

const selectData = computed(() => {
  return props.tableData.map((user) => ({
    value: user.name,
    label: user.name,
  }))
})

const filteredTableData = computed(() => {
  if (selectedNames.value.length === 0) {
    return props.tableData
  }

  return props.tableData.filter((user) =>
    selectedNames.value.includes(user.name)
  )
})
</script>