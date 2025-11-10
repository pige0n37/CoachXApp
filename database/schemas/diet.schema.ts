import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DietDocument = HydratedDocument<Diet>;

@Schema({ timestamps: true })
export class Diet {
    @Prop({ required: true, index: true })
    userId: string; // Better Auth user ID

    @Prop({ required: true })
    name: string; // e.g., "Cutting Plan", "Bulking Plan"

    @Prop({ required: true })
    calories: number; // daily target

    @Prop({ required: true })
    protein: number; // daily target in grams

    @Prop({ required: true })
    carbs: number; // daily target in grams

    @Prop({ required: true })
    fats: number; // daily target in grams

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Meal' }], default: [] })
    meals: Types.ObjectId[]; // References to configured meals

    @Prop({ required: false })
    startDate?: Date;

    @Prop({ required: false })
    endDate?: Date;

    @Prop({ required: true, default: true })
    isActive: boolean; // Current active diet plan

    @Prop({ type: Types.ObjectId, ref: 'Profile', required: false })
    profileId?: Types.ObjectId; // Link to profile used for calculation
}

export const DietSchema = SchemaFactory.createForClass(Diet);

// Index for finding active diet for a user
DietSchema.index({ userId: 1, isActive: 1 });