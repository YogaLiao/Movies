// const axios = require("axios")
// const fs = require("fs")

// let count = 7;
// let ids = []

// for(let i = 0; i < count; i++) {
//     let rand = Math.floor(Math.random() * 250)
//     if (ids.includes(rand) === false) {
//         ids.push(rand)
//     }
// }
// console.log(ids)

// const calls = axios.get(`https://imdb-api.com/en/API/Top250Movies/k_1fn0eocd`)
// .then(success => {
// 	let collectedData = success.map(res => res.data)
// 	let stringified = JSON.stringify(collectedData)
// 	fs.writeFile(__dirname + '/randMovie.json', stringified, 'utf8', (err) => {
// 		if(err) {
// 			console.error(err)
// 		}
// 		else {
// 			console.log(`successfully wrote ${collectedData.length} records to db/randMovie.json`)
// 		}
// 	}) 
// })
// .catch(err => {
// 	console.error(err)
// 	console.error('there was probably an issue with the rate limit, try again in 10 seconds or check the error messages above.')
// })