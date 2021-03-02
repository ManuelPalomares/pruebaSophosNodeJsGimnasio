'use strict'


const usuariosController = require('../controllers/usuarioController');
const Sedes = require('../model/usuario');


test('Try login Invalid', () => {
    const mReq = { body: {params:{ login: "123" } }};
    const mRes = {};
    const mNext = jest.fn();
    usuariosController.loginUser(mReq, mRes);
    expect(mNext).toBe(new Error('invalid.'));

  });


  test('Try login normal', () => {
    const mReq = { body: {params:{ login: "admin" ,password: "admin"} }};
    const mRes = {};
    const mNext = jest.fn();
    usuariosController.loginUser(mReq, mRes);
    expect(mNext).toBe({});

  });


  test('listado de usuarioss de una sede', () => {
    const mReq = { params:{ idsede: "1"} };
    const mRes = {};
    const mNext = jest.fn();
    usuariosController.getUserBySede(mReq, mRes);
    expect(mNext).toBe({});

  });




  