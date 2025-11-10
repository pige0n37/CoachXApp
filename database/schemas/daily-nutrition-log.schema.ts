import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Meal } from './meal.schema';

export type DailyNutritionLogDocument = HydratedDocument<DailyNutritionLog>;

@Schema({ _id: false })
export class FoodEntry {
    @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
    foodId: Types.ObjectId;

    @Prop({ required: false })
    servings: number; // number of servings consumed
    
    @Prop({ required: false })
    grams: number; // total grams consumed

    @Prop({ required: true })
    calories: number; 

    @Prop({ required: true })
    protein: number;

    @Prop({ required: true })
    carbs: number;

    @Prop({ required: true })
    fats: number;

    @Prop({ required: true })
    timestamp: Date;

    @Prop({ required: false })
    mealType?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
}

const FoodEntrySchema = SchemaFactory.createForClass(FoodEntry);

@Schema({ timestamps: true })
export class DailyNutritionLog {
    @Prop({ required: true, index: true })
    userId: string;

    @Prop({ required: true, type: Date, index: true })
    date: Date;

    @Prop({ type: [FoodEntrySchema], default: [] })
    foods: FoodEntry[];

    @Prop({ type: Types.ObjectId, ref: 'Diet', required: true })
    dietPlanId?: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: "Meal", required: true})
    meal: Types.ObjectId;

}

export const DailyNutritionLogSchema = SchemaFactory.createForClass(DailyNutritionLog);

// Compound index for user and date (one log per user per day)
DailyNutritionLogSchema.index({ userId: 1, date: 1 }, { unique: true });
