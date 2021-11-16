<script lang="ts">
import {
  Component,
  Prop,
  Watch,
  Mixins,
  Emit
} from 'vue-property-decorator'
import Chart from 'chart.js'
import VueChart from 'vue-chartjs'

@Component
export default class LineChart extends Mixins(
  VueChart.Line,
  VueChart.mixins.reactiveProp
) {
  /**
   * Chart data
   */
  @Prop({ required: true, default: {} })
  public chartData!: Chart.ChartData;

  /**
   * Chart options(If override default options)
   */
  @Prop()
  public chartOptions!: Chart.ChartOptions;

  /**
   * Chart options
   */
  private options: Chart.ChartOptions = {};

  mounted () {
    if (!this.chartOptions) {
      this.applyDefaultOptions()
    } else {
      this.options = this.chartOptions
    }

    this.renderChart(this.chartData, this.options)
  }

  /**
   * Chart Default options
   */
  private applyDefaultOptions () {
    this.options.legend = { display: false }
    this.options.responsive = true
    this.options.maintainAspectRatio = false
  }
}
</script>

<style scoped lang="scss">

</style>
