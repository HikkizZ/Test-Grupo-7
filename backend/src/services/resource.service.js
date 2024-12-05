"use strict";
import Resource from "../models/resource.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createResourceService(req) {
    try {
        const resourceRepository = AppDataSource.getRepository(Resource);

        const existingResource = await resourceRepository.findOne({ where: { name: req.body.name } });

        if (existingResource) return [null, "El recurso ya existe"];

        const newResource = resourceRepository.create({
            name: req.body.name,
        });

        await resourceRepository.save(newResource);

        return [newResource, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function getResourcesService() {
    try {
        const resourceRepository = AppDataSource.getRepository(Resource);

        const resources = await resourceRepository.find();

        if (!resources || resources.length === 0) return [null, "No se encontraron recursos."];

        return [resources, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function getResourceService(query) {
    try {
        const {idResource, nameResource} = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const resourceFound = await resourceRepository.findOne({ 
            where: [{ id: idResource }, { name: nameResource }]
         });

        if (!resourceFound) return [null, "Recurso no encontrado."];

        return [resourceFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function updateResourceService(query, body) {
    try {
        const { idResource, nameResource } = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const resourceFound = await resourceRepository.findOne({ where: [{ id: idResource }, { name: nameResource }] });

        if (!resourceFound) return [null, "Recurso no encontrado."];

        const resourceUpdated = await resourceRepository.update(resourceFound.id, body);

        return [resourceUpdated, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function deleteResourceService(query) {
    try {
        const { idResource, nameResource } = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const resourceFound = await resourceRepository.findOne({ where: [{ id: idResource }, { name: nameResource }] });

        if (!resourceFound) return [null, "Recurso no encontrado."];

        await resourceRepository.remove(resourceFound);

        return [resourceFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};
