import mongoose from "mongoose"

const circuitSchema = new mongoose.Schema({
    circuidId: {type: String, required: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    country: {type: String, required: true}
})
const Circuit = mongoose.model("Circuit", circuitSchema)

export default Circuit;