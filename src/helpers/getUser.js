import { getWithExpiry } from "./localStorage";

export function getUser() {
  const user = getWithExpiry("user");
  //   console.log(user);
  return user;
}
