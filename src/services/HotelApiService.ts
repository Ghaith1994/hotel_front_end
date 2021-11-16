import axios, { AxiosInstance } from 'axios'
import { Hotel } from '@/models/Hotel'
import { HotelReview } from '@/models/HotelReview'

export class HotelApiService {
  private httpClient;

  private $apiPrefix= 'hotel';

  public constructor (httpClient: AxiosInstance) {
    this.httpClient = httpClient
  }

  async getHotels (queryParams = ''): Promise<Hotel[]> {
    try {
      const { data } = await this.httpClient.get(`${this.$apiPrefix}${queryParams}`)
      return data
    } catch (error) {
      return error
    }
  }

  async getHotelReviews (hotelId: number, queryParams = ''): Promise< HotelReview[]> {
    try {
      const { data } = await this.httpClient.get(`${this.$apiPrefix}/${hotelId}/hotel-reviews${queryParams}`)
      return data
    } catch (error) {
      return error
    }
  }
}
