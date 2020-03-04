import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import axios from "axios";
import { AppLoader } from "../components/ui/AppLoader";
import SearchAdd from "../components/diary/SearchAdd";
import CalendarAdd from "../components/diary/CalendarAdd";
import { FlatGrid } from "react-native-super-grid";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVhNWEyZmY0ZTlhNjQxNjE3MjkwNmUiLCJjcmVhdGVkRGF0ZSI6MTU4Mjk3OTYzMTY1NSwiZXhwIjoxNTg1NTcxNjMxfQ.0Hb3XHcCsAXwtYI0ifUGN2nkjfZffsOhIOzF7RKDSEU";

function yyyymmdd() {
  function twoDigit(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var now = new Date();
  return (
    "" +
    now.getFullYear() +
    "-" +
    twoDigit(now.getMonth() + 1) +
    "-" +
    twoDigit(now.getDate())
  );
}

export class DiaryScreen extends Component {
  state = {
    data: yyyymmdd(),
    calendarIsOpen: false,
    dayIngredients: [],
    dataURL: Date.now(),
    preLoader: false
  };

  componentDidMount() {
    if (this.state.dayIngredients.length === 0) {
      this.getDayIngredients();
    }
  }

  selectedDate = value => {
    this.setState({
      data: value.dateString,
      dataURL: value.timestamp,
      calendarIsOpen: false
    });
    this.getDayIngredients();
  };

  openCalendar = () => {
    this.setState({
      calendarIsOpen: true
    });
  };

  getDayIngredients = async () => {
    this.setState({
      preLoader: true
    });
    await axios
      .get(
        `https://slim-moms.goit.co.ua/api/v1/user/eats/${new Date(
          this.state.dataURL
        ).toISOString()}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(data =>
        this.setState({
          dayIngredients: data.data.products
        })
      )
      .finally(() => this.setState({ preLoader: false }));
  };

  onRemoveItem = async id => {
    await axios.delete(`https://slim-moms.goit.co.ua/api/v1/user/eats/${id}`, {
      headers: {
        Authorization: token
      }
    });
    await this.getDayIngredients();
  };

  render() {
    return (
      <View>
        <View style={styles.openCalendar}>
          <TouchableOpacity onPress={this.openCalendar}>
            <Text>{this.state.data}</Text>
          </TouchableOpacity>
        </View>

        {this.state.preLoader && <AppLoader />}

        <SearchAdd getDayIngredients={this.getDayIngredients} />

        <View style={styles.listWrap}>
          <SafeAreaView>
            <View>
              {this.state.dayIngredients.length < 1 ? (
                <Text>Здесь будет отображаться Ваш рацион!</Text>
              ) : (
                <>
                  <FlatGrid
                    itemDimension={200}
                    items={this.state.dayIngredients}
                    renderItem={({ item }) => (
                      <View>
                        <Text>{item.title.ru}</Text>
                        {console.log(item)}
                        <Text>{item.calories}</Text>
                        <Text>{item.weight}</Text>
                        <TouchableOpacity
                          id={item._id}
                          onPress={() =>
                            setTimeout(() => {
                              this.onRemoveItem(item._id);
                            }, 0)
                          }
                          style={{
                            backgroundColor: "#f16d6b",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 25,
                            height: 25,
                            borderRadius: 100,
                            marginLeft: 10
                          }}
                        >
                          <Text>X</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={item => item._id}
                  />
                </>
              )}
            </View>
          </SafeAreaView>
        </View>

        {this.state.calendarIsOpen ? (
          <CalendarAdd selectedDate={this.selectedDate} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  openCalendar: {
    alignItems: "center",
    padding: 10
  },
  listWrap: {
    marginTop: 50
  },
  item: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#32a852",
    borderWidth: 1,
    margin: 2
  },
  button: {
    backgroundColor: "#f16d6b",
    alignItems: "center",
    justifyContent: "center",
    width: 15,
    height: 15,
    borderRadius: 100,
    marginLeft: 10
  }
});
