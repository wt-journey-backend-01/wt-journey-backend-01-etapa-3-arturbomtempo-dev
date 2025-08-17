const z = require('zod');
const { validate } = require('./errorHandler');

const newAgenteValidation = (req, res, next) => {
    const newAgente = z.object({
        body: z.object({
            nome: z.string({ error: 'Nome é obrigatório.' }).min(1, 'Nome é obrigatório.'),
            cargo: z.string({ error: 'Cargo é obrigatório.' }).min(1, 'Cargo é obrigatório.'),
            dataDeIncorporacao: z.iso
                .date({
                    error: (issue) =>
                        issue.input === undefined
                            ? 'Data de incorporação é obrigatória.'
                            : 'Data de incorporação deve estar no formato YYYY-MM-DD.',
                })
                .refine((value) => {
                    const now = new Date();
                    const inputDate = new Date(value);
                    return inputDate <= now;
                }, 'Data não pode estar no futuro.'),
        }),
    });

    validate(newAgente, req);
    next();
};

const updateAgenteValidation = (req, res, next) => {
    const updateAgente = z.object({
        params: z.object({
            id: z.coerce
                .number({ error: 'Id inválido.' })
                .int({ error: 'Id inválido.' })
                .positive({ error: 'Id inválido.' }),
        }),
        body: z
            .looseObject({
                nome: z.string({ error: 'Nome é obrigatório.' }).min(1, 'Nome é obrigatório.'),
                cargo: z.string({ error: 'Cargo é obrigatório.' }).min(1, 'Cargo é obrigatório.'),
                dataDeIncorporacao: z.iso
                    .date({
                        error: (issue) =>
                            issue.input === undefined
                                ? 'Data de incorporação é obrigatória.'
                                : 'Data de incorporação deve estar no formato YYYY-MM-DD.',
                    })
                    .refine((value) => {
                        const now = new Date();
                        const inputDate = new Date(value);
                        return inputDate <= now;
                    }, 'Data não pode estar no futuro.'),
            })
            .refine((data) => data.id === undefined, {
                error: 'Id não pode ser atualizado.',
            }),
    });

    validate(updateAgente, req);
    next();
};

const partialUpdateAgenteValidation = (req, res, next) => {
    const updateAgente = z.object({
        params: z.object({
            id: z.coerce
                .number({ error: 'Id inválido.' })
                .int({ error: 'Id inválido.' })
                .positive({ error: 'Id inválido.' }),
        }),
        body: z
            .strictObject(
                {
                    nome: z.optional(z.string().min(1, 'Nome não pode ser vazio.')),
                    cargo: z.optional(z.string().min(1, 'Cargo não pode ser vazio.')),
                    dataDeIncorporacao: z.optional(
                        z.iso
                            .date({
                                error: 'Data de incorporação deve estar no formato YYYY-MM-DD.',
                            })
                            .refine((value) => {
                                const now = new Date();
                                const inputDate = new Date(value);
                                return inputDate <= now;
                            }, 'Data não pode estar no futuro.')
                    ),
                },
                {
                    error: (err) => {
                        if (err.keys.length > 0) {
                            return `Campos inválidos para agente: ${err.keys.join(', ')}.`;
                        }
                        return err;
                    },
                }
            )
            .refine((data) => data.id === undefined, {
                error: 'Id não pode ser atualizado.',
            }),
    });

    validate(updateAgente, req);
    next();
};

module.exports = {
    newAgenteValidation,
    updateAgenteValidation,
    partialUpdateAgenteValidation,
};
