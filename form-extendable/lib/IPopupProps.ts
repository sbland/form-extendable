export interface IPopupProps {
  id: string;
  isOpen?: boolean;
  handleClose?: () => void;
  title?: string;
  children: React.ReactNode;
}
