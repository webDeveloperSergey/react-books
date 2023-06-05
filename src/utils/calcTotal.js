export const calcTotal = (items, isPrice) => {
  if (isPrice) {
    return items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
  } else {
    return items.reduce((sum, obj) => sum + obj.count, 0)
  }
}
