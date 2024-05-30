import { makeAutoObservable } from 'mobx'

class coordinate {
  lat = 0
  lon = 0

  constructor() {
    makeAutoObservable(this)
  }

  Input(lat: number, lon: number) {
    this.lat = lat
    this.lon = lon
  }
}
export default new coordinate()