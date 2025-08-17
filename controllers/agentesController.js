const agentesRepository = require('../repositories/agentesRepository');
const casosRepository = require('../repositories/casosRepository');
const { AppError } = require('../utils/errorHandler');

async function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;
    const filter = {};

    if (cargo) {
        filter.cargo = cargo;
    }

    const orderByMapping = {
        dataDeIncorporacao: ['dataDeIncorporacao', 'asc'],
        '-dataDeIncorporacao': ['dataDeIncorporacao', 'desc'],
    };

    let orderBy = orderByMapping[sort];
    const agentes = await agentesRepository.findAll(filter, orderBy);

    res.json(agentes);
}

async function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    res.json(agente);
}

async function createAgente(req, res) {
    const novoAgente = await agentesRepository.create(req.body);
    res.status(201).json(novoAgente);
}

async function updateAgente(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const updatedAgente = await agentesRepository.update(id, req.body);

    res.status(200).json(updatedAgente);
}

async function updatePartialAgente(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const updatedAgente = await agentesRepository.updatePartial(id, req.body);

    res.status(200).json(updatedAgente);
}

async function deleteAgente(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const result = await agentesRepository.remove(id);

    if (!result) {
        throw new AppError(500, 'Erro ao remover agente.');
    }

    res.status(204).send();
}

async function getCasosByAgenteId(req, res) {
    const agenteId = req.params.id;
    const agente = await agentesRepository.findById(agenteId);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const casos = await casosRepository.findAll({ agente_id: agenteId });

    res.json(casos);
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    updatePartialAgente,
    deleteAgente,
    getCasosByAgenteId,
};
