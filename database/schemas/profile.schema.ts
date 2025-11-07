import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

export enum GenderTypeEnum {
    M = "MAN",
    F = "FEMALE"
}

export enum ActivityLevelEnum {
    SEDENTARY = 1.2,
    LIGHTLY_ACTIVE = 1.375,
    MODERATELY_ACTIVE = 1.55,
    VERY_ACTIVE = 1.725,
    EXTRA_ACTIVE = 1.9

}

export enum WeightGoalEnum {
    LOSE_WEIGHT = "LOSE_WEIGHT",
    MAINTAIN_WEIGHT = "MAINTAIN_WEIGHT",
    GAIN_WEIGHT = "GAIN_WEIGHT"
}
@Schema()
export class Profile {
    @Prop({required: true})
    age: number;

    @Prop({required: true, type: String, enum: GenderTypeEnum})
    gender: GenderTypeEnum;

    @Prop({required: true})
    weight: number;

    @Prop({ required: true, min: 0, max: 635 }) // World's fattest had 635kgs
    height: number;

    @Prop({required: false, min: 0, max: 50})
    bodyFatPercentage?: number;

    @Prop({required: true, type: Number, enum: ActivityLevelEnum})
    activityLevel: ActivityLevelEnum;

    @Prop({required: true, type: String, enum: WeightGoalEnum})
    weightGoal: WeightGoalEnum;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);