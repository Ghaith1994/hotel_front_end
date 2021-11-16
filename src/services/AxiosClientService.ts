import axios from 'axios'
import { HotelApiService } from '@/services/HotelApiService'

const axiosInstance = axios.create({ baseURL: process.env.VUE_APP_BACKEND_BASE_URL })

export const hotelApiService = new HotelApiService(axiosInstance)
