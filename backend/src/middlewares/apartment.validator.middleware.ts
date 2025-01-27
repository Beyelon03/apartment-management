import { body } from 'express-validator';

export const createApartmentValidation = () => [
  body('title')
    .notEmpty()
    .withMessage('Заголовок обязателен для заполнения.')
    .isLength({ max: 90 })
    .withMessage('Заголовок не должен превышать 90 символов.'),
  body('description')
    .notEmpty()
    .withMessage('Описание обязательно для заполнения.')
    .isLength({ max: 335 })
    .withMessage('Описание не должно превышать 335 символов.'),
  body('price')
    .notEmpty()
    .withMessage('Цена обязательна для заполнения.')
    .isInt({ min: 0 })
    .withMessage('Цена должна быть целым числом больше или равным 0.'),
  body('rooms')
    .notEmpty()
    .withMessage('Количество комнат обязательно для заполнения.')
    .isInt({ min: 1, max: 3 })
    .withMessage('Количество комнат должно быть 1, 2 или 3.'),
  body('images')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Поле "images" должно содержать от 0 до 5 файлов.'),
];

export const updateApartmentValidation = () => [
  body('title')
    .optional()
    .isString()
    .withMessage('Заголовок должен быть строкой.')
    .isLength({ max: 90 })
    .withMessage('Заголовок не должен превышать 90 символов.'),
  body('description')
    .optional()
    .isString()
    .withMessage('Описание должно быть строкой.')
    .isLength({ max: 335 })
    .withMessage('Описание не должно превышать 335 символов.'),
  body('price')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Цена должна быть целым числом больше или равным 0.'),
  body('rooms')
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage('Количество комнат должно быть 1, 2 или 3.'),
  body('images')
    .optional()
    .isArray({ min: 0, max: 5 })
    .withMessage('Поле "images" должно содержать от 0 до 5 файлов.'),
];
