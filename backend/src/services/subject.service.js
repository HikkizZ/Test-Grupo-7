"use strict";

import Subject from "../models/subject.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function getSubjectService(query) { //* This function gets a subject by id and name.
    try {
        const { idSubject, nameSubject } = query;

        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id and name.
            where: [{ id: idSubject }, { name: nameSubject }],
        });

        if (!subjectFound) return [null, "Subject not found."]; //? If the subject is not found, return null and a message.

        return [subjectFound, null];
    } catch (error) {
        console.error("An error occurred while getting the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function getSubjectsService() { //* This function gets all the subjects.
    try {
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjects = await subjectRepository.find(); //? Finding all the subjects.

        if (!subjects || subjects.length === 0) return [null, "Subjects not found."]; //? If the subjects are not found, return null and a message.

        return [subjects, null];
    } catch (error) {
        console.error("An error occurred while getting the subjects:", error);
        return [null, "Internal server error."];
    }
};

export async function createSubjectService(body) { //* This function creates a subject.
    try {
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const newSubject = subjectRepository.create({
            name: body.name,
            description: body.description,
            curso: {id: body.cursoId}
        }); //? Creating a new subject.

        const subjectCreated = await subjectRepository.save(newSubject); //? Saving the new subject.

        return [subjectCreated, null];
    } catch (error) {
        console.error("An error occurred while creating the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function updateSubjectService(query, body) { //* This function updates a subject by id and name.
    try {
        const { idSubject, nameSubject } = query;
        
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id and name.
            where: [{ id: idSubject }, { name: nameSubject }],
        });

        if (!subjectFound) return [null, "Subject not found."]; //? If the subject is not found, return null and a message.

        const subjectUpdated = await subjectRepository.update(idSubject, body); //? Updating the subject.

        return [subjectUpdated, null];
    } catch (error) {
        console.error("An error occurred while updating the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function deleteSubjectService(query) { //* This function deletes a subject by id and name.
    try {
        const { idSubject, nameSubject } = query;
        console.log(idSubject, nameSubject);
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id and name.
            where: [{ id: idSubject }, { name: nameSubject }],
        });

        if (!subjectFound) return [null, "Subject not found."]; //? If the subject is not found, return null and a message.

        const subjectDeleted = await subjectRepository.delete(idSubject); //? Deleting the subject.

        return [subjectDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the subject:", error);
        return [null, "Internal server error."];
    }
};
