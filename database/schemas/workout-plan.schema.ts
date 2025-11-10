import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WorkoutPlanDocument = HydratedDocument<WorkoutPlan>;

@Schema({ _id: false })
export class ExerciseSet {
    @Prop({ required: true })
    setNumber: number;

    @Prop({ required: false })
    reps?: number; // number of repetitions

    @Prop({ required: false })
    weight?: number; // in kg

    @Prop({ required: false })
    duration?: number; // in seconds (for timed exercises)

    @Prop({ required: false })
    distance?: number; // in meters (for running, rowing, etc.)

    @Prop({ required: false })
    restTime?: number; // rest time in seconds after this set
}

const ExerciseSetSchema = SchemaFactory.createForClass(ExerciseSet);

@Schema({ _id: false })
export class WorkoutExercise {
    @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
    exerciseId: Types.ObjectId;

    @Prop({ required: true })
    order: number; // order in the workout

    @Prop({ type: [ExerciseSetSchema], default: [] })
    sets: ExerciseSet[];

    @Prop({ required: false })
    supersetWith?: number; // order number of exercise to superset with
}

const WorkoutExerciseSchema = SchemaFactory.createForClass(WorkoutExercise);

@Schema({ _id: false })
export class WorkoutDay {
    @Prop({ required: true })
    dayName: string; // 'Day 1', 'Monday', 'Push Day', etc.

    @Prop({ required: false })
    dayOfWeek?: number; // 0-6 (Sunday-Saturday)

    @Prop({ required: false })
    targetMuscleGroups?: string[];

    @Prop({ type: [WorkoutExerciseSchema], default: [] })
    exercises: WorkoutExercise[];

}

const WorkoutDaySchema = SchemaFactory.createForClass(WorkoutDay);

@Schema({ timestamps: true })
export class WorkoutPlan {
    @Prop({ required: true, index: true })
    userId: string; // Better Auth user ID

    @Prop({ required: true })
    name: string; // e.g., "PPL Split", "Full Body 3x/week"

    @Prop({ required: false })
    description?: string;

    @Prop({ type: [WorkoutDaySchema], default: [] })
    days: WorkoutDay[];

    @Prop({ required: true })
    daysPerWeek: number; // 3, 4, 5, 6, etc.

    @Prop({ required: false })
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

    @Prop({ required: false })
    goal?: 'HYPERTROPHY' | 'STRENGTH' | 'ENDURANCE' | 'GENERAL_FITNESS';

    @Prop({ required: false })
    startDate?: Date;

    @Prop({ required: false })
    endDate?: Date;

    @Prop({ required: true, default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Profile', required: false })
    profileId?: Types.ObjectId;

    @Prop({ required: false })
    notes?: string;
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);

WorkoutPlanSchema.index({ userId: 1, isActive: 1 });
