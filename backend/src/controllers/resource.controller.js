"use strict";
import {
    createResourceService,
    getResourcesService,
    getResourceService,
    updateResourceService,
    deleteResourceService
} from "../services/resource.service.js";

import {
    handleErrorClient,
    handleSuccess,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    resourceBodyValidation,
    resourceQueryValidation
} from "../validations/resource.validation.js";

// Crear un nuevo recurso
export async function createResource(req, res) {
    try {
        const { error } = resourceBodyValidation.validate(req.body);

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [resource, resourceError] = await createResourceService(req);

        if (resourceError) return handleErrorClient(res, 400, resourceError);

        handleSuccess(res, 201, "Resource created", resource);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
}

// Listar todos los recursos (opcionalmente podrían ser solo disponibles)
export async function getResources(req, res) {
    try {
        const [resources, resourcesError] = await getResourcesService(req);

        if (resourcesError) return handleErrorClient(res, 404, resourcesError);

        resources.length === 0 ? handleSuccess(res, 204, "No resources found") : handleSuccess(res, 200, "Resources found", resources);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Mostrar información de un recurso en particular
export async function getResource(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = resourceQueryValidation.validate({ id, name });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [resource, resourceError] = await getResourceService({ idResource: id, nameResource: name });

        if (resourceError) return handleErrorClient(res, 404, resourceError);

        handleSuccess(res, 200, "Resource found", resource);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Actualizar información de un recurso
export async function updateResource(req, res) {
    try {
        const { id, name } = req.query;

        const { body } = req;

        const { error: queryError } = resourceQueryValidation.validate({ id, name });

        if (queryError) return handleErrorClient(res, 400, "Validation Query Error", queryError.message);

        const { error: bodyError } = resourceBodyValidation.validate(body);

        if (bodyError) return handleErrorClient(res, 400, "Validation Body Error", bodyError.message);

        const [resourceUpdated, resourceError] = await updateResourceService({ idResource: id, nameResource: name }, body);

        if (resourceError) return handleErrorClient(res, 400, resourceError);

        handleSuccess(res, 200, "Resource updated", resourceUpdated);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Eliminar un recurso
export async function deleteResource(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = resourceQueryValidation.validate({ id, name });

        if (error) return handleErrorClient(res, 400, "Validation Query Error", error.message);

        const [resourceDeleted, resourceError] = await deleteResourceService({ idResource: id, nameResource: name });

        if (resourceError) return handleErrorClient(res, 400, resourceError);

        handleSuccess(res, 200, "Resource deleted", resourceDeleted);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};
