import { AudioDocument } from "#/models/audio";
import {ObjectId, Types} from "mongoose";
import { Request } from "express";

export type PopulatedOwner = { _id: Types.ObjectId; name: string };

export type PopulateFavList = AudioDocument<PopulatedOwner>;

export interface CreatePlaylistRequest extends Request{
    body: {title: string, resId: string, visibility: "public" | "private"}
}

export interface UpdatePlaylistRequest extends Request{
    body: {title: string, id: string, item: string, visibility: "public" | "private"}
}