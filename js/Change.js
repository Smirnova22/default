export default class Change {
    static add(product, price) {
        let storage = localStorage.getItem('basket')
        let good_array
        if (storage) {
            good_array = JSON.parse(storage)
            let result = good_array.findIndex((obj => obj.id == product))
            if (result === -1) {
                good_array.push({id:product, count: "1", price: price})
            } else {
                good_array[result].count = String(parseInt(good_array[result].count) + 1)
            }
        } else {
            good_array = [{id: product, count: "1", price: price}]
        }
        localStorage.setItem('basket', JSON.stringify(good_array))
    }
    static remove(product, type = null) {
        let storage = localStorage.getItem('basket')
        let good_array
        if (storage) {
            good_array = JSON.parse(storage)
            let result = good_array.findIndex((obj => obj.id == product))
            if (result === -1) {
                return false
            } else {
                if (good_array[result].count > 1 && type === null) {
                    good_array[result].count = String(parseInt(good_array[result].count) - 1)
                } else {
                    good_array = good_array.filter(el => el.id != product)
                }
            }
        } else {
            return false
        }
        localStorage.setItem('basket', JSON.stringify(good_array))
    }
    static clear() {
        let storage = localStorage.getItem('basket')
        if (storage) {
            localStorage.removeItem('basket') 
        } else {
            return false
        }  
    }
}