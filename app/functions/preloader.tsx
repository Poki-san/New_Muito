import { makeAutoObservable } from 'mobx'

class preloader {
  switch = false

  constructor() {
    makeAutoObservable(this)
  }

  Input(n: boolean) {
    this.switch = n
  }
}
export default new preloader()