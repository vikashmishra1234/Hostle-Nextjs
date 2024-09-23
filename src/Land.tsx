"use client"
import { useTheme } from "@mui/material";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";

export default function Land() {
  const theme = useTheme()
  const sm = theme.breakpoints.down('sm');
  const md = theme.breakpoints.down('md');
  return (
    <ParallaxProvider>
      <div className="h-[60vh] md:h-[calc(100vh - 100px)]" style={{  backgroundColor: "#f0f0f0" }}>
        {/* Parallax Banner Section */}
        <ParallaxBanner
          layers={[
            {
              image:
                "https://www.bsacet.org/wp-content/uploads/2024/03/bsa-5.jpeg",
              speed: -30,
            }, // Adjust the speed for parallax effect
          ]}
          style={{ height: "100%", position: "relative" }} // Add position relative to control text position
        >
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              zIndex: 1, // Ensure the text is on top
              textAlign: "center",
            }}
          >
            <h1
            className="text-[3rem] sm:text-[3rem] md:text-[4.3rem]"
              style={{  fontWeight: "bold", color: "white" }}
            >
              <TypeAnimation
                sequence={["Welcome to the BSA Hostel", 4500, " ", 2]} // Add a delay if needed
                speed={50}
                repeat={Infinity}
              />
            </h1>
          </div>
        </ParallaxBanner>
      </div>
    </ParallaxProvider>
  );
}
