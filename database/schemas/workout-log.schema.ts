import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WorkoutLogDocument = HydratedDocument<WorkoutLog>;

@Schema({ _id: false })
export class CompletedSet {
    @Prop({ required: true })
    setNumber: number;

    @Prop({ required: false })
    reps?: number;

    @Prop({ required: false })
    weight?: number; // in kg

    @Prop({ required: false })
    duration?: number; // in seconds

    @Prop({ required: false })
    distance?: number; // in meters

    @Prop({ required: false })
    rpe?: number; // Rate of Perceived Exertion (1-10)

    @Prop({ required: true })
    completed: boolean;

    @Prop({ required: false })
    notes?: string;
}

const CompletedSetSchema = SchemaFactory.createForClass(CompletedSet);

@Schema({ _id: false })
export class CompletedExercise {
    @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
    exerciseId: Types.ObjectId;

    @Prop({ type: [CompletedSetSchema], default: [] })
    sets: CompletedSet[];

    @Prop({ required: false })
    notes?: string;
}

const CompletedExerciseSchema = SchemaFactory.createForClass(CompletedExercise);

@Schema({ timestamps: true })
export class WorkoutLog {
    @Prop({ required: true, index: true })
    userId: string; // Better Auth user ID

    @Prop({ required: true, type: Date, index: true })
    date: Date; // When the workout was performed

    @Prop({ type: Types.ObjectId, ref: 'WorkoutPlan', required: false })
    workoutPlanId?: Types.ObjectId; // Reference to workout plan if following one

    @Prop({ required: false })
    workoutName?: string; // Custom workout name or from plan

    @Prop({ type: [CompletedExerciseSchema], default: [] })
    exercises: CompletedExercise[];

    @Prop({ required: false })
    duration?: number; // Total workout duration in minutes

    @Prop({ required: false })
    caloriesBurned?: number; // Estimated calories burned

    @Prop({ required: false, min: 1, max: 10 })
    overallRating?: number; // How the workout felt (1-10)

    @Prop({ required: false })
    notes?: string;

    @Prop({ required: true })
    completed: boolean; // Whether workout was fully completed

    @Prop({ required: false })
    startTime?: Date;

    @Prop({ required: false })
    endTime?: Date;
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);

WorkoutLogSchema.index({ userId: 1, date: 1 });
WorkoutLogSchema.index({ workoutPlanId: 1 });
