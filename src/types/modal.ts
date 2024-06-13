/* Types for the modal */
export interface ModalChildProps {
  closeForm: () => void
  openForm: () => void
  setRefresh?: React.Dispatch<React.SetStateAction<number>>
}

export interface ModalOpenButtonProps {
  openForm: () => void
}

export interface ModalProps {
  defaultOpen?: boolean
  ChildComponent: (props: ModalChildProps) => JSX.Element
  onClose?: () => void
  onOpen?: () => void
}

export interface BottomModalProps extends ModalProps {
  setRefresh: React.Dispatch<React.SetStateAction<number>>
  OpenButton?: (props: ModalOpenButtonProps) => JSX.Element
}
