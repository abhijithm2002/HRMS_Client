import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useState, useEffect } from "react";
import ReusableModal from "./ReusableModal";
import { updateEmployee } from "../../../services/userService";

export default function EditEmployeeModal({ isOpen, onOpenChange, employeeData, onEmployeeUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "Employee",
    status: "Active",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name || "",
        email: employeeData.email || "",
        phone: employeeData.phone || "",
        position: employeeData.position || "",
        department: employeeData.department || "",
        role: employeeData.role || "Employee",
        status: employeeData.status || "Active",
        startDate: employeeData.startDate || "", 
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePositionSelect = (key) => {
    setFormData(prev => ({ ...prev, position: key }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateEmployee(employeeData._id, formData);
      if (onEmployeeUpdated) onEmployeeUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = !formData.name || !formData.email;

  const positionOptions = [
    { key: "Intern", label: "Intern" },
    { key: "Full Time", label: "Full Time" },
    { key: "Junior", label: "Junior" },
    { key: "Senior", label: "Senior" },
    { key: "Team Lead", label: "Team Lead" },
  ];

  const selectedPositionLabel = positionOptions.find(option => option.key === formData.position)?.label || "Select position";

  return (
    <ReusableModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Edit Employee Details"
      footer={
        <Button
          color="primary"
          className="bg-[#4c047c] text-white px-10"
          isDisabled={isFormIncomplete || isSubmitting}
          onClick={handleSubmit}
        >
          Save
        </Button>
      }
    >
      <Input isRequired name="name" label="Full Name" placeholder="Enter full name" variant="bordered" value={formData.name} onChange={handleChange} />
      <Input isRequired type="email" name="email" label="Email Address" placeholder="Enter email" variant="bordered" value={formData.email} onChange={handleChange} />
      <Input name="phone" label="Phone Number" placeholder="Enter phone number" variant="bordered" value={formData.phone} onChange={handleChange} />
      <Input name="department" label="Department" placeholder="Enter department" variant="bordered" value={formData.department} onChange={handleChange} />
      
      {/* Replaced Select with Dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="w-full justify-between"
            aria-label="Select position">
            {selectedPositionLabel}
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={handlePositionSelect}>
          {positionOptions.map(option => (
            <DropdownItem key={option.key}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      
      <Input name="dateOfJoining" label="Date of Joining" readOnly variant="bordered" 
      value={formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-GB") : ""}
       />
    </ReusableModal>
  );
}