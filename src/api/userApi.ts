import { apiRequest } from "./http"
import type { UserPostForm, UserPost, User } from "~/types/index.ts"

export const getUsers = async (): Promise<User[]> => {
  return apiRequest("/users")
}

export const getUserPosts = async (userId: number): Promise<UserPost[]> => {
  return apiRequest(`/users/${userId}/posts`)
}

export const useCreateUserPost = async (
  body: UserPostForm
): Promise<UserPostForm> => {
  return apiRequest("/posts", {
    method: "POST",
    body
  })
}
