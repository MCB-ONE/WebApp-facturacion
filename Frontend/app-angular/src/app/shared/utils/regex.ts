/* tslint:disable:max-line-length */
export const regex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    password: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,

    number: /^\d+$/,

    decimal: /^\d+\.\d{0,2}$/,

    nif: /^(\d{8})([A-Z])$/,

    phone: /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/

  };

  export const regexErrors = {
    email: 'El email es incorrecto.',
    password: 'El password debe contener una letra mayúscula, minúscula, un número y un caracter especial.',
    number: 'Solo puede ingresar números.',
    decimal: 'Introduzca un número decimal con como máximo dos ígitos trás la coma. Ej: 10.50',
    nif: 'El formato ha de ser el siguiente: 98226837E',
    phone: 'Solo se admiten los siguientes formatos: +34666555444, 34666555444, 666555444'
  }
