import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MealDocument = HydratedDocument<Meal>;

@Schema({ timestamps: true })
export class Meal {
    @Prop({ required: true, index: true })
    userId: string; // Better Auth user ID

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, min: 0, max: 100 })
    pctDailyCarbs: number; // percentage of daily carbs target (0-100)

    @Prop({ required: true, min: 0, max: 100 })
    pctDailyProtein: number; // percentage of daily protein target (0-100)

    @Prop({ required: true, min: 0, max: 100 })
    pctDailyFats: number; // percentage of daily fats target (0-100)

    @Prop({ required: false })
    timeOfDay?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

    @Prop({ required: false, default: false })
    isPreWorkout?: boolean;

    @Prop({ required: false, default: false })
    isPostWorkout?: boolean;

    @Prop({ required: false })
    targetTime?: string; // e.g., "08:00", "12:30"
}

export const MealSchema = SchemaFactory.createForClass(Meal);

MealSchema.index({ userId: 1 });