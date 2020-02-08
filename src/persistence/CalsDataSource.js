const { Pool } = require('pg')
const pool = new Pool()


// TODO: add logger
class CalsDataSource {
  constructor() {
    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
  }

  addFoodItem = foodItem => {
    console.log(
      `[CalsDataSource adding food item: ${JSON.stringify(foodItem)}]`
    )
    // callback - checkout a client
    pool.connect((err, client, done) => {
      if (err) throw err

      //name, unit, quantity, calories, protein_grams, carb_grams, fat_grams
      const text = `INSERT INTO fooditems(name, unit, quantity, calories, protein_grams, carb_grams, fat_grams) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`
      const values = [
        foodItem.name,
        foodItem.unit,
        foodItem.quantity,
        foodItem.calories,
        foodItem.protein_grams,
        foodItem.carb_grams,
        foodItem.fat_grams
      ]

      // callback
      client.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
        }
      })

      done()
    })
  }

  getFoodItems = async () => {
    return await pool.connect( async (err, client, done) => {
      if (err) throw err
      const clientResult = await client.query('SELECT * FROM foodItems', (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows.length)
          // console.log(res.rows)
          return res.rows
        }
        done()
      })
      console.log(`clientResult: ${clientResult}`)
    })
  }

}

export default CalsDataSource
