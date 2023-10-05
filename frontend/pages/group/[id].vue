<template>
    <div class="px-2 py-10 lg:px-4 lg:py-6 max-w-3xl mx-auto">
        <div v-if="appSettings.current.pageState === 'loading'">
            <LoadingCardSkeleton />
        </div>
        <div v-if="appSettings.current.pageState === 'done' && groupStore.term && groupStore.term.hasOwnProperty('name')">
            <GroupHeadingView purpose="Group" :title="groupStore.term.title as string"
                @set-edit-request="watchHeadingRequest" />
            <TabGroup>
                <TabList class="flex space-x-8 border-b border-gray-200 text-xs">
                    <Tab v-for="tab in navigation" :key="`tab-${tab.id}`" as="template" v-slot="{ selected }">
                        <button
                            :class="[selected ? 'border-spring-500 text-spring-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 font-medium']">
                            <component :is="tab.icon"
                                :class="[selected ? 'text-spring-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']"
                                aria-hidden="true" />
                            <span>{{ t(tab.name) }}</span>
                        </button>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <dl class="divide-y divide-gray-100 mt-2">
                            <div v-if="groupStore.term.title" class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">{{ t("group.field.title") }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                                    groupStore.term.title }}</dd>
                            </div>
                            <div v-if="groupStore.term.description"
                                class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">{{ t("group.field.description") }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                                    groupStore.term.description }}
                                </dd>
                            </div>
                            <div v-if="groupStore.term.subjects && groupStore.term.subjects.length"
                                class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">{{ t("group.field.subjects") }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ groupStore.term.subjects.join(", ") }}
                                </dd>
                            </div>
                            <div v-if="groupStore.term.country && groupStore.term.country.length"
                                class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">{{ t("group.field.country") }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <CommonCountryView :current-country="groupStore.term.country" />
                                </dd>
                            </div>
                            <div v-if="groupStore.term.spatial" class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">{{ t("group.field.spatial") }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                                    groupStore.term.spatial }}
                                </dd>
                            </div>
                        </dl>
                    </TabPanel>
                    <TabPanel>
                        <GroupMembersCard :group-id="(route.params.id as string)" />
                    </TabPanel>
                    <TabPanel>
                        <GroupInvitationsCard :group-id="(route.params.id as string)" />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { PhEnvelopeSimple, PhUsersThree, PhGraph } from "@phosphor-icons/vue"
import { useSettingStore, useGroupStore } from "@/stores"

definePageMeta({
    middleware: ["authenticated"],
})

const { t } = useI18n()
const localePath = useLocalePath()
const appSettings = useSettingStore()
const route = useRoute()
const groupStore = useGroupStore()
let navigation = [
    { name: "group.nav.metadata", id: "METADATA", icon: PhGraph },
    { name: "group.nav.members", id: "MEMBERS", icon: PhUsersThree },
    { name: "group.nav.invitations", id: "INVITATIONS", icon: PhEnvelopeSimple }
]

async function watchHeadingRequest(request: string) {
    switch (request) {
        case "remove":
            if (groupStore.isCustodian) {
                await groupStore.removeTerm(route.params.id as string)
                return await navigateTo(localePath("/group"))
            }
        case "edit":
            if (groupStore.isResearcher || groupStore.isCustodian) {
                return await navigateTo(localePath(`/group/edit/${route.params.id}`))
            }
    }
}

onMounted(async () => {
    appSettings.setPageName("nav.groups")
    await groupStore.getTerm(route.params.id as string)
    if (!groupStore.term || Object.keys(groupStore.term).length === 0)
        throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true })
})

// METADATA - START
// https://nuxt.com/docs/getting-started/seo-meta
const title = "whyqd.com — more research, less wrangling"
const description = "Perform schema-to-schema transforms for interoperability and data reuse. Transform messy data into structured schemas using readable, auditable methods."
useHead({
    title,
    meta: [{
        name: "description",
        content: description
    }]
})
useServerSeoMeta({
    title,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogImage: "https://whyqd.com/img/crosswalk.jpg"
})
// METADATA - END
</script>