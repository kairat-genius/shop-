export const ratingValidation = {
  required: "Поставьте оценку",
  validate: (value: number) => value > 0 || "Поставьте оценку",
};

export const firstNameValidation = {
  required: "Укажите имя",
};

export const lastNameValidation = {
  required: "Укажите фамилию",
};
export const textValidation = {
  required: "Введите текст отзыва",
};
