import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import { Transition, FluidNavigator } from 'react-navigation-fluid-transitions';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    const items = [];
    const size = 80;
    const max = 40;
    const randMax = 100;
    for (let i = 0; i < max; i++) {
      let randomNumber = Math.floor((Math.random() * randMax) + 1);
      while (items.findIndex(e => e.id === randomNumber) > -1) {
        randomNumber = Math.floor((Math.random() * randMax) + 1);
      }

      items.push({ url: `https://picsum.photos/${size}/${size}?image=${randomNumber}`, id: randomNumber });
    }
    this.setState({ ...this.state, items });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => `${index}`}
        />
      </View>
    );
  }
  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => { this.props.navigation.navigate('details', { item, index }); }}
    >
      <Transition shared={`image${index}`}>
        <Image style={styles.image} source={{ uri: item.url }} />
      </Transition>
      <View style={styles.textContainer}>
        <Text style={styles.caption}>Image URI:</Text>
        <Text>{item.url}</Text>
      </View>
    </TouchableOpacity>

  )
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Transition appear="top">
          <View style={styles.bottomContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.caption}>Image URI:</Text>
              <Text>{this.props.navigation.state.params.item.url}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </Transition>
        <Transition shared={`image${this.props.navigation.state.params.index}`}>
          <Image
            style={styles.largeImage}
            source={{ uri: this.props.navigation.state.params.item.url }}
          />
        </Transition>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ECECEC',
    borderColor: '#CCC',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#666',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    flexDirection: 'row',
    elevation: 3,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 18,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  caption: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  largeImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
  },
  button: {
    padding: 12,
    backgroundColor: '#CECECE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Navigator = FluidNavigator({
  list: { screen: ListScreen },
  details: { screen: DetailsScreen },
});

export default () => (
  <Navigator />
);
