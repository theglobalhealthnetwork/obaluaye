<template>
    <form class="my-3 mx-auto sm:max-w-md">
        <div class="w-full flex">
            <input type="email" name="email-address" id="email-address" autocomplete="email" v-model="email"
                class="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kashmir-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                :placeholder="t('group.invitations.placeholder')" />
            <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button type="submit" @click.prevent="submit"
                    class="flex w-full items-center justify-center rounded-md bg-kashmir-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-kashmir-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kashmir-600">
                    {{ t("group.invitations.invite") }}
                </button>
            </div>
        </div>
        <label for="email-address" class="block text-xs font-medium leading-6 text-gray-600 pl-2">
            {{ t("group.invitations.note") }}
        </label>
    </form>
</template>

<script setup lang="ts">
import { useGroupStore } from "@/stores"

const { t } = useI18n()
const groupStore = useGroupStore()
const email = ref("")
const props = defineProps<{
    groupId: string
}>()

async function submit() {
    if (email.value !== "") await groupStore.createInvitation(props.groupId, email.value)
    email.value = ""
}
</script>