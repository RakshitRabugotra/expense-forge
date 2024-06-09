/* Types for the modal */
export interface ModalChildProps {
  closeForm: () => void
  openForm: () => void
  setRefresh?: React.Dispatch<React.SetStateAction<number>>
}

export interface ModalOpenButtonProps {
  openForm: () => void
}

export interface BottomModalProps {
  setRefresh: React.Dispatch<React.SetStateAction<number>>
  ChildComponent: (props: ModalChildProps) => JSX.Element
  OpenButton?: (props: ModalOpenButtonProps) => JSX.Element
}
