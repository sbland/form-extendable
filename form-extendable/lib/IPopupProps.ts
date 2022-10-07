
export interface IPopupProps {
  isOpen?: boolean;
  handleClose?: () => void;
  title?: string;
  children: React.ReactNode;
}