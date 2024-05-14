/**
 * Когда долистали до конца ScrollView
 * Пример условия для ScrollView
 * onScroll={({nativeEvent})=>{
      if (isCloseToBottom(nativeEvent)) {
        console.log(1);
      }
    }}
 * @param nativeEvent - от параметр ScrollView обычно используется в onScroll
 * @returns Возращает true или false
 */
export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 1;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};