const db = require('../db/db');
const { AppError } = require('../utils/errorHandler');

async function findAll(filter = {}, orderBy = ['id', 'asc']) {
    try {
        const result = await db('agentes')
            .select('*')
            .where(filter)
            .orderBy(orderBy[0], orderBy[1]);
        return result.map((agente) => ({
            ...agente,
            dataDeIncorporacao: new Date(agente.dataDeIncorporacao).toISOString().split('T')[0],
        }));
    } catch (error) {
        throw new AppError(500, 'Erro ao buscar agentes', [error.message]);
    }
}

async function findById(id) {
    try {
        const result = await db('agentes').select('*').where({ id }).first();
        return result;
    } catch (error) {
        throw new AppError(500, 'Erro ao buscar agente', [error.message]);
    }
}

async function create(agente) {
    try {
        const [newAgente] = await db('agentes').insert(agente).returning('*');
        return {
            ...newAgente,
            dataDeIncorporacao: new Date(agente.dataDeIncorporacao).toISOString().split('T')[0],
        };
    } catch (error) {
        throw new AppError(500, 'Erro ao criar agente', [error.message]);
    }
}

async function update(id, updatedAgente) {
    try {
        const [agente] = await db('agentes').update(updatedAgente).where({ id }).returning('*');
        return {
            ...agente,
            dataDeIncorporacao: new Date(agente.dataDeIncorporacao).toISOString().split('T')[0],
        };
    } catch (error) {
        throw new AppError(500, 'Erro ao atualizar agente', [error.message]);
    }
}

async function updatePartial(id, partialAgente) {
    try {
        const [agente] = await db('agentes').update(partialAgente).where({ id }).returning('*');
        return {
            ...agente,
            dataDeIncorporacao: new Date(agente.dataDeIncorporacao).toISOString().split('T')[0],
        };
    } catch (error) {
        throw new AppError(500, 'Erro ao atualizar agente', [error.message]);
    }
}

async function remove(id) {
    try {
        const rows = await db('agentes').del().where({ id });
        return !!rows;
    } catch (error) {
        throw new AppError(500, 'Erro ao excluir agente', [error.message]);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    updatePartial,
    remove,
};
