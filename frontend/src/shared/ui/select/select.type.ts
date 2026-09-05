type Option = {
  title: string;
  slug: string | number;
};

export interface SelectProps {
  items: readonly Option[];
  value: string | number;
  onChange: (item: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
