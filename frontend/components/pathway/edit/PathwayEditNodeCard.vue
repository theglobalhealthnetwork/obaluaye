<template>
    <div class="flex-auto mb-2 p-2 border-b-2 border-kashmir-200">
        <Disclosure v-slot="{ open, close }">
            <DisclosureButton @click="disclosureWatcher(open, close)"
                class="w-full text-base font-semibold text-gray-900 pb-2">
                <div class="flex justify-between px-4">
                    <h3 v-if="draft.question">{{ draft.question }}</h3>
                    <h3 v-else class="text-gray-700 italic">New node</h3>
                    <PhDotsSix v-if="props.initialDraft.id !== pathwayStore.activeDraft" class="h-5 w-5" />
                    <PhCaretDown :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
                </div>
            </DisclosureButton>
            <DisclosurePanel class="p-4 text-sm text-gray-500">
                <form class="flex-auto rounded-lg p-3">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="node-question" class="block text-sm font-semibold leading-6 text-gray-900">{{
                                t("node.field.question") }}</label>
                            <div class="mt-2">
                                <input type="text" name="node-question" id="node-question" v-model="draft.question"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-kashmir-600 sm:text-sm sm:leading-6" />
                            </div>
                            <p v-if="pathwayStore.isTranslatingDraft" class="mt-2 text-sm leading-6 text-gray-500">
                                {{ props.initialDraft.question }}
                            </p>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="form-selection-types" class="block text-sm font-semibold leading-6 text-gray-900">
                                {{ t("form.name") }}
                            </label>
                            <div class="mt-2">
                                <Listbox v-model="draft.formType" id="form-selection-types">
                                    <div class="relative mt-1">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-kashmir-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-kashmir-300 sm:text-sm">
                                            <span class="block truncate text-gray-900">
                                                {{ t(formType[draft.formType as INodeType].name) }}
                                            </span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <PhCaretUpDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }" v-for="ftype in formSelect"
                                                    :key="`ftype-${ftype.value}`" :value="ftype.value" as="template">
                                                    <li :class="[
                                                        active ? 'bg-kashmir-100 text-kashmir-900' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span :class="[
                                                            selected ? 'font-medium' : 'font-normal',
                                                            'block truncate',
                                                        ]">{{ t(formType[ftype.value].name) }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-kashmir-600">
                                                            <PhCheck class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                    </div>
                    <component :is="formType[draft.formType as INodeType].component" :initial-draft="draft.form"
                        :theme-id="draft.theme_id" @set-draft="watchFormRequest" />
                    <div class="col-span-full my-1 py-1 border-t border-gray-100">
                        <PathwayEditResourceCard :initial-drafts="draft.resources" @set-drafts="watchResourcesUpdate" />
                    </div>
                </form>
            </DisclosurePanel>
        </Disclosure>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { PhDotsSix, PhCaretDown, PhCaretUpDown, PhCheck } from "@phosphor-icons/vue"
import { Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOptions, ListboxOption, } from "@headlessui/vue"
import { usePathwayStore } from "@/stores"
import { INode, IKeyable, IForm, INodeType, IResource } from "@/interfaces"

const { t } = useI18n()
const pathwayStore = usePathwayStore()
const { activeEdit } = storeToRefs(pathwayStore)
const toggleClose = ref({} as typeof ref | HTMLElement)
const openState = ref(false)
const draft = ref({} as INode)
const subjects = ref("")
const defaultType: INodeType = "SELECTONE"

// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
const formSelect: IKeyable = [
    { value: "VALUE" },
    { value: "VALUERANGE" },
    { value: "SCALE" },
    { value: "BOOLEAN" },
    { value: "SELECTONE" },
    { value: "SELECTMANY" },
    { value: "SELECTBRANCH" },
    { value: "UPLOAD" },
]
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
const formType: IKeyable = {
    VALUE: { name: "form.types.value", component: resolveComponent("FormEditValueType") },
    VALUERANGE: { name: "form.types.valuerange", component: resolveComponent("FormEditValueRangeType") },
    SCALE: { name: "form.types.scale", component: resolveComponent("FormEditScaleType") },
    BOOLEAN: { name: "form.types.boolean", component: resolveComponent("FormEditBooleanType") },
    SELECTONE: { name: "form.types.selectone", component: resolveComponent("FormEditSelectOneType") },
    SELECTMANY: { name: "form.types.selectmany", component: resolveComponent("FormEditSelectManyType") },
    SELECTBRANCH: { name: "form.types.selectbranch", component: resolveComponent("FormEditSelectBranchType") },
    UPLOAD: { name: "form.types.upload", component: resolveComponent("FormEditUploadType") },
}

const props = defineProps<{
    initialDraft: INode,
}>()
const emit = defineEmits<{
    setDraft: [draft: INode]
}>()

// WATCHERS
function disclosureWatcher(open: boolean, close: typeof ref | HTMLElement) {
    // `open` seems to be false if open and true of closed ...
    if (!open) {
        toggleClose.value = close
        openState.value = true
        pathwayStore.setActiveDraft(props.initialDraft.id as string)
    } else {
        openState.value = false
        pathwayStore.setActiveDraft("")
    }
}

function watchResourcesUpdate(update: IResource[]) {
    draft.value.resources = update
}

watch(() => pathwayStore.activeEdit, () => {
    // @ts-ignore
    if (openState.value && props.initialDraft.id !== pathwayStore.activeDraft) toggleClose.value()
})

watch(
    () => draft.value, () => {
        const response = setDraft({ ...draft.value })
        emit("setDraft", response)
    },
    { deep: true }
)

async function watchFormRequest(request: IForm) {
    // console.log("watchFormRequest", request)
    draft.value.form = request
}

// SETTERS
function setDraft(response: INode): INode {
    if (subjects.value) response.subjects = subjects.value.split(",").map((item: string) => item.trim())
    return response
}

function resetDraft() {
    const initialDraft = { ...props.initialDraft }
    if (initialDraft.subjects && initialDraft.subjects.length) subjects.value = initialDraft.subjects.join(", ")
    if (!initialDraft.form || Object.keys(initialDraft.form).length === 0) initialDraft.form = {}
    if (!initialDraft.formType) initialDraft.formType = defaultType
    draft.value = { ...initialDraft }
}

onMounted(async () => {
    resetDraft()
})

</script>