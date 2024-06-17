import { makeAutoObservable } from 'mobx'
import { remove, save} from '../functions/storage'

class user {
  data = {}
  token = ''

  constructor() {
    makeAutoObservable(this)
  }

  userInput(n: {token?:any}) {
    this.data = n
    this.token = n?.token
  } 
  userUpdate(n:{}) {
    this.data =  {...this.data, user: n}
    save('@userData', this.data)
  }
  
  userClear() {
    this.data = {}
    this.token = ''
    remove('@userData')
  } 
}
export default new user()