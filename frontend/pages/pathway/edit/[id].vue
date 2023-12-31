<template>
    <div class="px-2 py-10 lg:px-4 lg:py-6 max-w-3xl mx-auto">
        <div v-if="appSettings.current.pageState === 'loading'">
            <LoadingCardSkeleton />
        </div>
        <div v-if="appSettings.current.pageState === 'done'">
            <PathwayEditHeadingPanel :title="pathTitle" @set-edit-request="watchHeadingRequest" />
            <div class="flex justify-between -mb-2 mt-2">
                <div class="flex flex-inline items-center space-x-2">
                    <div
                        class="text-xs font-medium leading-6 text-white bg-kashmir-700 mx-3 px-3 pt-0.5 -mb-0.5 mt-0.5 rounded-t-lg">
                        {{ t("pathway.metadata") }}
                    </div>
                    <div v-if="pathwayStore.isTranslatingDraft"
                        class="relative -ml-px inline-flex items-center gap-x-1.5 text-xs">
                        <div class="rounded-full bg-spring-600 p-1">
                            <PhTranslate class="h-4 w-4 text-white" aria-hidden="true" />
                        </div>
                        <span class="text-spring-600 hidden md:block">{{ t("pathway.translate") }}</span>
                    </div>
                </div>
                <div class="flex flex-inline items-center space-x-2 mb-1">
                    <div class="rounded-full bg-kashmir-400 p-1">
                        <PhPlus class="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    <button type="button" @click.prevent="addTheme()"
                        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-kashmir-900 ring-1 ring-inset ring-kashmir-300 hover:bg-kashmir-50">
                        <PhTagSimple class="md:-ml-0.5 h-4 w-4 text-kashmir-400" aria-hidden="true" />
                        <span class="hidden md:block">{{ t("theme.name") }}</span>
                    </button>
                </div>
            </div>
            <div class="rounded-lg my-2 border-t-2 border-kashmir-700">
                <PathwayEditMetadataCard :initial-draft="draft" @set-draft="watchMetadataRequest" />
            </div>
            <ul role="list">
                <li v-for="(theme, thIdx) in draft.themes" :key="`theme-${theme.id}`">
                    <div class="flex justify-between -mb-2">
                        <div
                            class="block text-xs font-medium leading-6 text-white bg-kashmir-500 mx-3 px-3 pt-0.5 rounded-t-lg">
                            {{ t("theme.name") }}: {{ thIdx + 1 }} of {{ draft.themes!.length }}
                        </div>
                        <div class="flex flex-inline items-center space-x-2 mb-1">
                            <div class="rounded-full bg-cerise-400 p-1">
                                <PhMinus class="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <button type="button" @click.prevent="removeTheme(theme.id as string)"
                                class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-cerise-900 ring-1 ring-inset ring-cerise-300 hover:bg-cerise-50">
                                <PhTrashSimple class="md:-ml-0.5 h-4 w-4 text-cerise-400" aria-hidden="true" />
                                <span class="hidden md:block">{{ t("header.delete") }}</span>
                            </button>
                            <div class="rounded-full bg-kashmir-500 p-1">
                                <PhPlus class="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <button type="button" @click.prevent="addTheme(theme.id as string)"
                                class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-kashmir-900 ring-1 ring-inset ring-kashmir-300 hover:bg-kashmir-50">
                                <PhTagSimple class="md:-ml-0.5 h-4 w-4 text-kashmir-400" aria-hidden="true" />
                                <span class="hidden md:block">{{ t("theme.name") }}</span>
                            </button>
                            <button type="button" @click.prevent="addNode(theme.id as string)"
                                class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-kashmir-900 ring-1 ring-inset ring-kashmir-300 hover:bg-kashmir-50">
                                <PhLineSegments class="md:-ml-0.5 h-4 w-4 text-kashmir-400" aria-hidden="true" />
                                <span class="hidden md:block">{{ t("node.name") }}</span>
                            </button>
                        </div>
                    </div>
                    <div :id="`${theme.id}`" :draggable="theme.id !== pathwayStore.activeDraft" @dragstart="handleDragStart"
                        @dragenter="handleDragEnter" @dragover="handleDragOver" @dragleave="handleDragLeave"
                        @drop="handleDrop" @dragend="handleDragEnd"
                        class="bg-gray-50 rounded-lg my-2 border-t-2 border-kashmir-500">
                        <PathwayEditThemeCard :initial-draft="theme" @set-draft="watchThemeRequest" />
                    </div>
                    <ul role="list">
                        <li v-for="(node, ndIdx) in theme.nodes" :key="`node-${node.id}`">
                            <div class="flex justify-between -mb-2">
                                <div
                                    class="block text-xs font-medium leading-6 text-white bg-kashmir-300 mx-3 px-3 pt-0.5 rounded-t-lg">
                                    {{ t("node.name") }}: {{ ndIdx + 1 }} of {{ theme.nodes!.length }}
                                </div>
                                <div class="flex flex-inline items-center space-x-2 mb-1">
                                    <div class="rounded-full bg-cerise-300 p-1">
                                        <PhMinus class="h-4 w-4 text-white" aria-hidden="true" />
                                    </div>
                                    <button type="button" @click.prevent="removeNode(theme.id as string, node.id as string)"
                                        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-cerise-900 ring-1 ring-inset ring-cerise-300 hover:bg-cerise-50">
                                        <PhTrashSimple class="md:-ml-0.5 h-4 w-4 text-cerise-400" aria-hidden="true" />
                                        <span class="hidden md:block">{{ t("header.delete") }}</span>
                                    </button>
                                    <div class="rounded-full bg-kashmir-300 p-1">
                                        <PhPlus class="h-4 w-4 text-white" aria-hidden="true" />
                                    </div>
                                    <button type="button" @click.prevent="addNode(theme.id as string, node.id as string)"
                                        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-kashmir-900 ring-1 ring-inset ring-kashmir-300 hover:bg-kashmir-50">
                                        <PhLineSegments class="md:-ml-0.5 h-4 w-4 text-kashmir-400" aria-hidden="true" />
                                        <span class="hidden md:block">{{ t("node.name") }}</span>
                                    </button>
                                </div>
                            </div>
                            <div :id="`${theme.id}|${node.id}`" :draggable="node.id !== pathwayStore.activeDraft"
                                @dragstart="handleDragStart" @dragenter="handleDragEnter" @dragover="handleDragOver"
                                @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd"
                                class="bg-gray-50 rounded-lg my-2 border-t-2 border-kashmir-300">
                                <PathwayEditNodeCard :initial-draft="node" @set-draft="watchNodeRequest" />
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PhPlus, PhMinus, PhTagSimple, PhLineSegments, PhBookmarkSimple, PhTrashSimple, PhTranslate } from "@phosphor-icons/vue"
import { useSettingStore, usePathwayStore, useTokenStore } from "@/stores"
import { IPathway, IKeyable, ITheme, INode, IPathwayType, IResource } from "@/interfaces"
import { apiTheme, apiNode } from "@/api"
import { generateUUID } from "@/utilities"

