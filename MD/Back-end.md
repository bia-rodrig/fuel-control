# Back-end

## Ambiente

- yarn init -y
- yarn add express
- yarn add typescript - D
- yarn tsc -init
- yarn add @types/express -D
- yarn tsc
- yarn add ts-node-dev -D
- yarn add uuidv4
- yarn add date-fns

**tsconfig.json**

```json
//Descomentar linhas e inserir valores
"rootDir": "./src",
"outDir": "./dist",
```

**package.json**

```json
//inserir abaixo de license: MIT
"scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

---

## Arquivos e Pastas

```bash
└── 📁src
    ├── 📄server.ts
    ├── 📁routes
 		│		├── 📄 registers.routes.ts
    │   └── 📄 index.ts
    ├── 📁models
    │   └── 📄Register.ts
    ├── 📁repositories
    │    └── 📄RegisterRepository.ts
		└── 📁services
				└── 📄CreateRegisterService.ts
```

---

### Conteúdo Arquivos

**server.ts**

```tsx
import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, ()=> {
    console.log("Server started on port 3333!");
})
```

**index.ts**

```tsx
import { Router } from 'express';
import registersRoutes from './registers.routes';

const routes = Router();

routes.use('/registers', registersRoutes);

export default routes;
```

**Register.ts**

```tsx
import {uuid} from 'uuidv4';

class Register{
    id: string;
    date: string;
    currentKm: number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;

    constructor(date: string, currentKm: number, fuel: string,
                liters: number, priceLiter: number, totalValue: number, gasINfo: string){
        this.id = uuid();
        this.date = date;
        this.currentKm = currentKm;
        this.fuel = fuel;
        this.liters = liters;
        this.priceLiter = priceLiter;
        this.totalValue = totalValue;
        this.gasInfo = gasINfo;
    }

}

export default Register;
```

**registers.routes.ts**

```tsx
import { Router } from 'express';
import { format, parseISO } from 'date-fns';

import RegistersRepository from '../repositories/RegistersRepository';
import CreateRegisterService from '../services/CreateRegisterService';

const registersRouter = Router();
const registersRepository = new RegistersRepository();

registersRouter.get('/',(req, res) => {
    const registers = registersRepository.all();
    return res.json(registers);
});

registersRouter.post('/', (req, res) => {
    try{
        const { date, currentKm, fuel, liters, priceLiter, totalValue, gasInfo } = req.body;

        //transformou o date em uma string
        const parsedDate = format(parseISO(date), 'dd/MM/yyyy');

        const createRegisterService = new CreateRegisterService(registersRepository);

        const register = createRegisterService.execute({ date: parsedDate, currentKm, fuel, liters, priceLiter, totalValue, gasInfo });

        return res.json(register);
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
    
});

export default registersRouter;
```

**RegisterRepository.ts**

```tsx
import Register from '../models/Register'

interface CreateRegisterDTO{
    date: string;
    currentKm:number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;

}

class RegisterRepository{
    private registers: Register[];

    constructor(){
        this.registers = [];
    }

    public all(): Register[]{

        return this.registers;
    }

    public create({date, currentKm, fuel, liters,priceLiter, totalValue, gasInfo} : CreateRegisterDTO){
            const register = new Register(date, currentKm, fuel, liters, priceLiter, totalValue, gasInfo);
            
            this.registers.push(register);

            return register;
    }
}

export default RegisterRepository;
```

**CreateRegisterService.ts**

```tsx
import Register from '../models/Register';
import RegistersRepository from '../repositories/RegistersRepository';

interface Request{
    date: string;
    currentKm:number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;
}

class CreateRepositoryService{
    private registersRepository: RegistersRepository;

    constructor (registersRepository: RegistersRepository){
        this.registersRepository = registersRepository
    }

    public execute({date, currentKm, fuel, liters,priceLiter, totalValue, gasInfo}: Request): Register{
        
        //Se houver alguma validação de dados a ser feita, será inserida aqui
        
        const register = this.registersRepository.create({
            date, 
            currentKm, 
            fuel, 
            liters,
            priceLiter, 
            totalValue, 
            gasInfo});

            return register;
    }
}

export default CreateRepositoryService;
```