import { ElMessage } from "element-plus"

export default (message: string, type: string) => {
  return ElMessage({
    message,
    type,
  } as any)
}