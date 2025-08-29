
import { Input, Checkbox, Button } from "@heroui/react";
import { useState } from "react";
import ReusableModal from "./Modal/ReusableModal";
import { addCandidate } from "../../services/userService";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

export default function AddCandidateModal({ isOpen, onOpenChange, onCandidateAdded }) {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
  });
  const [resumeUrl, setResumeUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      if (data?.secure_url) {
        setResumeUrl(data.secure_url);
      } else {
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading resume");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        resume: resumeUrl,
      };


      const response = await addCandidate(data); 
      console.log("Candidate added:", response.candidate);
      if (onCandidateAdded) onCandidateAdded();
      onOpenChange(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
      });
      setResumeUrl(null);
      setIsChecked(false);
    } catch (error) {
      console.error("Error uploading candidate:", error);
    }
  };

  const isFormIncomplete =
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.position ||
    !formData.experience ||
    !resumeUrl ||
    !isChecked;

  return (
    <ReusableModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Add New Candidate" 
      footer={ 
        <Button
          color="primary"
          className="bg-[#4c047c] text-white px-10"
          isDisabled={isFormIncomplete || isUploading}
          onClick={handleSubmit}
        >
          Save
        </Button>
      }
    >
   
      <Input
        isRequired
        name="fullName"
        label="Full Name"
        placeholder="Enter full name"
        variant="bordered"
        value={formData.fullName}
        onChange={handleChange}
      />
      <Input
        isRequired
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter email"
        variant="bordered"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        isRequired
        type="tel"
        name="phone"
        label="Phone Number"
        placeholder="Enter phone number"
        variant="bordered"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        isRequired
        name="position"
        label="Position"
        placeholder="Enter position"
        variant="bordered"
        value={formData.position}
        onChange={handleChange}
      />
      <Input
        isRequired
        name="experience"
        label="Experience"
        placeholder="Enter experience"
        variant="bordered"
        value={formData.experience}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-default-700">
          Resume<span className="text-danger">*</span>
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileInputChange}
          className="border-2 border-default-200 rounded-lg p-2 cursor-pointer"
        />
        {isUploading && (
          <span className="text-xs text-blue-600 mt-1">Uploading...</span>
        )}
        {resumeUrl && (
          <span className="text-xs text-green-600 mt-1">
            Uploaded Successfully
          </span>
        )}
      </div>
      <div className="px-6 col-span-1 md:col-span-2">
        <Checkbox
          size="sm"
          isSelected={isChecked}
          onValueChange={setIsChecked}
        >
          I hereby declare that the above information is true to the best
          of my knowledge and belief.
        </Checkbox>
      </div>
    </ReusableModal>
  );
}