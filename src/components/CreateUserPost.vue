<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item label="Заголовок" prop="title">
            <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="Текст" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserPostForm } from '~/types/index.ts'
import { useCreateUserPost } from '~/api/userApi'
import messageBanner from '~/composable/messageBanner'

const emit = defineEmits<{
    (e: 'isVisible', isVisible: boolean): void
}>()

const props = defineProps<{
    userId: number
}>()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<UserPostForm>({
    title: '',
    desc: '',
    userId: 0
})

const rules = reactive<FormRules<UserPostForm>>({
    title: [
        { required: true, message: 'Будь ласка, введіть заголовок', trigger: 'blur' },
        { min: 4, max: 15, message: 'Довжина повинна бути 4 to 15', trigger: 'blur' },
    ],
    desc: [{ required: true, message: 'Будь ласка, введіть текст', trigger: 'blur' }],
})

const submitForm = async () => {
    if (!ruleFormRef.value) return

    await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            createUserPost(ruleForm as UserPostForm)
        } else {
            console.error('Validation failed:', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

defineExpose({
    handleParentSubmitUserPost: () => {
        submitForm()
    },

    handleClearFields: () => {
        resetForm(ruleFormRef.value)
    }
})

const createUserPost = async (form: UserPostForm) => {
    try {
        form.userId = props.userId
        await useCreateUserPost(form)
        messageBanner('Пост успішно створений', 'success')
        resetForm(ruleFormRef.value)
        emit('isVisible', false)
    } catch (error) {
        messageBanner('Помилка створення посту', 'error')
    }
}
</script>