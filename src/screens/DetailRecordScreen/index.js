import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Layout, Text, ListItem} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';
import {TopNavGoBack} from '../../components';

const DetailRecordScreen = ({route, navigation}) => {
  const {itemId} = route.params;

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <TopNavGoBack title="Detalles XML" navigation={navigation} />
      <Layout level="2">
        <View style={basicStyles.card}>
          <Text category="h4">{JSON.stringify(itemId)}</Text>
        </View>
        <ListItem
          title="UI Kitten"
          description="A set of React Native components"
        />
        <ListItem
          title="UI Kitten"
          description="A set of React Native components"
        />
      </Layout>
    </SafeAreaView>
  );
};

export default DetailRecordScreen;
