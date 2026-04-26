import { model, Model, models, Schema, Types } from "mongoose"


interface FavoriteDocument {
    owner: Types.ObjectId;
    items: Types.ObjectId[]
}

const favoriteSchema = new Schema<FavoriteDocument>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    items: [{type: Schema.Types.ObjectId, ref: "Audio"}]
}, {timestamps: true})


const Favorite = models.Favorite || model("Favorite", favoriteSchema)

export default Favorite as Model<FavoriteDocument>