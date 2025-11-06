import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

export enum GenderType {
    M = "MAN",
    F = "FEMALE"
}

@Schema()
export class Profile {
    @Prop({required: true})
    age: number;

    @Prop({required: true, type: String, enum: GenderType})
    gender: GenderType

    @Prop({required: true})
    weight: number;
}