definePageMeta({
    middleware: ["moderator"],
});

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const appSettings = useSettingStore()
const pathwayStore = usePathwayStore()
const draft = ref({} as IPathway)
const draftStartLanguage = ref("")
const dragThemeID = ref("" as string)
const dragNodeID = ref("" as string)
const pathTitle = ref("pathway.creating")
const { locale } = useI18n()

// SETUP
onMounted(async () => {
    appSettings.setPageName("nav.pathways")
    appSettings.setPageState("loading")
    await pathwayStore.getTerm(route.params.id as string, false)
    if (!pathwayStore.term || Object.keys(pathwayStore.term).length === 0) {
        // The pathway doesn't exist, so create a draft ...
        pathwayStore.setCreateDraft(true)
        createDraft()
    } else {
        pathwayStore.setCreateDraft(false)
        pathTitle.value = "pathway.updating"
        resetDraft()
    }
    draftStartLanguage.value = draft.value.language as string
    pathwayStore.setSavingEdit(false)
    pathwayStore.settings.setPageState("done")
})

function createDraft() {
    pathwayStore.setLanguageDraft(pathwayStore.settings.locale)
    const themeID = generateUUID()
    draft.value = {
        id: route.params.id as string,
        isPrivate: true,
        isProtected: false,
        pathType: "RESEARCH",
        language: pathwayStore.languageDraft,
        themes: [
            {
                id: themeID,
                language: pathwayStore.languageDraft,
                nodes: [
                    {
                        id: generateUUID(),
                        language: pathwayStore.languageDraft,
                        formType: "SELECTONE",
                        form: {},
                        resources: [],
                        theme_id: themeID,
                    },
                ],
                resources: [],
                pathway_id: route.params.id as string,
            }
        ],
        resources: [],
    }
}

function resetDraft() {
    pathwayStore.setLanguageDraft(pathwayStore.term.language as string)
    let temporaryDraft: IPathway = { ...pathwayStore.term }
    if (!temporaryDraft.resources || !temporaryDraft.resources.length) temporaryDraft.resources = [] as IResource[]
    draft.value = { ...temporaryDraft }
}

