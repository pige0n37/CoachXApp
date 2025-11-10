import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema({ timestamps: true })
export class Exercise {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description?: string;

    @Prop({ required: true })
    category: string; // 'strength', 'cardio', 'flexibility', etc.

    @Prop({ required: false })
    muscleGroup?: string[]; // ['chest', 'triceps'], ['back', 'biceps'], etc.

    @Prop({ required: false })
    equipment?: string[]; // ['barbell', 'dumbbells'], ['bodyweight'], etc.

    @Prop({ required: false })
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

    @Prop({ required: false })
    instructions?: string[];

    @Prop({ required: false })
    videoUrl?: string;

    @Prop({ required: false })
    imageUrls?: string[];

    @Prop({ required: false, default: false })
    isCustom: boolean; // true if user-created

    @Prop({ required: false })
    createdBy?: string; // Better Auth user ID if custom exercise

    @Prop({ required: false, default: true })
    isActive: boolean;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

ExerciseSchema.index({ name: 'text', description: 'text' });
ExerciseSchema.index({ category: 1, muscleGroup: 1 });
ExerciseSchema.index({ createdBy: 1 });
