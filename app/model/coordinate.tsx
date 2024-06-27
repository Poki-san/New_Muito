import { makeAutoObservable } from 'mobx'

class coordinate {
  lat = 0
  lon = 0
  imgLoad = 0

  constructor() {
    makeAutoObservable(this)
  }

  Input(lat: number, lon: number) {
    this.lat = lat
    this.lon = lon
  }

  setLoad(loading: number) {
    this.imgLoad = loading
  }
}
export default new coordinate()