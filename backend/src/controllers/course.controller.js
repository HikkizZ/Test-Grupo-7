"use strict";

import {
    getAllCourses as getAllCoursesService,
    getCourseById as getCourseByIdService,
    createCourse as createCourseService,
    updateCourse as updateCourseService,
    deleteCourse as deleteCourseService
} from "../services/course.service.js";
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function getAllCourses(req, res) {
    try {
        const [courses, error] = await getAllCoursesService();
        if (error) return handleErrorServer(res, 500, error);

        handleSuccess(res, 200, "Courses retrieved successfully", courses);
    } catch (error) {
        handleErrorServer(res, 500, "Error retrieving courses.");
    }
}

export async function getCourseById(req, res) {
    try {
        const [course, error] = await getCourseByIdService(req.params.id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Course retrieved successfully", course);
    } catch (error) {
        handleErrorServer(res, 500, "Error retrieving course.");
    }
}

export async function createCourse(req, res) {
    try {
        const [newCourse, error] = await createCourseService(req.body);
        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 201, "Course created successfully", newCourse);
    } catch (error) {
        handleErrorServer(res, 500, "Error creating course.");
    }
}

export async function updateCourse(req, res) {
    try {
        const [updatedCourse, error] = await updateCourseService(req.params.id, req.body);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Course updated successfully", updatedCourse);
    } catch (error) {
        handleErrorServer(res, 500, "Error updating course.");
    }
}

export async function deleteCourse(req, res) {
    try {
        const [message, error] = await deleteCourseService(req.params.id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, message);
    } catch (error) {
        handleErrorServer(res, 500, "Error deleting course.");
    }
}
