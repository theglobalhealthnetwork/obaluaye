<template>
    <main class="flex min-h-full mx-auto">
        <div class="flex flex-1 flex-col justify-center py-12 px-10 md:px-30">
            <div class="mx-auto w-full">
                <div>
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        <span v-if="!oauth">{{ t("loginpage.login.titleEmail") }}</span>
                        <span v-else>{{ t("loginpage.login.titlePassword") }}</span>
                    </h2>
                    <p v-if="!oauth" class="text-sm font-medium text-kashmir-500 hover:text-kashmir-600 mt-6">
                        {{ t("loginpage.login.descriptionEmail") }}
                    </p>
                    <p v-else class="text-sm font-medium text-kashmir-500 hover:text-kashmir-600 mt-6">
                        {{ t("loginpage.login.descriptionPassword") }}
                    </p>
                </div>
                <div class="mt-6">
                    <Form @submit="submit" :validation-schema="schema" class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">{{ t("loginpage.login.emailLabel") }}</label>
                            <div class="mt-1 group relative inline-block w-full">
                                <Field id="email" name="email" type="email" autocomplete="email"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-kashmir-600 focus:outline-none focus:ring-kashmir-600 sm:text-sm" />
                                <ErrorMessage name="email"
                                    class="absolute left-5 top-5 translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700" />
                            </div>
                        </div>
                        <div v-if="oauth" class="space-y-1">
                            <label for="password" class="block text-sm font-medium text-gray-700">{{ t("loginpage.login.passwordLabel") }}</label>
                            <div class="mt-1 group relative inline-block w-full">
                                <Field id="password" name="password" type="password" autocomplete="password"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-kashmir-600 focus:outline-none focus:ring-kashmir-600 sm:text-sm" />
                                <ErrorMessage name="password"
                                    class="absolute left-5 top-0 translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700" />
                            </div>
                            <div class="text-sm text-right">
                                <LocaleLink to="/recover-password"
                                    class="font-medium text-kashmir-500 hover:text-kashmir-600">{{ t("loginpage.login.passwordForgot") }}
                                </LocaleLink>
                            </div>
                        </div>
                        <div>
                            <button type="submit"
                                class="flex w-full justify-center rounded-md border border-transparent bg-kashmir-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-kashmir-700 focus:outline-none focus:ring-2 focus:ring-kashmir-600 focus:ring-offset-2">
                                {{ t("loginpage.submit") }}
                            </button>
                        </div>
                    </Form>
                </div>
                <div class="mt-8 flex items-center justify-between">
                    <p class="text-sm text-kashmir-500 align-middle">
                        {{ t("loginpage.login.passwordPrefer") }}
                    </p>
                    <Switch v-model="oauth"
                        class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-kashmir-600 focus:ring-offset-2">
                        <span class="sr-only">Use setting</span>
                        <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                        <span aria-hidden="true"
                            :class="[oauth ? 'bg-kashmir-500' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out']" />
                        <span aria-hidden="true"
                            :class="[oauth ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                    </Switch>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { useAuthStore, useTokenStore } from "@/stores"
import { tokenParser, tokenIsTOTP } from "@/utilities"

definePageMeta({
    layout: "authentication",
    middleware: ["anonymous"],
});

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const tokenStore = useTokenStore()
const route = useRoute()
const redirectAfterLogin = "/"
const redirectAfterMagic = "/magic"
const redirectTOTP = "/totp"

const oauth = ref(false)
const schema = {
    email: { email: true, required: true },
    password: { min: 8, max: 64 },
}

async function submit(values: any) {
    await authStore.logIn({ username: values.email, password: values.password })
    if (authStore.loggedIn) return await navigateTo(localePath(redirectAfterLogin))
    if (tokenStore.token && tokenIsTOTP(tokenStore.token))
        return await navigateTo(localePath(redirectTOTP))
    if (tokenStore.token &&
        tokenParser(tokenStore.token).hasOwnProperty("fingerprint"))
        return await navigateTo(localePath(redirectAfterMagic))
}

onMounted(async () => {
    // Check if password requested
    if (route.query && route.query.oauth) oauth.value = true
})
</script>