import { Flex, Text, Link } from '@chakra-ui/react';
import {AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
	return (

	<>	
		<Flex as='footer' justifyContent='center' py='5'>
			<Text>
				Copyright {new Date().getFullYear()}. RST Store. All Rights Reserved.	
			</Text>
	
		</Flex>
						
	</>
	
	);
};

export default Footer;
