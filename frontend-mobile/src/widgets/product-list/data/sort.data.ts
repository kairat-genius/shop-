export const sortOptions = [
  {
    title: "По умолчанию",
    slug: "0_DESC",
    sortType: 0,
    sortMode: "DESC",
  },
  {
    title: "Топ продаж",
    slug: "1_DESC",
    sortType: 1,
    sortMode: "DESC",
  },
  {
    title: "Цена: По возрастанию",
    slug: "4_ASC",
    sortType: 4,
    sortMode: "ASC",
  },
  {
    title: "Цена: По убыванию",
    slug: "4_DESC",
    sortType: 4,
    sortMode: "DESC",
  },
  {
    title: "Новые",
    slug: "3_DESC",
    sortType: 3,
    sortMode: "DESC",
  },
] as const;