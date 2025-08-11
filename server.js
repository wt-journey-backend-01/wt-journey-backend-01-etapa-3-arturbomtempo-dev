const express = require('express');
const dotenv = require('dotenv');
const swagger = require('./docs/swagger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');
const { errorHandler } = require('./utils/errorHandler');

app.use(express.json());

app.use(casosRouter);
app.use(agentesRouter);

swagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando na porta:${PORT}`);
});
