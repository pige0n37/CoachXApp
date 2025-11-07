import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    pctDailyCarbs: number;

    @Prop({ required: true })
    pctDailyProtein: number;

    @Prop({ required: true })
    pctDailyFats: number;

    @Prop({ required: false })
    timeOfDay?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

    @Prop({ required: false })
    isPreWorkout?: boolean;

    @Prop({ required: false })
    isPostWorkout?: boolean;
}

export const MealSchema = SchemaFactory.createForClass(Meal);