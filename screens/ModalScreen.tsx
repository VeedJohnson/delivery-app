import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { TabStackParamsList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList>, 
    NativeStackNavigationProp<RootStackParamsList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamsList, "MyModal">

const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const { params: { name, userId}} = useRoute<ModalScreenRouteProp>();

    const { loading, error, orders } = useCustomerOrders(userId);

    return (
        <View>
            <TouchableOpacity 
                style={tw("absolute right-5 top-5 z-10")}
                onPress={navigation.goBack}
            >
                    <Icon name="closecircle" type="antdesign" />
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
                <View style={[tw("py-5 border-b"), {borderColor: "#59c1cc"}]}>
                    <Text style={[tw("text-center text-xl font-bold"), { color: "#59c1cc"}]}>{name}</Text>
                    <Text style={[tw("text-center text-sm italic"), { color: "#59c1cc"}]}>deliveries</Text>
                </View>
            </View>

            <FlatList
                contentContainerStyle={{ paddingBottom: 200}}
                data={orders}
                renderItem={({item: order}) => <DeliveryCard order={order} />}
                keyExtractor={order => order.trackingId}
            />
        </View>
    )
}

export default ModalScreen;