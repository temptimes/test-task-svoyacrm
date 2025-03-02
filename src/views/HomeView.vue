<template>
    <Table v-loading="isLoading" :table-data="tableData" @user-posts="fetchUserPosts($event)"
      @create-user-posts="showUserPostDialog" />
    <Modal v-model="userPostsDialogVisible">
      <template #default>
        <UserPosts :user-posts="userPostsItems" :is-loading="isUserPostsLoading" />
      </template>
    </Modal>
    <Modal v-model="createUserPostDialogVisible" create-button @create="confirmCreateUserPost"
      @close="clearFieldsUserPost">
      <template #default>
        <CreateUserPost ref="createUserPostRef" :user-id="activeUserId"
          @isVisible="createUserPostDialogVisible = $event" />
      </template>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from "vue"
  import type { User, UserPost } from "~/types/index.ts"
  import Table from "~/components/Table.vue"
  import Modal from "~/components/Elements/ModalDialog.vue"
  import UserPosts from "~/components/UserPosts.vue"
  import CreateUserPost from "~/components/CreateUserPost.vue"
  import { getUsers, getUserPosts } from "~/api/userApi"
  
  const isLoading = ref(false)
  const isUserPostsLoading = ref(false)
  
  const tableData = ref<User[]>([])
  const userPostsItems = ref<UserPost[]>([])
  
  const userPostsDialogVisible = ref(false)
  const createUserPostDialogVisible = ref(false)
  
  const activeUserId = ref(0)
  
  const showUserPostDialog = (userId: number) => {
    activeUserId.value = userId
    createUserPostDialogVisible.value = true
  }
  
  const createUserPostRef = ref<InstanceType<typeof CreateUserPost> | null>(null)
  const confirmCreateUserPost = () => {
    if (createUserPostRef.value) {
       createUserPostRef.value.handleParentSubmitUserPost()
    }
  }
  
  const clearFieldsUserPost = () => {
    if (createUserPostRef.value) {
       createUserPostRef.value.handleClearFields()
    }
  }
  
  const fetchUserPosts = async (userId: number) => {
    userPostsItems.value = []
    userPostsDialogVisible.value = true
    isUserPostsLoading.value = true
    try {
      userPostsItems.value = await getUserPosts(userId)
    } catch (error) {
      console.error("Error fetching user posts:", error)
    } finally {
      isUserPostsLoading.value = false
    }
  }
  
  const fetchUsers = async () => {
    isLoading.value = true
    try {
      tableData.value = await getUsers()
      console.log(tableData.value)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(() => {
    fetchUsers()
  })
  </script>
  