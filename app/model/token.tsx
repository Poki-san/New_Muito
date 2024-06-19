import { makeAutoObservable } from 'mobx'
import { remove, save} from '../functions/storage'

class user {
  data = {}
  token = ''

  constructor() {
    makeAutoObservable(this)
  }

  userInput(user:object, token:string) {
    this.data = user
    this.token = token
  } 
  userUpdate(user:object, token:string) {
    this.data =  user
    this.token = token
    save('@userData', {user: user, token:token})
  }
  
  userClear() {
    this.data = {}
    this.token = ''
    remove('@userData')
  } 
}
export default new user()