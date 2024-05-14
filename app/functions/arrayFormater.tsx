/**
 * Удаляет элемент по индексу
 * @param data - массив
 * @param indexProps - индекс которое нужно удалить
 */
export function delElement(data:any[], indexProps:number) {
    const array =[]
    for (let index = 0; index < data.length; index++) {
        if (index != indexProps) {
           array.push(data[index])
        }
    }
    return array
}