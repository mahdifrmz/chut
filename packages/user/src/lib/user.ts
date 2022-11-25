import * as storage from '@chut/storage'

interface User {
  username: string,
  password: string
}

export async function userCreate(user: User) {
  const user_string = JSON.stringify(user)
  await storage.set(user.username, user_string)
}

export async function userGet(username: string): Promise<User | null> {
  const user_string = await storage.get(username)
  if (!user_string)
    return null;
  return JSON.parse(user_string);
}