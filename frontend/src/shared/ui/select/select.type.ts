type Option = {
  title: string;
  slug: string;
};

export interface SelectProps {
  items: Option[];
  value: string;
  onChange: (item: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
