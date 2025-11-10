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

export enum FitnessGoalEnum {
    HYPERTROPHY = "HYPERTROPHY",
    ENDURANCE = "ENDURANCE",
    STRENGTH = "STRENGTH",
    GENERAL_FITNESS = "GENERAL_FITNESS"
}

@Schema({ timestamps: true })
export class Profile {
    @Prop({ required: true, unique: true, index: true })
    userId: string; // Better Auth user ID (one profile per user)

    @Prop({ required: true, min: 13, max: 120 })
    age: number;

    @Prop({ required: true, type: String, enum: GenderTypeEnum })
    gender: GenderTypeEnum;

    @Prop({ required: true, min: 20, max: 635 })
    weight: number; // in kg

    @Prop({ required: true, min: 100, max: 280 })
    height: number; // in cm

    @Prop({ required: false, min: 3, max: 50 })
    bodyFatPercentage?: number;

    @Prop({ required: true, type: Number, enum: ActivityLevelEnum })
    activityLevel: ActivityLevelEnum;

    @Prop({ required: true, type: String, enum: WeightGoalEnum })
    weightGoal: WeightGoalEnum;

    @Prop({ required: false, type: String, enum: FitnessGoalEnum })
    fitnessGoal?: FitnessGoalEnum;

    @Prop({ required: false, min: 1, max: 7 })
    exerciseFrequency?: number; // days per week

    @Prop({ required: false })
    targetWeight?: number; // in kg

    @Prop({ required: false })
    medicalConditions?: string[]; // Array of medical conditions

    @Prop({ required: false })
    allergies?: string[]; // Food allergies

    @Prop({ required: false })
    dietaryPreferences?: string[]; // vegetarian, vegan, keto, etc.
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);