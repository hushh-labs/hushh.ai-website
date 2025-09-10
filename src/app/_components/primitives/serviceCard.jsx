import React from "react";
import { GridItem, VStack, Text } from "@chakra-ui/react";

const ServiceCard = ({
  icon,
  title,
  description,
  alignItems,
  textAlign,
  onClick,
  styles,
}) => {
  return (
    <GridItem
      cursor={"pointer"}
      onClick={onClick}
      width={{ base: "100%", md: "100%" }}
      px={{ base: "1rem" }}
      style={styles}
    >
      <VStack
        display={"flex"}
        alignItems={{ md: alignItems || "flex-start", base: "center" }}
        gap={"1rem"}
        w="full"
        p={{ base: "1rem", md: "1.25rem" }}
        bg="#ffffff"
        border="1px solid #e5e5ea"
        borderRadius={{ base: "1rem", md: "1.25rem" }}
        boxShadow="0 8px 24px rgba(0,0,0,0.06)"
        transition="all 0.2s ease"
        _hover={{ bg: "#f5f5f7", borderColor: "#d2d2d7" }}
        stroke={'black'}
      >
        {icon}
        <Text
          textAlign={{ base: "center", md: "left" }}
          fontSize={{ md: "1.125rem", base: "1rem" }}
          fontWeight={700}
          color="#1d1d1f"
        >
          {title}
        </Text>
        <Text
          textAlign={{ md: textAlign || "left", base: textAlign || "center" }}
          fontWeight={500}
          lineHeight={{ md: "1.6", base: "1.4" }}
          color="#6e6e73"
          fontSize={{ md: "0.95rem", base: "0.85rem" }}
        >
          {description}
        </Text>
      </VStack>
    </GridItem>
  );
};

export { ServiceCard };
