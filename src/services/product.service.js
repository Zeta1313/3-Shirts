import * as repo from './../model/product.repo.mysql.js';

export const getAll = async () => await repo.getAll();
export const getById = async id => await repo.getById(id);
export const filterProducts = async query => await repo.getAll(query);