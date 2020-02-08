import CalsDataSource from './CalsDataSource'
const datasource = new CalsDataSource()

export const addFoodItem = foodItem => {
    datasource.addFoodItem(foodItem)
    console.log(foodItem)
}

export const getFoodItems = async () => {
    console.log('get food items')
    const response = await datasource.getFoodItems()
    console.log(`response: ${response}`)
    return response
}