"use strict";

import Resource from "../models/resource.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createResourceService(req) {
    try {
        const resourceRepository = AppDataSource.getRepository(Resource);

        const existingResource = await resourceRepository.findOne({ where: { name: req.body.name } });

        if (existingResource) {
            return [null, "El recurso ya existe."];
        }

        const newResource = resourceRepository.create({
            name: req.body.name,
            brand: req.body.brand,
            resourceType: req.body.resourceType,
        });

        await resourceRepository.save(newResource);

        return [newResource, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getResourcesService() {
    try {
        const resourceRepository = AppDataSource.getRepository(Resource);

        const resources = await resourceRepository.find({
            order: {
                id: "ASC", 
            },
        });

        if (!resources || resources.length === 0) {
            return [null, "No se encontraron recursos."];
        }

        return [resources, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getResourceService(query) {
    try {
        const { id, name, brand, resourceType } = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const queryBuilder = resourceRepository.createQueryBuilder("resource");

        if (id !== undefined) {
            queryBuilder.andWhere("resource.id = :id", { id });
        }
        if (name) {
            queryBuilder.andWhere("resource.name = :name", { name });
        }
        if (brand) {
            queryBuilder.andWhere("resource.brand = :brand", { brand });
        }
        if (resourceType) {
            queryBuilder.andWhere("resource.resourceType = :resourceType", { resourceType });
        }

        const resourcesFound = await queryBuilder.getMany();

        if (!resourcesFound || resourcesFound.length === 0) {
            return [null, "No se encontraron recursos con los criterios especificados."];
        }

        return [resourcesFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function updateResourceService(query, body) {
    try {
        const { id, name } = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const resourceFound = await resourceRepository.findOne({ where: [{ id }, { name }] });

        if (!resourceFound) return [null, "Recurso no encontrado."];

        const updatedResource = await resourceRepository.save({
            ...resourceFound,
            ...body,
        });

        return [updatedResource, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function deleteResourceService(query) {
    try {
        const { id, name } = query;

        const resourceRepository = AppDataSource.getRepository(Resource);

        const resourceFound = await resourceRepository.findOne({ where: [{ id }, { name }] });

        if (!resourceFound) return [null, "Recurso no encontrado."];

        await resourceRepository.remove(resourceFound);

        return [resourceFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}