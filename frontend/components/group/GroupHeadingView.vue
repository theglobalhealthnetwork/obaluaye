<template>
    <div class="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/75 sm:gap-x-6">
        <div class="flex w-full items-center justify-between gap-x-6 pb-2">
            <div class="flex items-center justify-left w-full space-x-4 truncate">
                <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-kashmir-500">
                    <PhUsersThree class="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h1 class="truncate text-lg font-semibold leading-7 text-gray-900">
                    {{ props.title }}
                </h1>
                <PhChecks v-if="groupStore.term.isComplete" class="text-spring-600 h-6 w-6 shrink-0" aria-hidden="true" />
                <PhFeather v-if="groupStore.term.isFeatured" class="text-yellow-600 h-6 w-6 shrink-0" aria-hidden="true" />
            </div>
            <div v-if="groupStore.isCustodian || groupStore.isResearcher || authStore.isAdmin"
                class="flex flex-inline items-center space-x-2">
                <!-- Separator -->
                <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
                <Menu v-if="props.activeTab === 'METADATA' && (groupStore.isLastMember || authStore.isAdmin)" as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="inline-flex items-center w-full justify-center -ml-px gap-x-1.5 rounded-md px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <PhWarningCircle class="md:-ml-0.5 h-4 w-4 text-cerise-600" aria-hidden="true" />
                            <span class="hidden md:block">{{ t("header.delete") }}</span>
                            <PhCaretDown class="md:-ml h-4 w-4 text-gray-400" aria-hidden="true" />
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                <button type="button" @click.prevent="watchEditRequest('remove')"
                                    :class="[active ? 'bg-cerise-100 text-gray-900' : 'text-gray-700', 'flex items-center w-full gap-x-1.5 px-4 py-2 text-sm']">
                                    <PhTrashSimple class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {{ t("header.delete") }}
                                </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
                <LocaleLink
                    v-if="props.activeTab === 'RESPONSE' && journeyStore.term && journeyStore.term.id && (groupStore.isResearcher || groupStore.isCustodian)"
                    :to="`/journey/${groupStore.term.id as string}/${journeyStore.term.id}`"
                    class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm ring-1 ring-inset text-white bg-spring-500 hover:bg-spring-700">
                    <PhPencilSimple class="md:-ml-0.5 h-4 w-4" aria-hidden="true" />
                    <span class="hidden md:block">{{ t("pathway.journey.review") }}</span>
                </LocaleLink>
                <button type="button" v-if="props.activeTab === 'METADATA'" @click.prevent="watchEditRequest('edit')"
                    class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <PhLightning class="md:-ml-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <span class="hidden md:block">{{ t("header.edit") }}</span>
                </button>
                <div v-if="groupStore.term.readyToComplete && (groupStore.isCustodian || groupStore.isResearcher)"
                    class="flex flex-wrap justify-center mx-3 my-2">
                    <legend class="block text-xs">{{ t("group.complete") }}</legend>
                    <Switch @click="watchCompleted"
                        class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none">
                        <span class="sr-only">{{ t("group.complete") }}</span>
                        <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                        <span aria-hidden="true"
                            :class="[isComplete ? 'bg-spring-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-3 w-8 rounded-full transition-colors duration-200 ease-in-out']" />
                        <span aria-hidden="true"
                            :class="[isComplete ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                    </Switch>
                </div>
                <div v-if="authStore.isAdmin" class="flex flex-wrap justify-center mx-3 my-2">
                    <legend class="block text-xs">{{ t("filter.featured") }}</legend>
                    <Switch @click="watchFeatured"
                        class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none">
                        <span class="sr-only">{{ t("filter.featured") }}</span>
                        <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                        <span aria-hidden="true"
                            :class="[isFeatured ? 'bg-yellow-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-3 w-8 rounded-full transition-colors duration-200 ease-in-out']" />
                        <span aria-hidden="true"
                            :class="[isFeatured ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                    </Switch>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem, Switch } from "@headlessui/vue"
import { PhCaretDown, PhWarningCircle, PhTrashSimple, PhLightning, PhUsersThree, PhFeather, PhChecks, PhPencilSimple } from "@phosphor-icons/vue"
import { useGroupStore, useJourneyStore, useAuthStore } from "@/stores"

const { t } = useI18n()
const isFeatured = ref(false)
const isComplete = ref(false)
const groupStore = useGroupStore()
const journeyStore = useJourneyStore()
const authStore = useAuthStore()
const props = defineProps<{
    title: string,
    activeTab: string,
}>()
const emit = defineEmits<{ setEditRequest: [request: string] }>()

// watch(() => [props.activeTab], async () => {
//     console.log('Changed active tab to:', props.activeTab)
// })

function watchFeatured() {
    isFeatured.value = !isFeatured.value
    emit("setEditRequest", "feature")
}

function watchCompleted() {
    isComplete.value = !isComplete.value
    emit("setEditRequest", "complete")
}

async function watchEditRequest(request: string) {
    emit("setEditRequest", request)
}

onMounted(async () => {
    if (groupStore.term && groupStore.term.isFeatured) isFeatured.value = groupStore.term.isFeatured
    if (groupStore.term && groupStore.term.isComplete) isComplete.value = groupStore.term.isComplete
})
</script>