import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends React.Component {
  state = { stations: [] };

  async componentDidMount() {
    const response = await fetch("https://ws.infotbm.com/ws/1.0/vcubs")
    const json = await response.json();
    this.setState({ stations: json.lists });
    console.log("Stations", json.lists);
  }

  render() {
    return <StationListView stations={this.state.stations} />;
  }
}

class StationListView extends React.Component {
  render() {
    return <FlatList
      style={{flex: 1}}
      data={this.props.stations}
      renderItem={({item}) => this.renderStationCell(item)}
      keyExtractor={item => item.id.toString()}
    />;
  }

  renderStationCell(station) {
    return <View style={styles.cell}>
      <Text style={styles.stationName}>{station.name}</Text>
      <Text style={[styles.bikeCount, {backgroundColor: getColorForStation(station)}]}>
        {station.nbBikeAvailable}
      </Text>
      <View style={styles.separator} />
    </View>;
  }
}

function getColorForStation(station) {
  if (station.nbBikeAvailable === 0) {
    return "red";
  } else if (station.nbBikeAvailable <= 3) {
    return "orange";
  } else {
    return "green";
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 64
  },
  stationName: {
    flex: 1
  },
  bikeCount: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "green",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5
  },
  separator: {
    position: "absolute",
    height: 1,
    left: 10,
    right: 10,
    bottom: 1,
    backgroundColor: "#eeeeee"
  }
});
