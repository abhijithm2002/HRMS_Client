import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Checkbox,
  } from "@heroui/react";
  import { Upload } from "lucide-react";
  
  export default function AddCandidateModal({ isOpen, onOpenChange }) {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="lg"
        classNames={{
          base: "rounded-xl",
          header: "bg-purple-700 text-white text-center text-lg font-semibold",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Candidate</ModalHeader>
              <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {/* Full Name */}
                <Input
                  isRequired
                  label="Full Name"
                  placeholder="Enter full name"
                  variant="bordered"
                />
                {/* Email Address */}
                <Input
                  isRequired
                  type="email"
                  label="Email Address"
                  placeholder="Enter email"
                  variant="bordered"
                />
                {/* Phone Number */}
                <Input
                  isRequired
                  type="tel"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  variant="bordered"
                />
                {/* Position */}
                <Input
                  isRequired
                  label="Position"
                  placeholder="Enter position"
                  variant="bordered"
                />
                {/* Experience */}
                <Input
                  isRequired
                  label="Experience"
                  placeholder="Enter experience"
                  variant="bordered"
                />
                {/* Resume Upload */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-default-700">
                    Resume<span className="text-danger">*</span>
                  </label>
                  <div className="flex items-center justify-between border-2 border-default-200 rounded-lg p-2 cursor-pointer hover:bg-default-100">
                    <span className="text-sm text-default-500">
                      Upload resume
                    </span>
                    <Upload className="w-5 h-5 text-default-500" />
                  </div>
                </div>
              </ModalBody>
              <div className="px-6">
                <Checkbox size="sm">
                  I hereby declare that the above information is true to the best
                  of my knowledge and belief
                </Checkbox>
              </div>
              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  className="bg-purple-700 text-white px-10"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
  