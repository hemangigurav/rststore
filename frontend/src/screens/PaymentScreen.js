import {Button, Flex, FormControl, FormLabel, Heading, HStack, VStack, Radio, RadioGroup, Spacer} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';



const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = cart;


    //we need to implement this to protect our routes wherever required
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const [paymentMethodRadio, setPaymentMethodRadio] = useState(paymentMethod || 'paypal'); // we can read from local storage otherwise paypal


    useEffect( () => 
    {
        if (!userLogin){
            navigate('/login')
        }

        if (!shippingAddress)
        {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress, userInfo]);



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodRadio));
        navigate('/placeorder');
    };


    return (
        <Flex w='full' alignItems='center' justifyContent='center' py='5'>
			<FormContainer>
				<CheckoutSteps step1 step2 step3 />

				<Heading as='h2' mb='8' fontSize='3xl'>
					Payment Method
				</Heading>

				<form onSubmit={submitHandler}>
					<FormControl as='fieldset'>
						<FormLabel as='legend'>Select Methods</FormLabel>
						<RadioGroup
							value={paymentMethodRadio}
							onChange={setPaymentMethodRadio}>
							<HStack space='24px'>
								<Radio value='paypal'>PayPal</Radio>
                                <Radio value='cards'>Credit/Debit Card</Radio>
                                <Radio value='cod'>Cash on Delivery</Radio>
							</HStack>
						</RadioGroup>
					</FormControl>

					<Spacer h='3' />

					<Button type='submit' colorScheme='teal' mt='4'>
						Continue
					</Button>
				</form>
			</FormContainer>
		</Flex>

    )
};



export default PaymentScreen;
