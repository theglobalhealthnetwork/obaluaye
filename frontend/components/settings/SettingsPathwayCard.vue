<template>
    <div class="w-full">
        <div>
            <div class="flex justify-between pt-6 px-4 sm:px-6">
                <div>
                    <h3 class="text-lg font-medium leading-6 text-gray-900">{{ t("settings.pathway.title") }}</h3>
                    <p class="mt-1 text-sm text-gray-500">
                        {{ t("settings.pathway.description") }}
                    </p>
                </div>
                <LocaleLink v-if="authStore.activePathway && journeyStore.term && journeyStore.term.id"
                    :to="`/journey/${journeyStore.term.id}`"
                    class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 my-1 text-sm text-kashmir-900 ring-1 ring-inset ring-gray-300 hover:bg-kashmir-50">
                    <PhPencilSimple class="md:-ml-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <span class="hidden md:block">{{ t("pathway.journey.review") }}</span>
                </LocaleLink>
            </div>
            <div class="flex-auto p-3">
                {{ journeyStore.term }}
            </div>
            <JourneyResponsePagination :last-page="lastPage" :next-page="nextPage" :editing="false"
                @set-page-response="watchPageRequest" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PhPencilSimple } from "@phosphor-icons/vue"
import { useAuthStore, useJourneyStore } from "@/stores"

const { t } = useI18n()
const journeyStore = useJourneyStore()
const authStore = useAuthStore()
const nextPage = ref(false)
const lastPage = ref(false)

async function watchPageRequest(request: string) {
    switch (request) {
        case "last":
            if (lastPage.value && journeyStore.term.journeyBack) await getPathwayPage(journeyStore.term.journeyBack)
            break
        case "next":
            if (
                nextPage.value
                && journeyStore.term.journeyPath
                && journeyStore.term.journeyPath.length === 1
            ) await getPathwayPage(journeyStore.term.journeyPath[0])
            break
        default:
            break
    }
}

async function getPathwayPage(key: string) {
    await journeyStore.getTerm(key, false)
    if (journeyStore.term.journeyPath && journeyStore.term.journeyPath.length) nextPage.value = true
    else nextPage.value = false
    if (journeyStore.term.journeyBack) lastPage.value = true
    else lastPage.value = false
}


onMounted(async () => {
    if (authStore.activePathway) await getPathwayPage(authStore.activePathway as string)
})
</script>