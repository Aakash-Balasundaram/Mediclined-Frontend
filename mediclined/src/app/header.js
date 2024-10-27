import Image from "next/image";
import secureLocalStorage from "react-secure-storage";
import Button from "@mui/material/Button";

export default function Head() {
  // Logout function
  const handleLogout = () => {
    secureLocalStorage.clear(); // Clear all secure localStorage
    window.location.href = "/login"; // Directly redirect to login page
  };

  return (
    <div className="flex flex-row items-center justify-between m-3">
      {/* Logo and Title */}
      <div className="flex flex-row items-center">
        <Image
          src="/mediclined_logo-modified.png"
          alt="hello"
          width={50}
          height={50}
          className="mx-auto"
        />
        <div className="font-bold text-[32px] ml-2">Mediclined</div>
      </div>

      {/* MUI Logout button on the right end */}
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        sx={{ padding: "6px 16px", fontWeight: "bold" }}
      >
        Logout
      </Button>
    </div>
  );
}
