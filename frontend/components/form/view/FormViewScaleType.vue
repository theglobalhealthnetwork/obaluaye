<template>
    <div>
        <p class="text-sm font-medium text-gray-900 mb-2">{{ t("form.types.scale") }}</p>
        <div v-if="props.response && Object.keys(props.response).length">
            <figure>
                <svg ref="chart"></svg>
            </figure>
        </div>
        <div v-else>
            <div v-for="term in scaleList" class="inline-flex">
                <div class="group flex items-center gap-x-1 text-sm leading-6 px-2">
                    <PhCircle class="text-gray-400 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span class="text-sm text-gray-900">{{ term }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PhCircle } from "@phosphor-icons/vue"
import { IForm, IResponse } from "@/interfaces"

const { t } = useI18n()
const barChart = useBarChart()
const chart = ref({} as HTMLElement)
const scaleList = ref([] as string[])

const props = defineProps<{
    form: IForm,
    response: IResponse,
}>()

onMounted(() => {
    if (props.response
        && Object.keys(props.response).length
        && props.response.answer
        && Array.isArray(props.response.answer)
        && props.response.answer.length) {
            barChart.getBarChart(props.response.answer, { chartRef: chart.value })
    } else if (props.form.terms && props.form.terms.length === 2) {
        for (let i = parseInt(props.form.terms[0].value as string); i <= parseInt(props.form.terms[1].value as string); i++)
            scaleList.value.push(i + '')
    }
})

</script>