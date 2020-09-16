import { EntityRepository, Repository } from 'typeorm';

import Register from '../models/Register'

@EntityRepository(Register)
class RegisterRepository{
    // se tiver alguma verificação a ser feita, será feita aqui
    //importar repositorio no Service - e utilizar getCustomRepository
}

export default RegisterRepository;