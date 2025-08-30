import React from "react";
import { Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { logout } from "../../../reduxStore/authSlice";
import { useNavigate } from "react-router-dom";
import ReusableModal from "./ReusableModal";

export default function LogoutModal({ isOpen, setIsOpen }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setIsOpen(false);

    const handleLogout = () => {
        dispatch(logout()); // Removes from redux & localStorage
        handleClose();
        navigate("/login"); // Redirect to login
    };

    return (
        <ReusableModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            title="Confirm Logout"
            footer={
                <div className="flex gap-4">
                    <Button
                        className="px-6 border border-[#4c047c] text-white bg-[#4c047c]"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="bordered"
                        className="text-red-600 px-6 border-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            }
        >
            <div className="col-span-2 text-center text-lg font-medium">
                Are you sure you want to logout?
            </div>
        </ReusableModal>
    );
}
