import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
  
  export default function ReusableModal({
    isOpen,
    onOpenChange,
    title,
    children, // This will be the form content
    footer, // This will be the buttons
  }) {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        classNames={{
          base: "rounded-xl max-w-5xl",
          header: "bg-purple-700 text-white text-center text-lg font-semibold",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="bg-[#4c047c] flex justify-center items-center text-white">
              {title}
            </ModalHeader>
            <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {children}
            </ModalBody>
            <ModalFooter className="flex justify-center">
              {footer}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    );
  }