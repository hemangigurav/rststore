import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width= 'xl'}) => {
    return(
        <Flex
        direction='column' boxShadow='md' rounded='md' p='10' bgColor='white' width={width}>
            {children}

        </Flex>
    );
};


export default FormContainer;