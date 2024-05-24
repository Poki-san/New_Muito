import { makeAutoObservable } from 'mobx'

class avatar {
  uri = ''

  constructor() {
    makeAutoObservable(this)
  }

  Input(n: string) {
    this.uri = n
  }
}
export default new avatar()