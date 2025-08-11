const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const {
    newCasoValidation,
    updateCasoValidation,
    partialUpdateCasoValidation,
} = require('../utils/casosValidations');

/**
 * @openapi
 * /casos/search:
 *  get:
 *    summary: Retorna uma lista de casos
 *    description: Retorna uma lista de casos com base no termo de pesquisa
 *    tags: [Casos]
 *    parameters:
 *      - name: q
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          example: homicidio
 *    responses:
 *      200:
 *        description: Lista de casos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 *      404:
 *        description: Nenhum caso encontrado para o termo pesquisado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum caso encontrado para a busca especificada
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get('/casos/search', casosController.filter);

/**
 * @openapi
 * /casos/{caso_id}/agente:
 *  get:
 *    summary: Retorna o agente responsável por um caso específico
 *    description: Retorna os detalhes do agente responsável por um caso com base no id do caso
 *    tags: [Casos]
 *    parameters:
 *      - name: caso_id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Detalhes do agente responsável pelo caso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "caso_id" deve ser um id válido
 *      404:
 *        description: Nenhum caso ou agente encontados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum caso encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get('/casos/:caso_id/agente', casosController.getAgenteByCasoId);

/**
 * @openapi
 * /casos/{id}:
 *  get:
 *    summary: Retorna um caso específico
 *    description: Retorna os detalhes de um caso pelo seu id
 *    tags: [Casos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Detalhes do caso retornados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser válido
 *      404:
 *        description: Nenhum caso para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum caso encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get('/casos/:id', casosController.getCasosById);

/**
 * @openapi
 * /casos:
 *  get:
 *    summary: Retorna todos os casos
 *    description: Retorna uma lista de todos os casos disponíveis
 *    tags: [Casos]
 *    responses:
 *      200:
 *        description: Lista todos os casos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 */
router.get('/casos', casosController.getAllCasos);

/**
 * @openapi
 * /casos:
 *  post:
 *    summary: Cria um novo caso
 *    description: Cria um novo caso com os dados fornecidos
 *    tags: [Casos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoCaso'
 *    responses:
 *      201:
 *        description: Caso criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Parâmetros inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O status é obrigatório
 *                    - O status deve ser "aberto" ou "solucionado"
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o agente_id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.post('/casos', newCasoValidation, casosController.createCaso);

/**
 * @openapi
 * /casos:
 *  put:
 *    summary: Atualiza um caso
 *    description: Atualiza um caso com os dados fornecidos
 *    tags: [Casos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoCaso'
 *    responses:
 *      200:
 *        description: Caso atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Parâmetros inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O status é obrigatório
 *                    - O status deve ser "aberto" ou "solucionado"
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o agente_id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.put('/casos/:id', updateCasoValidation, casosController.updateCaso);

/**
 * @openapi
 * /casos:
 *  patch:
 *    summary: Atualiza um caso
 *    description: Atualiza um caso parcialmente com os dados fornecidos
 *    tags: [Casos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoCaso'
 *    responses:
 *      200:
 *        description: Caso atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Parâmetros inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O status deve ser "aberto" ou "solucionado"
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o agente_id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.patch('/casos/:id', partialUpdateCasoValidation, casosController.updatePartialCaso);

/**
 * @openapi
 * /casos/{id}:
 *  delete:
 *    summary: Apaga um caso específico
 *    description: Remove um caso da base de dados
 *    tags: [Casos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      204:
 *        description: Caso removido com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser válido
 *      404:
 *        description: Nenhum caso para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum caso encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.delete('/casos/:id', casosController.deleteCaso);

/**
 * @openapi
 * components:
 *  schemas:
 *    Caso:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        titulo:
 *          type: string
 *          example: "Homicídio"
 *        descricao:
 *          type: string
 *          example: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos"
 *        status:
 *          type: string
 *          enum: ["aberto", "fechado"]
 *          example: "aberto"
 *        agente_id:
 *          type: integer
 *          example: 1
 *    NovoCaso:
 *      type: object
 *      properties:
 *        titulo:
 *          type: string
 *          example: "Homicídio"
 *        descricao:
 *          type: string
 *          example: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos"
 *        status:
 *          type: string
 *          enum: ["aberto", "fechado"]
 *          example: "aberto"
 *        agente_id:
 *          type: integer
 *          example: 1
 */

module.exports = router;
