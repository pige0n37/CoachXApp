import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DietDocument = HydratedDocument<Diet>;

@Schema()
export class Diet {
    @Prop({ required: true })
    calories: number;

    @Prop({ required: true })
    protein: number;

    @Prop({ required: true })
    carbs: number;

    @Prop({ required: true })
    fats: number;
}

export const DietSchema = SchemaFactory.createForClass(Diet);