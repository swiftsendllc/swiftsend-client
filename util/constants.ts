export const Env = {
NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || ""
}
type EnvKeys = keyof typeof Env
export const ENV = (key: EnvKeys) => Env[key]