// WATCHERS
async function watchHeadingRequest(request: string) {
    // console.log("watchHeadingRequest", request)
    switch (request) {
        case "save":
            await pathwayStore.createTerm(route.params.id as string, draft.value)
            break
        case "cancel":
            return await navigateTo(localePath(`/pathway/${route.params.id}`))
        default:
            watchLocaleSelect(request)
            break
    }
}

function watchMetadataRequest(request: IPathway) {
    // console.log("watchMetadataRequest", request)
    updatePathwayMetadata(request)
}

function watchThemeRequest(request: ITheme) {
    // console.log("watchThemeRequest", request)
    updateTheme(request)
}

function watchNodeRequest(request: INode) {
    // console.log("watchNodeRequest", request)
    updateNode(request)
}

function watchLocaleSelect(select: string) {
    // console.log("Language change", select)
    pathwayStore.setLanguageDraft(select)
    // pathwayStore.setIsTranslatingDraft(select !== draftStartLanguage.value)
}

watch(
    () => draft.value, () => {
        if (Object.keys(draft.value).length !== 0) pathwayStore.setDraft({ ...draft.value })
    },
    { deep: true }
)

// GETTERS
function getThemeIndex(themeID: string) {
    return draft.value.themes!.findIndex(
        (theme: ITheme) => theme.id === themeID
    )
}

function getTheme(themeID: string) {
    return draft.value.themes!.find(
        (theme: ITheme) => theme.id === themeID
    )
}

function getNodeIndex(theme: ITheme, nodeID: string) {
    return theme.nodes!.findIndex(
        (node: INode) => node.id === nodeID
    )
}

function getNode(theme: ITheme, nodeID: string) {
    return theme.nodes!.find(
        (node: INode) => node.id === nodeID
    )
}

// CREATORS UPDATERS
function updatePathwayMetadata(update: IPathway) {
    if (draft.value.themes && draft.value.themes.length) update.themes = [...draft.value.themes]
    // if (draft.value.resources && draft.value.resources.length) update.resources = [...draft.value.resources]
    draft.value = { ...update }
}

function updateTheme(update: ITheme) {
    const updateIdx = getThemeIndex(update.id as string)
    update.nodes = draft.value.themes![updateIdx].nodes
    draft.value.themes![updateIdx] = update
}

function updateNode(update: INode) {
    const themeIdx = getThemeIndex(update.theme_id as string)
    const theme = getTheme(update.theme_id as string)
    const updateIdx = getNodeIndex(theme as ITheme, update.id as string)
    draft.value.themes![themeIdx].nodes![updateIdx] = update
}

function addTheme(requestThemeID?: string) {
    const themeID = generateUUID()
    const newTheme: ITheme = {
        id: themeID,
        language: draft.value.language,
        nodes: [{
            id: generateUUID(),
            language: draft.value.language,
            form: {},
            resources: [],
            theme_id: themeID,
        }],
        resources: [],
        pathway_id: route.params.id as string,
    }
    draft.value.themes!.push(newTheme)
    if (requestThemeID) reorderThemes(newTheme.id as string, requestThemeID, 1)
}

function addNode(themeID: string, requestNodeID?: string) {
    const theme = getTheme(themeID)
    const newNode = {
        id: generateUUID(),
        language: draft.value.language,
        form: {},
        resources: [],
        theme_id: theme!.id
    }
    theme!.nodes!.push(newNode)
    if (requestNodeID) reorderNodes(theme as ITheme, newNode.id, requestNodeID, 1)
}

// REORDER MOVERS
function reorderThemes(frThemeID: string, toThemeID: string, added = 0) {
    // Reorder themes
    const frIdx = getThemeIndex(frThemeID)
    const toIdx = getThemeIndex(toThemeID)
    // Because TypeScript, in its infinite wisdom, has no concept of `-1`
    const dragged = { ...draft.value.themes!.slice(frIdx)[0] }
    draft.value.themes!.splice(frIdx, 1)
    draft.value.themes!.splice(toIdx + added, 0, dragged)
}

function moveNodeBetweenThemes(frThemeID: string, toThemeID: string, nodeID: string) {
    const frTheme = getTheme(frThemeID)
    const frIdx = getNodeIndex(frTheme as ITheme, nodeID)
    const toTheme = getTheme(toThemeID)
    const dragged = { ...frTheme!.nodes!.slice(frIdx)[0] }
    // make sure this is reassigned
    dragged.theme_id = toTheme!.id
    frTheme!.nodes!.splice(frIdx, 1)
    toTheme!.nodes!.push(dragged)
}

