"use client";
import { useState, useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import Image from "next/image";
import Horizontal1 from "../../../../public/Images/gridImages/Horizontal 1.jpeg";
import Horizontal2 from "../../../../public/Images/gridImages/Horizontal 2.jpeg";
import Horizontal3 from "../../../../public/Images/gridImages/Horizontal 3.jpeg";
import Horizontal4 from "../../../../public/Images/gridImages/Horizontal 4.jpg";
import Vertical1 from "../../../../public/Images/gridImages/Vertical 1.jpeg";
import Vertical2 from "../../../../public/Images/gridImages/Vertical 2.jpeg";
import Vertical3 from "../../../../public/Images/gridImages/Vertical 3.jpeg";
import Vertical4 from "../../../../public/Images/gridImages/Vertical 4.jpeg";
import Vertical5 from "../../../../public/Images/gridImages/Vertical 5.jpg";
import Vertical6 from "../../../../public/Images/gridImages/Vertical 6.jpg";
import Vertical7 from "../../../../public/Images/gridImages/Vertical 7.jpg";

const images = {
  left: [
    Horizontal1,
    Horizontal2,
    Horizontal3,
    Horizontal4,
  ],
  rightTop: [
    Vertical1,
    Vertical2,
    Vertical3,
    Vertical4,
  ],
  rightBottom: [
    Vertical5,
    Vertical6,
    Vertical7,
    Vertical1,
  ],
};

export default function ImageGrid() {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightTopImage, setCurrentRightTopImage] = useState(0);
  const [currentRightBottomImage, setCurrentRightBottomImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % images.left.length);
      setCurrentRightTopImage((prev) => (prev + 1) % images.rightTop.length);
      setCurrentRightBottomImage((prev) => (prev + 1) % images.rightBottom.length);
    }, 4000); // 4 seconds interval for smoother experience

    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="100%" height="auto" minHeight={{ base: "400px", md: "500px" }}>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap="12px"
        height="100%"
        minHeight="inherit"
      >
        {/* Left Side - Single Horizontal Box */}
        <Box
          position="relative"
          height="100%"
          minHeight={{ base: "400px", md: "500px" }}
          overflow="hidden"
          borderRadius="20px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
          bg="white"
        >
          {images.left.map((image, index) => (
            <Box
              key={`left-${index}`}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              display={currentLeftImage === index ? 'block' : 'none'}
              borderRadius="20px"
              overflow="hidden"
            >
              <Image
                src={image}
                alt={`Hushh Featured Image ${index + 1}`}
                priority={index === 0}
                quality={90}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Right Side - Two Vertical Boxes Stacked */}
        <Box
          display="flex"
          flexDirection="column"
          gap="12px"
          height="100%"
          minHeight={{ base: "400px", md: "500px" }}
        >
          {/* Top Right Box */}
          <Box
            position="relative"
            flex="1"
            minHeight={{ base: "194px", md: "244px" }}
            overflow="hidden"
            borderRadius="20px"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
            bg="white"
          >
            {images.rightTop.map((image, index) => (
              <Box
                key={`right-top-${index}`}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display={currentRightTopImage === index ? 'block' : 'none'}
                borderRadius="20px"
                overflow="hidden"
              >
                <Image
                  src={image}
                  alt={`Hushh Featured Image Top ${index + 1}`}
                  priority={index === 0}
                  quality={90}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Bottom Right Box */}
          <Box
            position="relative"
            flex="1"
            minHeight={{ base: "194px", md: "244px" }}
            overflow="hidden"
            borderRadius="20px"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
            bg="white"
          >
            {images.rightBottom.map((image, index) => (
              <Box
                key={`right-bottom-${index}`}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display={currentRightBottomImage === index ? 'block' : 'none'}
                borderRadius="20px"
                overflow="hidden"
              >
                <Image
                  src={image}
                  alt={`Hushh Featured Image Bottom ${index + 1}`}
                  priority={index === 0}
                  quality={90}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
