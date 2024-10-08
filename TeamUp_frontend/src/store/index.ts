import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import SecureLS from "secure-ls";

const store = createPinia()
store.use(piniaPluginPersistedstate)

const ls = new SecureLS({
    isCompression: false,
    encryptionSecret: import.meta.env.VITE_STORE_SECRET
})

export const SelfStorage = {
    setItem(key: string, value: any) {
        ls.set(key, value);
    },
    getItem(key: string) {
        return ls.get(key);
    }
}

export default store