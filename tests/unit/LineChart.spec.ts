import { shallowMount } from '@vue/test-utils'
import LineChart from '@/components/LineChart.vue'
import 'jest-canvas-mock'

describe('LineChart.vue', () => {
  it('renders chart when passed', () => {
    const chartDate = {
      labels: ['month 1', 'month 2', 'month 3'],
      datasets: [{
        fill: false,
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [1, 2, 3]
      }]
    }
    const wrapper = shallowMount(LineChart, {
      propsData: { chartData: chartDate, chartOptions: { } }
    })
    expect(wrapper.html()).toContain('canvas')
  })
})
