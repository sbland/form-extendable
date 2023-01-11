import { Uid } from '@react_db_client/constants.client-types';

export interface IPopupProps {
  id: Uid;
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
