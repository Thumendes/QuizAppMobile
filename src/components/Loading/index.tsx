import { Box, Heading } from "native-base";
import React from "react";

const Loading = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" height="100%">
      <Heading>Loading...</Heading>
    </Box>
  );
};

export default Loading;
