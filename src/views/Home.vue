<template>

  <div class="container">
    <div class="container__row">
      <div class="container__col-12">
        <fieldset>
          <legend>Filter</legend>

          <div class="d-flex flex-center-space-around d-block-md-down">
            <v-select label="name" placeholder="Select Hotel" v-model="selectedHotel" :options="hotels"></v-select>

            <div class="d-flex flex-center-space-around mt-md-down">
              <label class="form-group__control-label form-group__input-label">FROM</label>
              <date-picker v-model="fromDate" valueType="format"></date-picker>
            </div>

            <div class="d-flex flex-center-space-around mt-md-down">
              <label class="form-group__control-label form-group__input-label">TO</label>
              <date-picker v-model="toDate" valueType="format"></date-picker>
            </div>
          </div>

        </fieldset>
      </div>
    </div>

    <div class="container__row">
      <LineChart :class="'chart-content'" :chart-options="this.chartOptions" :chart-data="this.chartData" />
    </div>

  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import LineChart from '@/components/LineChart.vue'
import DatePicker from 'vue2-datepicker'
import { Hotel } from '@/models/Hotel'
import { hotelApiService } from '@/services/AxiosClientService'
import Chart from 'chart.js'
import { HotelReview } from '@/models/HotelReview'

@Component({
  components: {
    LineChart,
    DatePicker
  }
})
export default class Home extends Vue {
  /**
   * Filter start date
   */
  private fromDate: Date | null = null;

  /**
   * Filter end date
   */
  private toDate: Date | null = null;

  /**
   * Data for chart
   */
  private chartData: Chart.ChartData = {};

  /**
   * List Of Hotels
   */
  private hotels: Hotel[] = [];

  /**
   * List Of Hotel Reviews
   */
  private hotelReviews: HotelReview[] = [];

  /**
   * Selected Hotel
   */
  private selectedHotel: Hotel | null = null;

  /**
   * Watch
   */
  @Watch('selectedHotel')
  private hotelChanged (newVal: Hotel):void {
    this.getChartData()
  }

  @Watch('fromDate')
  private startDateChanged (newVal: Date):void {
    this.getChartData()
  }

  @Watch('toDate')
  private endDateChanged (newVal: Date):void {
    this.getChartData()
  }

  /**
   * Computed
   */
  private get chartOptions (): Chart.ChartOptions {
    return {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Average score over time'
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return ''
          },
          label: function (tooltipItem, data) {
            return ''
          },
          afterBody: (tooltipItem: Chart.ChartTooltipItem[], data: Chart.ChartData): string => {
            if (tooltipItem[0].index) {
              const score = this.hotelReviews[tooltipItem[0].index].averageScore
              const reviewCount = this.hotelReviews[tooltipItem[0].index].reviewCount
              return `Score: ${score} \n\n Review count: ${reviewCount}`
            }

            return ''
          }
        }
      }

    }
  }

  private get getFilter (): string {
    return `?fromDate=${this.fromDate ? this.fromDate : ''}&toDate=${this.toDate ? this.toDate : ''}`
  }

  /**
   * Functions
   */

  mounted (): void {
    this.getHotelData()
  }

  private getHotelData (): void{
    hotelApiService.getHotels().then((response) => {
      this.hotels = response
    })
  }

  private getChartData (): void{
    if (this.selectedHotel) {
      hotelApiService.getHotelReviews(this.selectedHotel.id, this.getFilter).then((response) => {
        this.hotelReviews = response
        this.drawChart()
      })
    }
  }

  private drawChart (): void{
    const labels = this.hotelReviews.map(h => h.dateGroup)
    const averageScores = this.hotelReviews.map(h => h.averageScore)

    this.chartData = {
      labels: labels,
      datasets: [{
        fill: false,
        label: 'Data',
        backgroundColor: '#3e99b6',
        data: averageScores
      }]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
