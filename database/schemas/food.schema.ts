import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema({ timestamps: true })
export class Food {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    brand?: string;

    @Prop({ required: false })
    barcode?: string;

    @Prop({ required: true })
    servingSize: number; // in grams

    @Prop({ required: true })
    servingUnit: string; // 'g', 'ml', 'piece', etc.

    @Prop({ required: true })
    calories: number; // per serving

    @Prop({ required: true })
    protein: number; // grams per serving

    @Prop({ required: true })
    carbs: number; // grams per serving

    @Prop({ required: true })
    fats: number; // grams per serving

    @Prop({ required: false })
    fiber?: number; // grams per serving

    @Prop({ required: false })
    sugar?: number; // grams per serving

    @Prop({ required: false })
    saturatedFat?: number; // grams per serving

    @Prop({ required: false })
    sodium?: number; // mg per serving

    @Prop({ required: false, default: false })
    isCustom: boolean; // true if user-created, false if from database

    @Prop({ required: false })
    createdBy?: string; // Better Auth user ID if custom food

    @Prop({ required: false, default: true })
    isActive: boolean; // for soft delete
}

export const FoodSchema = SchemaFactory.createForClass(Food);

// Index for faster searches
FoodSchema.index({ name: 'text', brand: 'text' });
FoodSchema.index({ barcode: 1 });
FoodSchema.index({ createdBy: 1 });
