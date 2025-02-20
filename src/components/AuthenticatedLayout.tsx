"use client"; // Required for client components in the App Router

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TripsIcon from "@mui/icons-material/TripOrigin";
import CalculateIcon from "@mui/icons-material/Calculate";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Used to track route changes
  const { isLoggedIn, isLoading, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile screen

  const navItems = [
    { text: "Home", path: "/authenticated-home", icon: <DashboardIcon /> },
    { text: "Data Fetch Example", path: "/data-fetch", icon: <TripsIcon /> },
  ];

  // Track route changes manually
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // Simulate loading delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (isLoading || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isLoggedIn ? (
    <Box
      sx={{
        display: "flex",
        background: "linear-gradient(135deg, #005080,rgb(216, 255, 255))",
        minHeight: "100vh",
      }}
    >
      {/* Drawer for Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Use temporary for mobile screens
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: sidebarOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? 240 : 60,
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            transition: "width 0.3s ease", // Smooth transition for expanding/collapsing
            boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              component="li"
              key={item.text}
              sx={{
                justifyContent: sidebarOpen ? "initial" : "center",
                padding: "8px 16px",
                transition: "all 0.3s ease", // Smooth transition on hover
                "&:hover": {
                  backgroundColor: "rgba(5, 114, 182, 0.1)",
                  transform: "scale(1.05)", // Slight zoom effect on hover
                },
              }}
            >
              <Button
                variant="text"
                onClick={() => router.push(item.path)}
                sx={{
                  justifyContent: "flex-start",
                  width: "100%",
                  color: "inherit",
                  textTransform: "none",
                  padding: 1,
                  borderRadius: 1,
                  fontWeight: "bold", // Make text bold
                  "&:hover": {
                    bgcolor: "rgba(5, 114, 182, 0.2)", // Change color on hover
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon}
                  <ListItemText
                    primary={sidebarOpen ? item.text : ""}
                    sx={{
                      opacity: sidebarOpen ? 1 : 0, // Smooth hide of text when sidebar is collapsed
                      transition: "opacity 0.3s ease",
                      fontSize: sidebarOpen ? "1rem" : "0.875rem", // Text size adjustment
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ bgcolor: "#005080", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
           <Typography variant="body1" sx={{ flexGrow: 1, letterSpacing: "0.1rem" }}>
              nextcognito-boilerplate
          </Typography>
            <Button
              color="inherit"
              onClick={signOut}
              sx={{
                "&:hover": {
                  backgroundColor: "#FFAB00", // Gold hover effect
                  color: "#005080",
                  transform: "scale(1.05)", // Slight zoom effect on hover
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ padding: 2, transition: "all 0.3s ease" }}>{children}</Box>
      </Box>
    </Box>
  ) : (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#005080", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: "0.1rem", fontWeight: "bold" }}>
            <Button color="inherit" onClick={() => router.push("/")}>
              nextcognito-boilerplate
            </Button>
          </Typography>
          <Button color="inherit" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ padding: 2 }}>{children}</Box>
    </Box>
  );
}
