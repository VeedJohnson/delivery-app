import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamsList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../navigator/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';

type OrderScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList, "Orders">, NativeStackNavigationProp<RootStackParamsList>
>

type OrderScreenRouteProp = RouteProp<RootStackParamsList, "Order">

const OrderScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<OrderScreenNavigationProp>();
    const {params: {order}} = useRoute<OrderScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerBackTitle: "Deliveries"
        })
    
    }, [order])

    return (
        <View style={tw("mt-2")}>
            <DeliveryCard order={order} fullWidth />
        </View>
    )
}

export default OrderScreen