function reorderNodes(theme: ITheme, frNodeID: string, toNodeID: string, added = 0) {
    // Reorder themes
    const frIdx = getNodeIndex(theme, frNodeID)
    const toIdx = getNodeIndex(theme, toNodeID)
    const dragged = { ...theme.nodes!.slice(frIdx)[0] }
    theme.nodes!.splice(frIdx, 1)
    theme.nodes!.splice(toIdx + added, 0, dragged)
}

// DELETERS
async function removeTheme(themeID: string) {
    const themeIdx = getThemeIndex(themeID)
    draft.value.themes!.splice(themeIdx, 1)
    // Delete it directly here first
    const tokenStore = useTokenStore()
    try {
        await apiTheme.removeTerm(tokenStore.token, themeID)
    } catch (error) { }
}

async function removeNode(themeID: string, nodeID: string) {
    const theme = getTheme(themeID)
    const nodeIdx = getNodeIndex(theme as ITheme, nodeID)
    theme!.nodes!.splice(nodeIdx, 1)
    // Delete it directly here first
    const tokenStore = useTokenStore()
    try {
        await apiNode.removeTerm(tokenStore.token, nodeID)
    } catch (error) { }
}

// DRAG N DROP
// https://web.dev/drag-and-drop/
function handleDragStart(e: any) {
    e.currentTarget.className = e.currentTarget.className.replace(
        "bg-gray-50",
        "bg-cerise-100"
    )
    const dragIDs = e.currentTarget.id.split("|")
    dragThemeID.value = dragIDs[0]
    dragNodeID.value = ""
    if (dragIDs.length === 2) {
        dragNodeID.value = dragIDs[1]
    }
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("id", e.currentTarget.id)
}

function handleDragEnter(e: any) {
    if (e.target.id !== e.currentTarget.id) return false
    e.currentTarget.className = e.currentTarget.className.replace(
        "bg-gray-50",
        "bg-cerise-100"
    )
}

function handleDragOver(e: any) {
    if (e.preventDefault) {
        e.preventDefault() // Necessary. Allows us to drop.
    }
    if (e.target.id !== e.currentTarget.id) return false
    e.dataTransfer.dropEffect = "move"
    return false
}

function handleDragLeave(e: any) {
    e.stopPropagation()
    if (e.target.id !== e.currentTarget.id) return false
    e.currentTarget.className = e.currentTarget.className.replace(
        "bg-cerise-100",
        "bg-gray-50"
    )
}

function handleDrop(e: any) {
    e.stopPropagation()
    e.preventDefault()
    const dropID = e.currentTarget.id.split("|")
    const dropThemeID = dropID[0]
    let dropNodeID = ""
    if (dropID.length === 2) {
        dropNodeID = dropID[1]
    }
    // Drag - Theme | Node && Drop - Theme | Node
    // Theme to Theme, reorder | Theme to Node, ignore
    // Node to Theme, push / remove | Node to Node, reorder (with variations)
    if (
        (dragThemeID.value !== dropThemeID)
        && (dragNodeID.value === "")
    ) {
        // Reorder themes
        reorderThemes(dragThemeID.value, dropThemeID)
    } else if (
        (dragThemeID.value !== dropThemeID)
        && (dragNodeID.value !== "")
        && (dropNodeID === "")
    ) {
        moveNodeBetweenThemes(dragThemeID.value, dropThemeID, dragNodeID.value)
    } else if (
        (dragThemeID.value === dropThemeID)
        && (dragNodeID.value !== dropNodeID)
    ) {
        const dragTheme = getTheme(dragThemeID.value)
        reorderNodes(dragTheme as ITheme, dragNodeID.value, dropNodeID)
    }
    e.currentTarget.className = e.currentTarget.className.replace(
        "bg-cerise-100",
        "bg-gray-50"
    )
    return false
}

function handleDragEnd(e: any) {
    if (e.target.id !== e.currentTarget.id) return false
    e.currentTarget.className = e.currentTarget.className.replace(
        "bg-cerise-100",
        "bg-gray-50"
    )
}

onBeforeRouteLeave((to, from, next) => {
    if (Object.keys(draft.value).length !== 0) pathwayStore.setDraft({ ...draft.value })
    next()
})

// METADATA - START
// https://nuxt.com/docs/getting-started/seo-meta
const title = t("seo.title")
const description = t("seo.description")
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
    ogImage: "https://globalhealthstudybuilder.org/img/social-header.png"
})
// METADATA - END
</script>