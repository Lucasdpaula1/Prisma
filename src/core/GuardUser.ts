interface User {
  name: string;
  email: string;
  id?: number;
  password: string;
}
export const CreateUserType = (value: unknown): value is User => {
  if (
    value &&
    typeof value === "object" &&
    "name" in value &&
    "email" in value &&
    "password" in value &&
    typeof value.password === "string"
  ) {
    return true;
  } else {
    return false;
  }
};
