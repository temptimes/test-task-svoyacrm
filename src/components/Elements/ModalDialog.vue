<template>
    <el-dialog v-model="dialogVisible" align-center modal-class="overide-animation" @close="$emit('close')">
        <slot></slot>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Скасувати</el-button>
                <el-button v-if="createButton" type="primary" @click="$emit('create')">
                    Створити
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
const dialogVisible = defineModel()

defineProps<{
    createButton?: boolean
}>()

defineEmits<{
    (e: 'create'): void
    (e: 'close'): void
}>()
</script>