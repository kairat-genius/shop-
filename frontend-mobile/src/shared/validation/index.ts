export const emailValidation = {
  required: "Введите email",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Введите корректный email адрес",
  },
};