/*
El responseHandlers.js es un archivo que contiene funciones que se encargan de manejar las respuestas de las peticiones HTTP.
En este archivo se encuentra la función handleSuccess que se encarga de enviar una respuesta exitosa al cliente.
La función handleErrorClient se encarga de enviar una respuesta de error al cliente.
La función handleErrorServer se encarga de enviar una respuesta de error al cliente cuando ocurre un error en el servidor.
*/

"use strict";

//? It receives the response, the status code, the message, and the data.
export function handleSuccess(res, statusCode, message, data = {}) { 
  return res.status(statusCode).json({
    status: "Success",
    message,
    data
  });
}

//? It receives the response, the status code, the message, and the details.
export function handleErrorClient(res, statusCode, message, details = {}) {
  return res.status(statusCode).json({
    status: "Client error",
    message,
    details
  });
}

//? It receives the response, the status code, and the message.
export function handleErrorServer(res, statusCode, message) {
  return res.status(statusCode).json({
    status: "Server error",
    message,
  });
}
export function handleErrorService(res, statusCode, message, error) {
  return res.status(statusCode).json({
    status: "Server error",
    message,
    error // Puedes incluir el error original si lo deseas
  });
}