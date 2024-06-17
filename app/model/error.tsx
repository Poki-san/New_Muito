import { makeAutoObservable } from 'mobx'

class error {
  switch = false
  title = 'Ошибка'
  text = 'Что-то пошло не так!'
  height=180;

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * Открывает или закрывает ошибку (на любом экране поверх)
   * @param n Откроектся или закроектся модалка с ошибкой
   * @param text Описание ошибка
   * @param title Заголовок ошибки
   */
  Input(n: boolean, text?:string, title?:string, height?:number) {
    this.switch = n
    if (text?.length && text.length != 0) {
      this.text = text
    }
    if (title?.length && title.length != 0) {
      this.title = title
    }
    
    if (height!=undefined) {
      this.height = height
    }
  }
}
export default new error()