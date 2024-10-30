"use strict";
import Course from "../models/course.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function getAllCourses() {
    try {
        const courseRepository = AppDataSource.getRepository(Course);
        const courses = await courseRepository.find();
        return [courses, null];
    } catch (error) {
        return [null, error.message];
    }
}

export async function getCourseById(id) {
    try {
        const courseRepository = AppDataSource.getRepository(Course);
        const course = await courseRepository.findOneBy({ id });
        return course ? [course, null] : [null, "Course not found"];
    } catch (error) {
        return [null, error.message];
    }
}

export async function createCourse(data) {
    try {
        const courseRepository = AppDataSource.getRepository(Course);
        const newCourse = courseRepository.create(data);
        await courseRepository.save(newCourse);
        return [newCourse, null];
    } catch (error) {
        return [null, error.message];
    }
}

export async function updateCourse(id, data) {
    try {
        const courseRepository = AppDataSource.getRepository(Course);
        const course = await courseRepository.findOneBy({ id });
        if (!course) return [null, "Course not found"];

        courseRepository.merge(course, data);
        const updatedCourse = await courseRepository.save(course);
        return [updatedCourse, null];
    } catch (error) {
        return [null, error.message];
    }
}

export async function deleteCourse(id) {
    try {
        const courseRepository = AppDataSource.getRepository(Course);
        const course = await courseRepository.findOneBy({ id });
        if (!course) return [null, "Course not found"];

        await courseRepository.remove(course);
        return ["Course deleted successfully", null];
    } catch (error) {
        return [null, error.message];
    }
}
